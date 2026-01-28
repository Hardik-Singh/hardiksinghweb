import { motion } from 'framer-motion';

const Hero = () => {
  // Organic sakura-inspired floating shapes
  const organicShapes = [
    { id: 1, size: 120, top: '15%', left: '8%', delay: 0, opacity: 0.06 },
    { id: 2, size: 180, top: '55%', right: '12%', delay: 2, opacity: 0.05 },
    { id: 3, size: 100, bottom: '25%', left: '15%', delay: 4, opacity: 0.07 },
    { id: 4, size: 140, top: '35%', right: '25%', delay: 1, opacity: 0.04 },
    { id: 5, size: 80, bottom: '35%', right: '8%', delay: 3, opacity: 0.06 },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="floating-shapes">
          {organicShapes.map((shape) => (
            <motion.div
              key={shape.id}
              className="organic-shape"
              style={{
                width: shape.size,
                height: shape.size,
                top: shape.top,
                left: shape.left,
                right: shape.right,
                bottom: shape.bottom,
                background: 'radial-gradient(circle, rgba(244, 167, 185, 0.3) 0%, rgba(232, 135, 155, 0.1) 50%, transparent 70%)',
                borderRadius: '50%',
                opacity: shape.opacity,
              }}
              animate={{
                y: [-15, 15, -15],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 8,
                delay: shape.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="text-gradient">Hardik Singh</span>
          </motion.h1>

          <motion.h2
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Software Engineer & Full-Stack Developer
          </motion.h2>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a
              href="#projects"
              className="btn btn-primary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#projects');
              }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="btn btn-secondary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="hero-profile-container">
            <img
              src="/assets/pfp.jpg"
              alt="Hardik Singh"
              className="hero-profile-image"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="scroll-arrow"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
