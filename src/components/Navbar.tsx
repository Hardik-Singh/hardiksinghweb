import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#writing', label: 'Writing' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollToSection = (href: string) => {
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar-pill ${isScrolled ? 'compact' : ''}`}>
      <div className="navbar-inner">
        <a
          className="nav-brand"
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
        >
          <span className="brand-full">Hardik Singh</span>
          <span className="brand-mono">HS</span>
        </a>

        <div className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="/assets/resume.pdf"
          className="btn-primary nav-cta"
          download="Hardik_Singh_Resume.pdf"
        >
          Resume
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
