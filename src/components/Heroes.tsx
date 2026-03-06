import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Heroes = () => {
  const ref = useScrollReveal<HTMLElement>();
  const [collapsed, setCollapsed] = useState(true);

  return (
    <section id="heroes" className="section" ref={ref}>
      <div className="container reveal">
        <button
          className="collapsible-header"
          onClick={() => setCollapsed(!collapsed)}
        >
          <div>
            <span className="section-label">Values</span>
            <h2 className="section-heading" style={{ marginBottom: 0 }}>People I look up to</h2>
          </div>
          {collapsed ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
        </button>

        <div className={`collapsible-body ${collapsed ? 'collapsed' : 'expanded'}`}>
          <div className="heroes-grid">
            <div className="card hero-card">
              <h4 className="hero-card-name">Cristiano Ronaldo</h4>
              <p className="hero-card-text">
                He just shows up every day and does the hard work because he knows it needs to be done. No shortcuts, no excuses. That discipline is everything.
              </p>
            </div>
            <div className="card hero-card">
              <h4 className="hero-card-name">Paul Graham</h4>
              <p className="hero-card-text">
                He talks about the relationship between art and technology as painters. I like to think of myself as an artist, not an engineer. The best work comes from that mindset.
              </p>
            </div>
            <div className="card hero-card">
              <h4 className="hero-card-name">Drake</h4>
              <p className="hero-card-text">
                His ability to connect with people and reinvent genres while expressing his authentic self. That kind of creative honesty is what I strive for.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Heroes;
