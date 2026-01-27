import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      id: 'infiniwell',
      name: 'InfiniWell',
      description: 'Advanced data processing and analytics platform with real-time insights',
      image: '/assets/infiniwell.png',
      tech: ['Python', 'TensorFlow', 'AWS']
    },
    {
      id: 'loopit',
      name: 'LoopIt',
      description: 'Interactive loop visualization and optimization tool for developers',
      image: '/assets/loopit.png',
      tech: ['JavaScript', 'HTML5', 'CSS3']
    },
    {
      id: 'virtuchat',
      name: 'VirtuChat',
      description: 'AI-powered virtual chat assistant with natural language processing',
      image: '/assets/virtuchat.png',
      tech: ['Python', 'TensorFlow', 'React']
    },
    {
      id: 'chaos-theory',
      name: 'Chaos Theory Visualizer',
      description: 'Mathematical visualization of chaos theory and fractal patterns',
      image: '/assets/chaostheory.png',
      tech: ['Python', 'Matplotlib', 'NumPy']
    },
    {
      id: 'huffman',
      name: 'Huffman Coding',
      description: 'Data compression algorithm implementation with visualization',
      image: '/assets/huffman.png',
      tech: ['C++', 'Data Structures', 'Algorithms']
    },
    {
      id: 'cargo',
      name: 'Cargo Management System',
      description: 'Efficient cargo tracking and logistics management platform',
      image: '/assets/cargo.png',
      tech: ['Java', 'Spring Boot', 'MySQL']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card"
              data-project={project.id}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="project-image">
                <img src={project.image} alt={`${project.name} Project`} />
                <motion.div
                  className="project-overlay"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="project-links">
                    <motion.a
                      href="#"
                      className="project-link"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <i className="fas fa-external-link-alt"></i>
                    </motion.a>
                    <motion.a
                      href="#"
                      className="project-link"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <i className="fab fa-github"></i>
                    </motion.a>
                  </div>
                </motion.div>
              </div>

              <div className="project-content">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
