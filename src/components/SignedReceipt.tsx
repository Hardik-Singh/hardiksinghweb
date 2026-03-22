interface SignedReceiptProps {
  visible: boolean;
}

const RECEIPT_LINES = [
  { key: 'agent', value: 'reply_worker' },
  { key: 'tool', value: 'send_email' },
  { key: 'inputs', value: 'hash(0x3a7f…c1e2)' },
  { key: 'parent_nodes', value: 'draft_replies, classify_emails' },
  { key: 'sig', value: 'ed25519:9b2f…d84a' },
];

export default function SignedReceipt({ visible }: SignedReceiptProps) {
  return (
    <div className={`signed-receipt ${visible ? 'visible' : ''}`}>
      <div className="signed-receipt-header">
        <span className="signed-receipt-dot" />
        Signed Tool Call Receipt
      </div>
      <div className="signed-receipt-body">
        {RECEIPT_LINES.map((line) => (
          <div key={line.key} className="signed-receipt-line">
            <span className="signed-receipt-key">{line.key}</span>
            <span className="signed-receipt-eq">=</span>
            <span className="signed-receipt-value">{line.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
