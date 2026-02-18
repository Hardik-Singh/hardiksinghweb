import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (href: string) => {
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/hardiksingh' },
    { icon: Linkedin, href: 'https://linkedin.com/in/hardiksingh' },
    { icon: Twitter, href: 'https://twitter.com/hardiksingh' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-row">
          <span
            className="footer-brand"
            onClick={() => scrollToSection('#home')}
          >
            Hardik Singh
          </span>

          <div className="footer-links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="footer-social">
            {socialLinks.map((s, i) => (
              <a key={i} href={s.href}>
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Hardik Singh. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
