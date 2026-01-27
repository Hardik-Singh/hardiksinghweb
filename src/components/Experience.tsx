import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: 'Software Engineering Intern',
      company: 'Google',
      location: 'Seattle, WA',
      period: 'Aug 2025 - Nov 2025',
      description: [
        'Built a Gemini-powered debugging assistant for the Fuchsia CI/CD pipeline',
        'Developed a log-analysis system supporting 10+ programming languages',
      ],
      tech: ['Python', 'Rust', 'FIDL']
    },
    {
      id: 2,
      title: 'Software Development Intern',
      company: 'Amazon Web Services',
      location: 'Seattle, WA',
      period: 'May 2025 - Aug 2025',
      description: [
        'Implemented raw query string support for CloudFront Functions',
        'Achieved 46% faster Rust string parsing deployed across 700+ edge locations',
      ],
      tech: ['Rust', 'NGINX', 'FlatBuffer']
    },
    {
      id: 3,
      title: 'Software Engineering Intern',
      company: 'John Deere Financial',
      location: 'Des Moines, IA',
      period: 'May 2024 - Aug 2024',
      description: [
        'Built REST API streaming 12M+ telemetry data points for equipment analytics',
        'Implemented Java logging infrastructure for AWS Lambda/ECS pipelines',
      ],
      tech: ['Python', 'FastAPI', 'Java', 'Spring', 'AWS']
    },
    {
      id: 4,
      title: 'Software Engineering Intern',
      company: 'Crestron Electronics',
      location: 'Plano, TX',
      period: 'May 2022 - Aug 2022',
      description: [
        'Developed C++ libraries for DSP and control system integration',
        'Built TensorFlow object detection pipeline with 330% faster validation',
      ],
      tech: ['C++', 'TensorFlow']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="experience" className="experience">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Experience
        </motion.h2>

        <motion.div
          className="experience-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              className="experience-card"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="experience-header">
                <div className="experience-company-info">
                  <h3 className="experience-company">{exp.company}</h3>
                  <span className="experience-location">{exp.location}</span>
                </div>
                <span className="experience-period">{exp.period}</span>
              </div>

              <h4 className="experience-title">{exp.title}</h4>

              <ul className="experience-description">
                {exp.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <div className="experience-tech">
                {exp.tech.map((tech) => (
                  <motion.span
                    key={tech}
                    className="tech-badge"
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
