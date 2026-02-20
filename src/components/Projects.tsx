import { useState } from 'react';
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const INITIAL_COUNT = 6;

const Projects = () => {
  const ref = useScrollReveal<HTMLElement>();
  const [showAll, setShowAll] = useState(false);

  const projects = [
    {
      id: 'infiniwell',
      name: 'InfiniWell',
      description: 'Advanced data processing and analytics platform with real-time insights',
      background: 'linear-gradient(135deg, #c45d3e 0%, #e8879b 100%)',
      tech: ['Python', 'TensorFlow', 'AWS'],
      isPrivate: true
    },
    {
      id: 'loopit',
      name: 'LoopIt',
      description: 'Interactive loop visualization and optimization tool for developers',
      background: 'linear-gradient(135deg, #7EC8E3 0%, #3D7EA6 100%)',
      tech: ['JavaScript', 'HTML5', 'CSS3'],
      isPrivate: true
    },
    {
      id: 'virtuchat',
      name: 'VirtuChat',
      description: 'AI-powered virtual chat assistant with natural language processing',
      background: 'linear-gradient(135deg, #A8D5A2 0%, #5FA35A 100%)',
      tech: ['Python', 'TensorFlow', 'React'],
      isPrivate: true
    },
    {
      id: 'chaos-theory',
      name: 'Chaos Theory Visualizer',
      description: 'Mathematical visualization of chaos theory and fractal patterns',
      background: 'linear-gradient(135deg, #F5C77E 0%, #D48B2A 100%)',
      tech: ['Python', 'Matplotlib', 'NumPy'],
      isPrivate: true
    },
    {
      id: 'huffman',
      name: 'Huffman Coding',
      description: 'Data compression algorithm implementation with visualization',
      background: 'linear-gradient(135deg, #C9A8E2 0%, #8752A8 100%)',
      tech: ['C++', 'Data Structures', 'Algorithms'],
      isPrivate: false
    },
    {
      id: 'cargo',
      name: 'Cargo Management System',
      description: 'Efficient cargo tracking and logistics management platform',
      background: 'linear-gradient(135deg, #8ECAE6 0%, #3094AC 100%)',
      tech: ['Java', 'Spring Boot', 'MySQL'],
      isPrivate: true
    },
    {
      id: 'alignment-sandbox',
      name: 'Alignment Sandbox',
      description: 'Platform for training and evaluating LLM alignment algorithms with real-time RLHF visualization, supporting PPO, GRPO, and custom reward shaping strategies',
      background: 'linear-gradient(135deg, #FF6B6B 0%, #C44D4D 100%)',
      tech: ['PyTorch', 'FastAPI', 'React', 'Docker'],
      isPrivate: true
    },
    {
      id: 'trading-exchange',
      name: 'Trading Exchange',
      description: 'High-performance limit order book matching engine built in C++20 with lock-free concurrency, achieving 5,000+ orders/sec with sub-1ms p99 latency',
      background: 'linear-gradient(135deg, #2ECC71 0%, #1A7A42 100%)',
      tech: ['C++20', 'Boost', 'pybind11', 'React'],
      isPrivate: true
    },
    {
      id: 'poker-bot',
      name: 'Poker Bot',
      description: 'Deep reinforcement learning poker agent using an AlphaHoldem-inspired Transformer architecture with Go and Rust game engines communicating over gRPC',
      background: 'linear-gradient(135deg, #E74C3C 0%, #8E2424 100%)',
      tech: ['PyTorch', 'Go', 'Rust', 'gRPC'],
      isPrivate: true
    },
    {
      id: 'teach-ai',
      name: 'Teach AI',
      description: 'Multi-agent educational system with hierarchical message lanes, adaptive lesson pacing, real-time student performance analytics, and RAG-powered content retrieval',
      background: 'linear-gradient(135deg, #3498DB 0%, #1F5F8B 100%)',
      tech: ['Python', 'FastAPI', 'PostgreSQL', 'React'],
      isPrivate: true
    },
    {
      id: 'behavioral-coach',
      name: 'Behavioral Coach',
      description: 'AI behavioral coaching platform with a Planner-Verifier multi-agent architecture, FAISS-powered vector memory, and iterative plan refinement loops',
      background: 'linear-gradient(135deg, #9B59B6 0%, #6C3483 100%)',
      tech: ['Python', 'FAISS', 'PostgreSQL', 'React'],
      isPrivate: true
    },
    {
      id: 'guitar-tab-editor',
      name: 'Guitar Tab Editor',
      description: 'Browser-based tablature editor with in-browser SQLite storage, support for playing techniques and finger annotations, and ML-assisted tab suggestions via TensorFlow.js',
      background: 'linear-gradient(135deg, #F39C12 0%, #B7740E 100%)',
      tech: ['React', 'SQLite', 'TensorFlow.js', 'Zustand'],
      isPrivate: true
    },
    {
      id: 'bot-orchestration',
      name: 'Bot Orchestration',
      description: 'Slack-style interface demonstrating AI-driven multi-bot coordination with permission-gated execution, typing indicators, and cross-service workflow chaining',
      background: 'linear-gradient(135deg, #1ABC9C 0%, #0E7A64 100%)',
      tech: ['React', 'TypeScript', 'Tailwind CSS'],
      isPrivate: true
    },
    {
      id: 'scroll-gesture',
      name: 'Gesture Scroll',
      description: 'Webcam-powered hand gesture controller using MediaPipe for real-time hand tracking, mapping swipe, thumbs-up, and palm gestures to OS-level scroll and click actions',
      background: 'linear-gradient(135deg, #E67E22 0%, #A35A15 100%)',
      tech: ['Python', 'MediaPipe', 'OpenCV', 'Flask'],
      isPrivate: true
    },
    {
      id: 'evite-circles',
      name: 'Evite Circles',
      description: 'Event invitation and social circle management app with circle-based contact grouping, event creation, RSVP tracking, and public invite landing pages',
      background: 'linear-gradient(135deg, #E91E63 0%, #AD1457 100%)',
      tech: ['React', 'TypeScript', 'React Router', 'Tailwind CSS'],
      isPrivate: true
    },
    {
      id: 'rl-trading-agents',
      name: 'RL Trading Agents',
      description: 'Autonomous reinforcement learning agents competing on a live order book exchange, using PPO and multi-agent self-play to discover emergent market-making and arbitrage strategies',
      background: 'linear-gradient(135deg, #00C853 0%, #007E33 100%)',
      tech: ['PyTorch', 'C++20', 'gRPC', 'Docker'],
      isPrivate: true
    },
    {
      id: 'options-pricing',
      name: 'Options Pricing Engine',
      description: 'Quantitative options pricing model implementing Black-Scholes, Monte Carlo simulation, and binomial tree methods with real-time Greeks calculation and volatility surface visualization',
      background: 'linear-gradient(135deg, #FFD700 0%, #B8960C 100%)',
      tech: ['Python', 'NumPy', 'C++', 'React'],
      isPrivate: true
    },
    {
      id: 'copy-trading',
      name: 'Copy Trading Bot',
      description: 'Automated copy-trading system that mirrors top-performing traders in real time with configurable risk scaling, position sizing, and portfolio-level drawdown protection',
      background: 'linear-gradient(135deg, #00BCD4 0%, #00838F 100%)',
      tech: ['Python', 'WebSockets', 'PostgreSQL', 'Redis'],
      isPrivate: true
    },
    {
      id: 'visetta',
      name: 'Visetta',
      description: 'Local-first AI assistant that runs entirely on-device, combining voice control, screen context awareness, and tool orchestration to automate workflows without sending data to the cloud',
      background: 'linear-gradient(135deg, #7C4DFF 0%, #4A148C 100%)',
      tech: ['Python', 'FastAPI', 'LLM', 'Electron'],
      isPrivate: true
    }
  ];

  const visible = showAll ? projects : projects.slice(0, INITIAL_COUNT);

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="container reveal">
        <span className="section-label">Projects</span>
        <h2 className="section-heading">Featured work</h2>

        <div className="projects-grid">
          {visible.map((project) => (
            <div key={project.id} className="card project-card">
              <div
                className="project-visual"
                style={{ background: project.background }}
              >
                <span className="project-visual-name">{project.name}</span>
                {project.isPrivate && (
                  <span className="private-badge">Private</span>
                )}
                {!project.isPrivate && (
                  <div className="project-hover-links">
                    <a href="#" className="project-link"><ExternalLink size={18} /></a>
                    <a href="#" className="project-link"><Github size={18} /></a>
                  </div>
                )}
              </div>
              <div className="project-body">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length > INITIAL_COUNT && (
          <button
            className="btn-ghost"
            onClick={() => setShowAll(!showAll)}
            style={{ margin: '2rem auto 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            {showAll ? (
              <>Show less <ChevronUp size={18} /></>
            ) : (
              <>Show all {projects.length} projects <ChevronDown size={18} /></>
            )}
          </button>
        )}
      </div>
    </section>
  );
};

export default Projects;
