import { useState } from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Contact = () => {
  const ref = useScrollReveal<HTMLElement>();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const contactLinks = [
    { icon: Mail, text: 'hardikhssingh@gmail.com', href: 'mailto:hardikhssingh@gmail.com' },
    { icon: Linkedin, text: 'LinkedIn', href: 'https://linkedin.com/in/hardiksingh-hs' },
    { icon: Github, text: 'GitHub', href: 'https://github.com/Hardik-Singh' },
  ];

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="container reveal">
        <span className="section-label">Contact</span>
        <h2 className="section-heading">Get in touch</h2>

        <div className="chunk-row">
          <div className="chunk-text">
            <p className="body-text">
              I'm always open to new opportunities and interesting conversations.
              Feel free to reach out!
            </p>
            <div className="contact-links">
              {contactLinks.map((link, i) => (
                <a key={i} href={link.href} className="contact-link-item">
                  <link.icon size={20} />
                  <span>{link.text}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="chunk-media">
            <form className="contact-form card" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
