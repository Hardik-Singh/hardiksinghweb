import { motion } from 'framer-motion';

const Footer = () => {
  const footerLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
    { href: '/assets/resume.pdf', label: 'Resume', isDownload: true }
  ];

  const socialLinks = [
    { icon: 'fab fa-github', href: '#' },
    { icon: 'fab fa-linkedin', href: '#' },
    { icon: 'fab fa-twitter', href: '#' },
    { icon: 'fas fa-file-download', href: '/assets/resume.pdf', isDownload: true }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="footer-logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('#home')}
          >
            <img src="/assets/logo.png" alt="Hardik Singh" />
            <span>Hardik Singh</span>
          </motion.div>

          <div className="footer-links">
            {footerLinks.map((link, index) => (
              <motion.a
                key={link.href + link.label}
                href={link.href}
                download={link.isDownload ? 'Hardik_Singh_Resume.pdf' : undefined}
                onClick={link.isDownload ? undefined : (e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          <div className="footer-social">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.icon}
                href={social.href}
                download={social.isDownload ? 'Hardik_Singh_Resume.pdf' : undefined}
                title={social.isDownload ? 'Download Resume' : undefined}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className={social.icon}></i>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p>&copy; 2026 Hardik Singh. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
