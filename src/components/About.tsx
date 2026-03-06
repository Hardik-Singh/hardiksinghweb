import { useScrollReveal } from '../hooks/useScrollReveal';

const About = () => {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container reveal">
        <span className="section-label">About</span>
        <h2 className="section-heading">Who I am</h2>

        <div className="chunk-row">
          <div className="chunk-text">
            <p className="body-text">
              Someone who genuinely cares about doing things right. I'm obsessed with excellence
              across every domain I touch, whether that's software, music, or anything else life
              throws at me. I go deep, I learn constantly, and I bring that same intensity to everything.
              I'm multidisciplinary by nature and I think the best ideas live at the intersection of fields.
            </p>
            <p className="body-text">
              Beyond the work, I try to be someone who is kind, authentic, and good to be around.
              I want to make a real impact and build things that matter. I don't chase greatness
              as an idea. I just can't help it.
            </p>
          </div>

          <div className="chunk-media">
            <div className="card about-photo-card">
              <img src="/assets/me.jpg" alt="Hardik Singh" />
            </div>
          </div>
        </div>

        <div className="heroes-section">
          <h3 className="heroes-heading">People I look up to</h3>
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

export default About;
