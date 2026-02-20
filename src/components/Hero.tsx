import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.classList.add('visible');
    });
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero" ref={sectionRef}>
      <div className="hero-inner">
        <span className="hero-badge">
          <span className="badge-dot" />
          Available for opportunities
        </span>

        <h1 className="hero-title">
          Building software{' '}
          <br />
          that <em>matters</em>
        </h1>

        <p className="hero-subtitle">
          Hardik Singh — the GOAT
        </p>

        <div className="hero-buttons">
          <a
            href="#projects"
            className="btn-primary"
            onClick={(e) => { e.preventDefault(); scrollToSection('#projects'); }}
          >
            View my work
          </a>
          <a
            href="#contact"
            className="btn-ghost"
            onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
          >
            Get in touch →
          </a>
        </div>
      </div>

      <div className="scroll-hint" onClick={() => scrollToSection('#about')}>
        <ChevronDown size={24} />
      </div>
    </section>
  );
};

export default Hero;
