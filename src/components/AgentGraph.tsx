import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface NodeDef {
  id: string;
  label: string;
  x: number;
  y: number;
  type: 'input' | 'core' | 'agent' | 'signed' | 'dim' | 'dim_signed' | 'gate';
  context?: string;
}

interface EdgeDef {
  from: string;
  to: string;
  hot: boolean;
}

interface NodeDetail {
  title: string;
  summary: string;
  receives: string[];
  emits: string[];
  includes: string[];
  shape: string[];
}

interface TimelineEvent {
  delay: number;
  kind: 'node' | 'edge' | 'gate_off' | 'sign' | 'complete';
  id?: string;
  from?: string;
  to?: string;
}

const NODES: NodeDef[] = [
  { id: 'user', label: 'User Request', x: 400, y: 50, type: 'input' },
  { id: 'orchestrator', label: 'Orchestrator', x: 400, y: 145, type: 'core' },
  { id: 'read_inbox', label: 'read_inbox', x: 250, y: 248, type: 'agent', context: '3 action-required' },
  { id: 'classify', label: 'classify_emails', x: 250, y: 348, type: 'agent', context: 'thread_ids: [a3f, b7c]' },
  { id: 'draft_replies', label: 'draft_replies', x: 120, y: 455, type: 'agent', context: '2 drafts queued' },
  { id: 'extract_todos', label: 'extract_todos', x: 380, y: 455, type: 'agent', context: '2 task candidates' },
  { id: 'gate_send', label: 'approve', x: 120, y: 510, type: 'gate' },
  { id: 'gate_reschedule', label: 'approve', x: 720, y: 405, type: 'gate' },
  { id: 'send_replies', label: 'send_emails', x: 120, y: 572, type: 'signed' },
  { id: 'create_tasks', label: 'create_tasks', x: 380, y: 562, type: 'signed' },
  { id: 'read_calendar', label: 'read_calendar', x: 570, y: 248, type: 'dim' },
  { id: 'find_conflicts', label: 'find_conflicts', x: 660, y: 348, type: 'dim' },
  { id: 'reschedule', label: 'reschedule', x: 720, y: 465, type: 'dim_signed' },
  { id: 'summarize', label: 'summarize_thread', x: 500, y: 348, type: 'dim' },
  { id: 'archive', label: 'archive_emails', x: 100, y: 348, type: 'dim' },
  { id: 'notify_slack', label: 'notify_slack', x: 550, y: 562, type: 'dim_signed' },
  { id: 'prioritize', label: 'prioritize', x: 540, y: 455, type: 'dim' },
];

const EDGES: EdgeDef[] = [
  { from: 'user', to: 'orchestrator', hot: true },
  { from: 'orchestrator', to: 'read_inbox', hot: true },
  { from: 'read_inbox', to: 'classify', hot: true },
  { from: 'classify', to: 'draft_replies', hot: true },
  { from: 'classify', to: 'extract_todos', hot: true },
  { from: 'draft_replies', to: 'gate_send', hot: true },
  { from: 'gate_send', to: 'send_replies', hot: true },
  { from: 'extract_todos', to: 'create_tasks', hot: true },
  { from: 'orchestrator', to: 'read_calendar', hot: false },
  { from: 'read_calendar', to: 'find_conflicts', hot: false },
  { from: 'read_calendar', to: 'summarize', hot: false },
  { from: 'find_conflicts', to: 'gate_reschedule', hot: false },
  { from: 'gate_reschedule', to: 'reschedule', hot: false },
  { from: 'classify', to: 'archive', hot: false },
  { from: 'extract_todos', to: 'prioritize', hot: false },
  { from: 'prioritize', to: 'notify_slack', hot: false },
  { from: 'summarize', to: 'prioritize', hot: false },
];

const HOT_PATH_ORDER = [
  'user',
  'orchestrator',
  'read_inbox',
  'classify',
  'draft_replies',
  'extract_todos',
  'gate_send',
  'send_replies',
  'create_tasks',
];

// Every node in the hot path gets a hash. Each hash chains to the previous.
const HASH_CHAIN: Record<string, { hash: string; prev: string | null; sig: string }> = {
  user:          { hash: 'a1c03f', prev: null,     sig: 'ed25519:a1c0…3f' },
  orchestrator:  { hash: 'b2d17e', prev: 'a1c03f', sig: 'ed25519:b2d1…7e' },
  read_inbox:    { hash: 'c3e29a', prev: 'b2d17e', sig: 'ed25519:c3e2…9a' },
  classify:      { hash: 'd4f31b', prev: 'c3e29a', sig: 'ed25519:d4f3…1b' },
  draft_replies: { hash: 'e5a42c', prev: 'd4f31b', sig: 'ed25519:e5a4…2c' },
  extract_todos: { hash: 'f6b53d', prev: 'd4f31b', sig: 'ed25519:f6b5…3d' },
  gate_send:     { hash: '07c64e', prev: 'e5a42c', sig: 'ed25519:07c6…4e' },
  send_replies:  { hash: '9b2fd8', prev: '07c64e', sig: 'ed25519:9b2f…d8' },
  create_tasks:  { hash: '31af90', prev: 'f6b53d', sig: 'ed25519:31af…90' },
};

const TIMELINE: TimelineEvent[] = [
  { delay: 220, kind: 'node', id: 'user' },
  { delay: 340, kind: 'edge', from: 'user', to: 'orchestrator' },
  { delay: 280, kind: 'node', id: 'orchestrator' },
  { delay: 360, kind: 'edge', from: 'orchestrator', to: 'read_inbox' },
  { delay: 320, kind: 'node', id: 'read_inbox' },
  { delay: 420, kind: 'edge', from: 'read_inbox', to: 'classify' },
  { delay: 320, kind: 'node', id: 'classify' },
  { delay: 460, kind: 'edge', from: 'classify', to: 'draft_replies' },
  { delay: 120, kind: 'edge', from: 'classify', to: 'extract_todos' },
  { delay: 280, kind: 'node', id: 'draft_replies' },
  { delay: 220, kind: 'node', id: 'extract_todos' },
  { delay: 560, kind: 'edge', from: 'draft_replies', to: 'gate_send' },
  { delay: 280, kind: 'node', id: 'gate_send' },
  { delay: 920, kind: 'gate_off', id: 'gate_send' },
  { delay: 220, kind: 'edge', from: 'gate_send', to: 'send_replies' },
  { delay: 100, kind: 'edge', from: 'extract_todos', to: 'create_tasks' },
  { delay: 280, kind: 'node', id: 'send_replies' },
  { delay: 180, kind: 'node', id: 'create_tasks' },
  { delay: 420, kind: 'sign', id: 'send_replies' },
  { delay: 220, kind: 'sign', id: 'create_tasks' },
  { delay: 520, kind: 'complete' },
];

const NODE_DETAILS: Record<string, NodeDetail> = {
  user: {
    title: 'User request',
    summary: 'Raw natural-language goal and the starting policy boundary.',
    receives: ['End-user prompt', 'Account scope', 'Workspace identity'],
    emits: ['Normalized intent packet'],
    includes: ['request_id', 'raw_prompt', 'actor', 'permission_scope'],
    shape: [
      '{',
      '  node_id: "user",',
      '  packet_type: "request",',
      '  raw_prompt: "Take care of my emails and TODOs.",',
      '  permission_scope: ["gmail.read", "tasks.write"]',
      '}',
    ],
  },
  orchestrator: {
    title: 'Orchestrator',
    summary: 'Decides which graph branches are activated for this request.',
    receives: ['Intent packet', 'Available capabilities', 'Policy constraints'],
    emits: ['Activated path set', 'Scoped work orders'],
    includes: ['goal', 'selected_nodes', 'blocked_nodes', 'execution_id'],
    shape: [
      '{',
      '  node_id: "orchestrator",',
      '  activated_paths: ["read_inbox", "classify_emails"],',
      '  skipped_paths: ["read_calendar", "reschedule"],',
      '  execution_id: "exec_01H..."',
      '}',
    ],
  },
  read_inbox: {
    title: 'read_inbox',
    summary: 'Fetches only the inbox material needed for this rollout.',
    receives: ['Mailbox credential', 'Inbox query', 'Time window'],
    emits: ['Candidate email packets'],
    includes: ['thread_ids', 'sender', 'subject', 'urgency_hint'],
    shape: [
      '{',
      '  node_id: "read_inbox",',
      '  input: { folder: "inbox", limit: 25 },',
      '  output: { thread_ids: ["a3f", "b7c"], action_required: 3 }',
      '}',
    ],
  },
  classify: {
    title: 'classify_emails',
    summary: 'Splits inbox packets into reply candidates, task candidates, and archives.',
    receives: ['Thread packets', 'Email metadata', 'User preference rules'],
    emits: ['Reply queue', 'Task queue', 'Archive candidates'],
    includes: ['thread_id', 'label', 'priority', 'route'],
    shape: [
      '{',
      '  node_id: "classify_emails",',
      '  depends_on: ["read_inbox"],',
      '  routes: { reply: 2, todo: 2, archive: 1 }',
      '}',
    ],
  },
  draft_replies: {
    title: 'draft_replies',
    summary: 'Produces reply drafts from only the reply-eligible threads.',
    receives: ['Reply queue', 'Relevant thread history', 'Tone preferences'],
    emits: ['Draft email payloads'],
    includes: ['to', 'subject', 'body', 'confidence'],
    shape: [
      '{',
      '  node_id: "draft_replies",',
      '  scoped_inputs: ["thread:a3f", "thread:b7c"],',
      '  output: { drafts: 2, review_required: 1 }',
      '}',
    ],
  },
  extract_todos: {
    title: 'extract_todos',
    summary: 'Extracts tasks without needing the reply drafts.',
    receives: ['Todo-likely threads', 'Task extraction policy'],
    emits: ['Task candidate payloads'],
    includes: ['title', 'due_date', 'source_thread', 'owner'],
    shape: [
      '{',
      '  node_id: "extract_todos",',
      '  scoped_inputs: ["thread:a3f"],',
      '  output: { tasks: [{ title: "Reply to recruiter" }] }',
      '}',
    ],
  },
  gate_send: {
    title: 'Approval gate',
    summary: 'Stops a risky action until it satisfies a user or policy approval check.',
    receives: ['Draft payload', 'Risk score', 'Approval policy'],
    emits: ['Approved action token'],
    includes: ['policy_id', 'reason', 'approval_status'],
    shape: [
      '{',
      '  node_id: "gate_send",',
      '  check: "external_send",',
      '  policy: "require-approval-if-external",',
      '  status: "approved"',
      '}',
    ],
  },
  send_replies: {
    title: 'send_emails',
    summary: 'External tool call with a signed receipt bound to upstream lineage.',
    receives: ['Approved draft payload', 'Recipient metadata', 'Context hashes'],
    emits: ['Tool result', 'Signed receipt'],
    includes: ['tool_args', 'agent_id', 'context_hash', 'signature'],
    shape: [
      '{',
      '  node_id: "send_emails",',
      '  tool: "gmail.send",',
      '  parent_nodes: ["draft_replies", "classify_emails"],',
      '  receipt_sig: "ed25519:9b2f...d84a"',
      '}',
    ],
  },
  create_tasks: {
    title: 'create_tasks',
    summary: 'Writes task objects with the same execution lineage and signing model.',
    receives: ['Task candidates', 'Workspace task list', 'Context hashes'],
    emits: ['Created tasks', 'Signed receipt'],
    includes: ['task_id', 'list_id', 'agent_id', 'signature'],
    shape: [
      '{',
      '  node_id: "create_tasks",',
      '  tool: "tasks.create",',
      '  parent_nodes: ["extract_todos", "classify_emails"],',
      '  receipt_sig: "ed25519:31af...90c2"',
      '}',
    ],
  },
  read_calendar: {
    title: 'read_calendar',
    summary: 'Alternative branch for calendar-aware flows.',
    receives: ['Calendar credential', 'Window'],
    emits: ['Event packets'],
    includes: ['event_id', 'starts_at', 'attendees'],
    shape: [
      '{',
      '  node_id: "read_calendar",',
      '  status: "available_not_traversed"',
      '}',
    ],
  },
  find_conflicts: {
    title: 'find_conflicts',
    summary: 'Alternative branch for scheduling conflict detection.',
    receives: ['Calendar packets', 'Constraints'],
    emits: ['Conflict candidates'],
    includes: ['event_id', 'overlap_minutes', 'severity'],
    shape: [
      '{',
      '  node_id: "find_conflicts",',
      '  status: "available_not_traversed"',
      '}',
    ],
  },
  gate_reschedule: {
    title: 'Reschedule gate',
    summary: 'Approval boundary for calendar edits.',
    receives: ['Conflict candidate', 'Calendar edit policy'],
    emits: ['Approved reschedule token'],
    includes: ['policy_id', 'impact_score', 'approval_status'],
    shape: [
      '{',
      '  node_id: "gate_reschedule",',
      '  status: "available_not_traversed"',
      '}',
    ],
  },
  reschedule: {
    title: 'reschedule',
    summary: 'Signed calendar mutation branch.',
    receives: ['Approved edit token', 'Updated event args'],
    emits: ['Calendar tool result', 'Signed receipt'],
    includes: ['tool_args', 'previous_slot', 'next_slot', 'signature'],
    shape: [
      '{',
      '  node_id: "reschedule",',
      '  status: "available_not_traversed"',
      '}',
    ],
  },
  summarize: {
    title: 'summarize_thread',
    summary: 'Alternative summarization branch.',
    receives: ['Thread packets'],
    emits: ['Compact summary artifact'],
    includes: ['thread_id', 'summary', 'open_questions'],
    shape: [
      '{',
      '  node_id: "summarize_thread",',
      '  status: "available_not_traversed"',
      '}',
    ],
  },
  archive: {
    title: 'archive_emails',
    summary: 'Alternative branch for low-risk archive actions.',
    receives: ['Archive candidates'],
    emits: ['Archive tool args'],
    includes: ['thread_ids', 'archive_reason'],
    shape: [
      '{',
      '  node_id: "archive_emails",',
      '  status: "available_not_traversed"',
      '}',
    ],
  },
  prioritize: {
    title: 'prioritize',
    summary: 'Alternative downstream ranking branch.',
    receives: ['Tasks', 'Summaries'],
    emits: ['Priority-ordered queue'],
    includes: ['priority', 'reason', 'owner'],
    shape: [
      '{',
      '  node_id: "prioritize",',
      '  status: "available_not_traversed"',
      '}',
    ],
  },
  notify_slack: {
    title: 'notify_slack',
    summary: 'Alternative signed outbound notification branch.',
    receives: ['Priority queue', 'Notification template'],
    emits: ['Slack post result', 'Signed receipt'],
    includes: ['channel', 'message', 'signature'],
    shape: [
      '{',
      '  node_id: "notify_slack",',
      '  status: "available_not_traversed"',
      '}',
    ],
  },
};

function nodeById(id: string) {
  return NODES.find((n) => n.id === id)!;
}

function edgePath(from: NodeDef, to: NodeDef) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const nx = dx / dist;
  const ny = dy / dist;
  const r = 28;
  const sx = from.x + nx * r;
  const sy = from.y + ny * r;
  const ex = to.x - nx * r;
  const ey = to.y - ny * r;
  const cpx = (sx + ex) / 2 + (ey - sy) * 0.1;
  const cpy = (sy + ey) / 2 - (ex - sx) * 0.1;
  return `M ${sx} ${sy} Q ${cpx} ${cpy} ${ex} ${ey}`;
}

function getUpstream(nodeId: string): Set<string> {
  const visited = new Set<string>();
  const queue = [nodeId];

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current)) continue;
    visited.add(current);
    for (const edge of EDGES) {
      if (edge.to === current && !visited.has(edge.from)) {
        queue.push(edge.from);
      }
    }
  }

  return visited;
}

function getUpstreamEdges(upstreamNodes: Set<string>): Set<string> {
  const edgeKeys = new Set<string>();
  for (const edge of EDGES) {
    if (upstreamNodes.has(edge.from) && upstreamNodes.has(edge.to)) {
      edgeKeys.add(`${edge.from}-${edge.to}`);
    }
  }
  return edgeKeys;
}

function getInvarianceFields(node: NodeDef) {
  const base = [
    'execution_id',
    'session_id',
    'node_id',
    'node_type',
    'agent_identity',
    'packet_hash',
    'packet_sig',
    'parent_hashes',
    'context_hash',
    'started_at',
    'finished_at',
  ];

  if (node.type === 'gate') {
    return [...base, 'policy_id', 'approval_actor', 'approval_sig', 'decision_hash'];
  }

  if (node.type === 'signed' || node.type === 'dim_signed') {
    return [...base, 'tool_name', 'tool_args_hash', 'receipt_hash', 'previous_receipt_hash', 'ed25519_sig', 'public_key_id'];
  }

  return [...base, 'scope_hash', 'input_artifact_hashes', 'output_artifact_hashes', 'policy_snapshot_hash'];
}

function getInvarianceShape(node: NodeDef) {
  const common = [
    '    execution_id: "exec_01H9...",',
    '    session_id: "sess_01H9...",',
    `    node_id: "${node.id}",`,
    `    node_type: "${node.type}",`,
    '    agent_identity: "hardik/orchestrator",',
    '    packet_hash: "blake3:5f2d...19ab",',
    '    packet_sig: "ed25519:1af2...bb91",',
    '    parent_hashes: ["blake3:c91e...10f4"],',
    '    context_hash: "blake3:7ab3...f201",',
    '    started_at: "2026-03-22T17:15:04.203Z",',
    '    finished_at: "2026-03-22T17:15:04.611Z",',
  ];

  if (node.type === 'gate') {
    return [
      ...common,
      '    policy_id: "external-send-approval-v2",',
      '    approval_actor: "user:hardik",',
      '    approval_sig: "ed25519:03de...fa11",',
      '    decision_hash: "blake3:approval-42..."',
    ];
  }

  if (node.type === 'signed' || node.type === 'dim_signed') {
    return [
      ...common,
      `    tool_name: "${node.label}",`,
      '    tool_args_hash: "blake3:args-918...",',
      '    receipt_hash: "sha256:92be...1d03",',
      '    previous_receipt_hash: "sha256:4c88...e201",',
      '    ed25519_sig: "ed25519:9b2f...d84a",',
      '    public_key_id: "pk_live_agent_01"',
    ];
  }

  return [
    ...common,
    '    scope_hash: "blake3:scope-91a...",',
    '    input_artifact_hashes: ["blake3:upstream-a3f...", "blake3:upstream-b7c..."],',
    '    output_artifact_hashes: ["blake3:out-77d..."],',
    '    policy_snapshot_hash: "blake3:policy-202..."'
  ];
}

function ArrowHead({ id, color }: { id: string; color: string }) {
  return (
    <marker id={id} viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="7" markerHeight="5" orient="auto-start-reverse">
      <polygon points="0 0, 10 3.5, 0 7" fill={color} />
    </marker>
  );
}

function GateShape({ x, y, size, stroke, fill, opacity }: { x: number; y: number; size: number; stroke: string; fill: string; opacity: number }) {
  const s = size;
  const points = `${x},${y - s} ${x + s * 1.2},${y} ${x},${y + s} ${x - s * 1.2},${y}`;
  return <polygon points={points} fill={fill} stroke={stroke} strokeWidth={1.5} opacity={opacity} style={{ transition: 'all 0.35s ease' }} />;
}

interface AgentGraphProps {
  startSignal: number;
  onComplete?: () => void;
  onSignedVisible?: () => void;
}

export default function AgentGraph({ startSignal, onComplete, onSignedVisible }: AgentGraphProps) {
  const [phase, setPhase] = useState<'idle' | 'animating' | 'paused' | 'done'>('idle');
  const [activeNodes, setActiveNodes] = useState<Set<string>>(new Set());
  const [activeEdges, setActiveEdges] = useState<Set<string>>(new Set());
  const [showSigning, setShowSigning] = useState<Set<string>>(new Set());
  const [pulseNode, setPulseNode] = useState<string | null>(null);
  const [gateFlash, setGateFlash] = useState<Set<string>>(new Set());
  const [showContext, setShowContext] = useState<Set<string>>(new Set());
  const [selectedNode, setSelectedNode] = useState<string>('send_replies');
  const [showHash, setShowHash] = useState<Set<string>>(new Set());

  const timeoutRef = useRef<number | null>(null);
  const stepIndexRef = useRef(0);
  const stepDelayRef = useRef(0);
  const stepStartedAtRef = useRef(0);
  const remainingDelayRef = useRef(0);

  const resetVisualState = useCallback(() => {
    setActiveNodes(new Set());
    setActiveEdges(new Set());
    setShowSigning(new Set());
    setPulseNode(null);
    setGateFlash(new Set());
    setShowContext(new Set());
    setShowHash(new Set());
    setSelectedNode('send_replies');
  }, []);

  const clearPending = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const applyEvent = useCallback((event: TimelineEvent) => {
    if (event.kind === 'node' && event.id) {
      setActiveNodes((prev) => new Set(prev).add(event.id!));
      setPulseNode(event.id);
      const node = nodeById(event.id);
      if (node.context) {
        setShowContext((prev) => new Set(prev).add(event.id!));
      }
      if (node.type === 'gate') {
        setGateFlash((prev) => new Set(prev).add(event.id!));
      }
      if (HASH_CHAIN[event.id]) {
        setShowHash((prev) => new Set(prev).add(event.id!));
      }
      return;
    }

    if (event.kind === 'edge' && event.from && event.to) {
      setActiveEdges((prev) => new Set(prev).add(`${event.from}-${event.to}`));
      return;
    }

    if (event.kind === 'gate_off' && event.id) {
      setGateFlash((prev) => {
        const next = new Set(prev);
        next.delete(event.id!);
        return next;
      });
      return;
    }

    if (event.kind === 'sign' && event.id) {
      setShowSigning((prev) => new Set(prev).add(event.id!));
      if (event.id === 'send_replies') onSignedVisible?.();
      return;
    }

    if (event.kind === 'complete') {
      setPhase('done');
      setPulseNode(null);
      onComplete?.();
    }
  }, [onComplete, onSignedVisible]);

  const scheduleStep = useCallback((overrideDelay?: number) => {
    if (stepIndexRef.current >= TIMELINE.length) return;

    const event = TIMELINE[stepIndexRef.current];
    const delay = overrideDelay ?? event.delay;
    stepDelayRef.current = delay;
    remainingDelayRef.current = delay;
    stepStartedAtRef.current = Date.now();

    timeoutRef.current = window.setTimeout(() => {
      applyEvent(event);
      stepIndexRef.current += 1;
      timeoutRef.current = null;

      if (event.kind !== 'complete') {
        scheduleStep();
      }
    }, delay);
  }, [applyEvent]);

  const startAnimation = useCallback(() => {
    clearPending();
    resetVisualState();
    stepIndexRef.current = 0;
    remainingDelayRef.current = 0;
    setPhase('animating');
    scheduleStep();
  }, [clearPending, resetVisualState, scheduleStep]);

  const pauseAnimation = useCallback(() => {
    if (phase !== 'animating' || timeoutRef.current === null) return;
    const elapsed = Date.now() - stepStartedAtRef.current;
    remainingDelayRef.current = Math.max(0, stepDelayRef.current - elapsed);
    clearPending();
    setPhase('paused');
  }, [clearPending, phase]);

  const resumeAnimation = useCallback(() => {
    if (phase !== 'paused') return;
    setPhase('animating');
    scheduleStep(remainingDelayRef.current);
  }, [phase, scheduleStep]);

  useEffect(() => {
    resetVisualState();
    setPhase('idle');
  }, [startSignal, resetVisualState]);

  useEffect(() => {
    if (startSignal > 0) {
      const startTimer = window.setTimeout(() => {
        startAnimation();
      }, 520);

      return () => clearTimeout(startTimer);
    }
    return undefined;
  }, [startAnimation, startSignal]);

  useEffect(() => () => clearPending(), [clearPending]);

  const selectedUpstream = useMemo(() => getUpstream(selectedNode), [selectedNode]);
  const selectedEdges = useMemo(() => getUpstreamEdges(selectedUpstream), [selectedUpstream]);
  const selectedDetail = NODE_DETAILS[selectedNode];
  const selectedNodeDef = nodeById(selectedNode);
  const selectedInvarianceFields = useMemo(() => getInvarianceFields(selectedNodeDef), [selectedNodeDef]);
  function isHot(id: string) {
    return HOT_PATH_ORDER.includes(id);
  }

  function getNodeStyle(node: NodeDef) {
    const dim = node.type === 'dim' || node.type === 'dim_signed';
    const active = activeNodes.has(node.id);
    const isGate = node.type === 'gate';
    const isSigned = node.type === 'signed' || node.type === 'dim_signed';
    const isSelected = selectedUpstream.has(node.id);
    const animating = phase === 'animating' || phase === 'paused' || phase === 'done';

    if (!isSelected) {
      return { fill: '#fafafa', stroke: '#ececec', text: '#d2d2d2', r: isGate ? 20 : 26, opacity: 0.4 };
    }

    if (isGate) {
      const flashing = gateFlash.has(node.id);
      return {
        fill: active ? (flashing ? '#fff3e0' : '#fffbf0') : '#fffdf7',
        stroke: '#e6a817',
        text: '#b8860b',
        r: 20,
        opacity: 1,
      };
    }

    if (dim) return { fill: '#fbfbfb', stroke: '#d6d6d6', text: '#ababab', r: 26, opacity: 1 };

    if (animating && !active && isHot(node.id)) {
      return { fill: '#fdfdfd', stroke: '#dfdfdf', text: '#c0c0c0', r: 26, opacity: 1 };
    }

    if (node.type === 'input') return { fill: '#fff', stroke: '#333', text: '#222', r: 28, opacity: 1 };
    if (node.type === 'core') return { fill: '#fff', stroke: '#555', text: '#333', r: 27, opacity: 1 };
    if (isSigned) return { fill: active ? '#fff8f8' : '#fff', stroke: '#e04040', text: '#c33', r: 26, opacity: 1 };
    return { fill: active ? '#f4f9ff' : '#fff', stroke: '#3388ff', text: '#1a6ae0', r: 26, opacity: 1 };
  }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 12, color: '#7d7d7d', fontFamily: "'Helvetica Neue', sans-serif" }}>
          Click any node to inspect its inputs, outputs, and upstream lineage.
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={pauseAnimation}
            disabled={phase !== 'animating'}
            style={{
              padding: '7px 14px',
              fontSize: 12,
              fontWeight: 500,
              borderRadius: 7,
              border: '1px solid #e3e3e3',
              background: phase === 'animating' ? '#fafafa' : '#f7f7f7',
              color: phase === 'animating' ? '#333' : '#b0b0b0',
              cursor: phase === 'animating' ? 'pointer' : 'default',
              fontFamily: "'Helvetica Neue', sans-serif",
            }}
          >
            Pause
          </button>
          <button
            onClick={resumeAnimation}
            disabled={phase !== 'paused'}
            style={{
              padding: '7px 14px',
              fontSize: 12,
              fontWeight: 500,
              borderRadius: 7,
              border: '1px solid #d7e7ff',
              background: phase === 'paused' ? '#f4f9ff' : '#f7f7f7',
              color: phase === 'paused' ? '#3388ff' : '#b0b0b0',
              cursor: phase === 'paused' ? 'pointer' : 'default',
              fontFamily: "'Helvetica Neue', sans-serif",
            }}
          >
            Resume
          </button>
        </div>
      </div>

      <svg viewBox="0 0 820 640" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <defs>
          <ArrowHead id="arr-dim" color="#e0e0e0" />
          <ArrowHead id="arr-hot" color="#3388ff" />
          <ArrowHead id="arr-wait" color="#d5d5d5" />
          <ArrowHead id="arr-gate" color="#e6a817" />
          <ArrowHead id="arr-focus" color="#3388ff" />
        </defs>

        {EDGES.map((edge, index) => {
          const from = nodeById(edge.from);
          const to = nodeById(edge.to);
          const key = `${edge.from}-${edge.to}`;
          const active = activeEdges.has(key);
          const inSelectedPath = selectedEdges.has(key);
          const isGateEdge = edge.from.includes('gate') || edge.to.includes('gate');

          let stroke = '#efefef';
          let marker = 'url(#arr-dim)';
          let strokeWidth = 1;
          let opacity = 0.25;
          let dashArray = edge.hot ? 'none' : '4 3';

          if (inSelectedPath) {
            stroke = isGateEdge ? '#e6a817' : active ? '#3388ff' : '#b4d3ff';
            marker = isGateEdge ? 'url(#arr-gate)' : active ? 'url(#arr-hot)' : 'url(#arr-focus)';
            strokeWidth = active ? 2 : 1.4;
            opacity = active ? 0.95 : 0.7;
            dashArray = edge.hot ? 'none' : '4 3';
          } else if (edge.hot && (phase === 'animating' || phase === 'paused' || phase === 'done')) {
            stroke = '#ddd';
            marker = 'url(#arr-wait)';
            opacity = 0.3;
          }

          return (
            <path
              key={index}
              d={edgePath(from, to)}
              fill="none"
              stroke={stroke}
              strokeWidth={strokeWidth}
              markerEnd={marker}
              opacity={opacity}
              strokeDasharray={dashArray}
              style={{ transition: 'stroke 0.35s, opacity 0.35s' }}
            />
          );
        })}

        {NODES.map((node) => {
          const style = getNodeStyle(node);
          const isPulsing = pulseNode === node.id && phase !== 'paused';
          const isSigned = node.type === 'signed' || node.type === 'dim_signed';
          const isGate = node.type === 'gate';
          const isDim = node.type === 'dim' || node.type === 'dim_signed';
          const isActive = activeNodes.has(node.id);
          const isSelected = selectedNode === node.id;
          const hasContext = showContext.has(node.id) && node.context;
          const flashing = gateFlash.has(node.id);
          const showBadge = showSigning.has(node.id);

          return (
            <g key={node.id} onClick={() => setSelectedNode(node.id)} style={{ cursor: 'pointer' }} opacity={style.opacity}>
              {isPulsing && (
                <circle cx={node.x} cy={node.y} r={style.r + 8} fill="none" stroke={isGate ? '#e6a817' : isSigned ? '#e04040' : '#3388ff'} strokeWidth={1.5} opacity={0.3}>
                  <animate attributeName="r" from={style.r + 2} to={style.r + 16} dur="0.7s" fill="freeze" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="0.7s" fill="freeze" />
                </circle>
              )}

              {isGate ? (
                <>
                  <GateShape x={node.x} y={node.y} size={style.r} stroke={style.stroke} fill={style.fill} opacity={1} />
                  <text
                    x={node.x}
                    y={node.y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={style.text}
                    fontSize={7}
                    fontWeight={600}
                    fontFamily="'SF Mono', 'Fira Code', monospace"
                    letterSpacing="0.3"
                  >
                    {flashing ? 'APPROVAL' : '⬥'}
                  </text>
                </>
              ) : (
                <>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={style.r}
                    fill={style.fill}
                    stroke={style.stroke}
                    strokeWidth={isSelected ? 2.4 : isActive && !isDim ? 2 : 1.2}
                    strokeDasharray={isDim ? '4 3' : 'none'}
                    style={{ transition: 'all 0.35s ease' }}
                  />
                  <text
                    x={node.x}
                    y={node.y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={style.text}
                    fontSize={node.type === 'input' || node.type === 'core' ? 10.5 : 8.5}
                    fontWeight={isActive || isSelected ? 600 : 400}
                    fontFamily="'SF Mono', 'Fira Code', 'Courier New', monospace"
                    style={{ transition: 'fill 0.35s' }}
                  >
                    {node.label.length > 15 ? `${node.label.slice(0, 14)}…` : node.label}
                  </text>
                </>
              )}

              {isDim && (
                <text x={node.x} y={node.y + style.r + 12} textAnchor="middle" fill="#ccc" fontSize={6.5} fontStyle="italic" fontFamily="'Helvetica Neue', sans-serif">
                  available
                </text>
              )}

              {hasContext && (
                <g style={{ opacity: 1, transition: 'opacity 0.4s ease' }}>
                  <rect
                    x={node.x + style.r + 6}
                    y={node.y - 9}
                    width={node.context!.length * 5.5 + 14}
                    height={18}
                    rx={9}
                    fill="#f8f6f2"
                    stroke="#e2ddd5"
                    strokeWidth={0.7}
                  />
                  <text x={node.x + style.r + 13} y={node.y + 2} fill="#8a8578" fontSize={7.5} fontFamily="'SF Mono', monospace" fontWeight={500}>
                    {node.context}
                  </text>
                </g>
              )}

              {isSigned && (
                <g style={{ opacity: showBadge ? 1 : isDim ? 0.3 : 0, transition: 'opacity 0.45s ease' }}>
                  <rect x={node.x - 26} y={node.y + 30} width={52} height={15} rx={7.5} fill={showBadge ? '#fff5f5' : '#f8f8f8'} stroke={showBadge ? '#e04040' : '#ddd'} strokeWidth={0.7} />
                  <text x={node.x} y={node.y + 40} textAnchor="middle" fill={showBadge ? '#c33' : '#ccc'} fontSize={7} fontWeight={600} fontFamily="'SF Mono', monospace" letterSpacing="0.3">
                    SIGNED ✓
                  </text>
                </g>
              )}

              {/* Hash label — every hot-path node shows its hash when activated */}
              {showHash.has(node.id) && HASH_CHAIN[node.id] && !isDim && (
                <g style={{ opacity: 1, transition: 'opacity 0.4s ease' }}>
                  <text
                    x={node.x}
                    y={node.y + style.r + (isSigned ? 52 : (isGate ? 14 : 14))}
                    textAnchor="middle"
                    fill="#9a9590"
                    fontSize={6.5}
                    fontFamily="'SF Mono', monospace"
                    fontWeight={500}
                    letterSpacing="0.3"
                  >
                    #{HASH_CHAIN[node.id].hash}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {(activeNodes.has('draft_replies') || activeNodes.has('extract_todos')) && (
          <text x={250} y={418} textAnchor="middle" fill="#3388ff" fontSize={8} fontWeight={500} fontFamily="'Helvetica Neue', sans-serif" letterSpacing="1" opacity={0.5}>
            PARALLEL
          </text>
        )}

        {phase === 'idle' && (
          <text x={410} y={625} textAnchor="middle" fill="#9a9a9a" fontSize={9} fontWeight={500} fontFamily="'Helvetica Neue', sans-serif" opacity={0.8}>
            Waiting for the prompt to finish typing before traversal starts
          </text>
        )}

        {phase === 'paused' && (
          <text x={410} y={625} textAnchor="middle" fill="#b8860b" fontSize={9} fontWeight={500} fontFamily="'Helvetica Neue', sans-serif" opacity={0.85}>
            Traversal paused
          </text>
        )}

        {phase === 'done' && (
          <text x={410} y={625} textAnchor="middle" fill="#3388ff" fontSize={9} fontWeight={500} fontFamily="'Helvetica Neue', sans-serif" opacity={0.75}>
            Traversal complete
          </text>
        )}
      </svg>

      {/* Node Inspector */}
      <div
        style={{
          marginTop: 14,
          border: '1px solid #ece8df',
          background: '#fffdfa',
          borderRadius: 14,
          padding: '16px 18px',
        }}
      >
        <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9c927f', marginBottom: 6 }}>
          Node Inspector
        </div>
        <div style={{ fontSize: 18, fontWeight: 600, color: '#222', marginBottom: 6 }}>
          {selectedDetail.title}
        </div>
        <div style={{ fontSize: 13, color: '#6f6b63', lineHeight: 1.6, marginBottom: 12 }}>
          {selectedDetail.summary}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 10 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a29a8d', marginBottom: 6 }}>
              Receives
            </div>
            {selectedDetail.receives.map((item) => (
              <div key={item} style={{ fontSize: 12, color: '#4f4b45', marginBottom: 5 }}>{item}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a29a8d', marginBottom: 6 }}>
              Emits
            </div>
            {selectedDetail.emits.map((item) => (
              <div key={item} style={{ fontSize: 12, color: '#4f4b45', marginBottom: 5 }}>{item}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a29a8d', marginBottom: 6 }}>
              Should Include
            </div>
            {selectedDetail.includes.map((item) => (
              <div key={item} style={{ fontSize: 12, color: '#4f4b45', marginBottom: 5 }}>{item}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a29a8d', marginBottom: 6 }}>
              Invariance
            </div>
            {selectedInvarianceFields.map((item) => (
              <div key={item} style={{ fontSize: 12, color: '#4f4b45', marginBottom: 5 }}>{item}</div>
            ))}
          </div>
        </div>

        {/* Signed receipt for selected node */}
        {HASH_CHAIN[selectedNode] && (
          <div style={{ marginTop: 14, padding: '12px 14px', background: '#f7f4ee', border: '1px solid #ece5d8', borderRadius: 10 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a29a8d', marginBottom: 8 }}>
              Signed Tool Call Receipt
            </div>
            <div style={{ fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: 12, lineHeight: 1.7, color: '#4d463b' }}>
              <div><span style={{ color: 'var(--accent)', fontWeight: 500 }}>node</span><span style={{ opacity: 0.4 }}>=</span>{selectedNode}</div>
              <div><span style={{ color: 'var(--accent)', fontWeight: 500 }}>hash</span><span style={{ opacity: 0.4 }}>=</span>{HASH_CHAIN[selectedNode].hash}</div>
              <div><span style={{ color: 'var(--accent)', fontWeight: 500 }}>prev</span><span style={{ opacity: 0.4 }}>=</span>{HASH_CHAIN[selectedNode].prev ?? '(genesis)'}</div>
              <div><span style={{ color: 'var(--accent)', fontWeight: 500 }}>sig</span><span style={{ opacity: 0.4 }}>=</span>{HASH_CHAIN[selectedNode].sig}</div>
            </div>
          </div>
        )}
      </div>

      {/* Full hash chain — visible after traversal completes */}
      {phase === 'done' && (
        <div
          style={{
            marginTop: 14,
            border: '1px solid #ece8df',
            background: '#fffdfa',
            borderRadius: 14,
            padding: '16px 18px',
            animation: 'node-detail-in 0.4s ease',
          }}
        >
          <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9c927f', marginBottom: 12 }}>
            Hash Chain — Full Execution Trace
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto', padding: '4px 0' }}>
            {HOT_PATH_ORDER.map((nodeId, i) => {
              const chain = HASH_CHAIN[nodeId];
              if (!chain) return null;
              const node = nodeById(nodeId);
              const isLast = i === HOT_PATH_ORDER.length - 1;
              return (
                <div key={nodeId} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  <div
                    onClick={() => setSelectedNode(nodeId)}
                    style={{
                      padding: '6px 10px',
                      background: selectedNode === nodeId ? '#f4f0ea' : 'transparent',
                      border: selectedNode === nodeId ? '1px solid #ddd5c8' : '1px solid transparent',
                      borderRadius: 8,
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ fontSize: 9.5, color: '#6f6b63', fontFamily: "'SF Mono', monospace", fontWeight: 600, marginBottom: 2 }}>
                      {node.label.length > 12 ? node.label.slice(0, 11) + '…' : node.label}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--accent)', fontFamily: "'SF Mono', monospace", fontWeight: 600 }}>
                      #{chain.hash}
                    </div>
                    {chain.prev && (
                      <div style={{ fontSize: 8, color: '#b0a89c', fontFamily: "'SF Mono', monospace", marginTop: 1 }}>
                        ← {chain.prev}
                      </div>
                    )}
                  </div>
                  {!isLast && (
                    <div style={{ color: '#ccc', fontSize: 14, margin: '0 2px', flexShrink: 0 }}>→</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
