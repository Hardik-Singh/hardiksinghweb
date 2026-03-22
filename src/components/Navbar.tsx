import { useState, useEffect } from 'react';
import { useRoute } from '../hooks/useRoute';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname, navigate } = useRoute();

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
    { href: '/playground/emailDCA', label: 'Playground' },
  ];

  const handleNavClick = (href: string) => {
    // Path-based navigation (e.g., /playground/emailDCA)
    if (href.startsWith('/')) {
      navigate(href);
      return;
    }
    // Hash link from the home page
    if (href === '#home') {
      if (pathname !== '/') {
        navigate('/');
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    // Hash link — if not on home, navigate there first
    if (pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar-pill ${isScrolled ? 'compact' : ''}`}>
      <div className="navbar-inner">
        <a
          className="nav-brand"
          href="/"
          onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
        >
          <span className="brand-full">Hardik Singh</span>
          <span className="brand-mono">HS</span>
        </a>

        <div className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link ${item.href === '/playground/emailDCA' && pathname === '/playground/emailDCA' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
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
