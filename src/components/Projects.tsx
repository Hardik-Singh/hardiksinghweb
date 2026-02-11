import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 'infiniwell',
      name: 'InfiniWell',
      description: 'Advanced data processing and analytics platform with real-time insights',
      background: 'linear-gradient(135deg, #F4A7B9 0%, #E8879B 50%, #D4647A 100%)',
      tech: ['Python', 'TensorFlow', 'AWS'],
      isPrivate: true
    },
    {
      id: 'loopit',
      name: 'LoopIt',
      description: 'Interactive loop visualization and optimization tool for developers',
      background: 'linear-gradient(135deg, #7EC8E3 0%, #5BA3C4 50%, #3D7EA6 100%)',
      tech: ['JavaScript', 'HTML5', 'CSS3'],
      isPrivate: true
    },
    {
      id: 'virtuchat',
      name: 'VirtuChat',
      description: 'AI-powered virtual chat assistant with natural language processing',
      background: 'linear-gradient(135deg, #A8D5A2 0%, #7FBD79 50%, #5FA35A 100%)',
      tech: ['Python', 'TensorFlow', 'React'],
      isPrivate: true
    },
    {
      id: 'chaos-theory',
      name: 'Chaos Theory Visualizer',
      description: 'Mathematical visualization of chaos theory and fractal patterns',
      background: 'linear-gradient(135deg, #F5C77E 0%, #E8A954 50%, #D48B2A 100%)',
      tech: ['Python', 'Matplotlib', 'NumPy'],
      isPrivate: true
    },
    {
      id: 'huffman',
      name: 'Huffman Coding',
      description: 'Data compression algorithm implementation with visualization',
      background: 'linear-gradient(135deg, #C9A8E2 0%, #A87DC5 50%, #8752A8 100%)',
      tech: ['C++', 'Data Structures', 'Algorithms'],
      isPrivate: false
    },
    {
      id: 'cargo',
      name: 'Cargo Management System',
      description: 'Efficient cargo tracking and logistics management platform',
      background: 'linear-gradient(135deg, #8ECAE6 0%, #5EAFC9 50%, #3094AC 100%)',
      tech: ['Java', 'Spring Boot', 'MySQL'],
      isPrivate: true
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
              <div
                className="project-image project-color-bg"
                style={{ background: project.background }}
              >
                {project.isPrivate && (
                  <span className="private-badge">Private</span>
                )}
                {!project.isPrivate && (
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
                        <ExternalLink size={20} />
                      </motion.a>
                      <motion.a
                        href="#"
                        className="project-link"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github size={20} />
                      </motion.a>
                    </div>
                  </motion.div>
                )}
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
