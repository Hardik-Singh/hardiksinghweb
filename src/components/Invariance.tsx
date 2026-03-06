import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

const Invariance = () => {
  const ref = useScrollReveal<HTMLElement>();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section id="invariance" className="section" ref={ref}>
      <div className="container reveal">
        <button
          className="collapsible-header"
          onClick={() => setCollapsed(!collapsed)}
        >
          <div>
            <span className="section-label">Current Focus</span>
            <h2 className="section-heading" style={{ marginBottom: 0 }}>Invariance</h2>
          </div>
          {collapsed ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
        </button>

        <div className={`collapsible-body ${collapsed ? 'collapsed' : 'expanded'}`}>
          <div className="invariance-content">
            <p className="body-text">
              Decades of research in evolutionary psychology and behavioral science tell us the same
              story: deception is not a bug in human nature, it's a feature. We lie to cooperate, to
              compete, to survive. If this is the foundation that intelligent systems are trained on,
              we should expect AI agents to inherit and amplify those tendencies. As AGI approaches,
              I don't trust these agents by default, and I don't think you should either.
            </p>
            <p className="body-text">
              That's why I'm building <strong>Invariance</strong>. It's an AI safety and verification
              infrastructure company focused on making autonomous agents provably trustworthy.
              We're building cryptographic verification protocols that create tamper-proof audit trails
              for agent behavior, alongside anomaly detection SDKs for both on-chain and off-chain
              development, so whether you're deploying agents in smart contracts or enterprise
              backends, you can verify what they actually did, not just what they said they did.
            </p>
            <a
              href="https://useinvariance.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}
            >
              Visit Invariance <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Invariance;
