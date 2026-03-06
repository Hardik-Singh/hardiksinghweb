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
      </div>
    </section>
  );
};

export default About;
