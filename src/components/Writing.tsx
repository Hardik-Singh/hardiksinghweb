import { motion } from 'framer-motion';

const Writing = () => {
  const writings = [
    {
      id: 1,
      title: 'The Art of Minimal Design in Software Engineering',
      publication: 'Tech Blog',
      date: '2024',
      description: 'Exploring how Japanese design principles like Ma (negative space) can be applied to create cleaner, more intuitive software interfaces.',
      tags: ['Design', 'Philosophy', 'UX'],
      link: '#'
    },
    {
      id: 2,
      title: 'Building Scalable Systems at Amazon',
      publication: 'Engineering Notes',
      date: '2023',
      description: 'Lessons learned from designing distributed systems that handle millions of requests, focusing on simplicity and reliability.',
      tags: ['AWS', 'Architecture', 'Scale'],
      link: '#'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section id="writing" className="writing">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Writing
        </motion.h2>

        <motion.div
          className="timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {writings.map((writing) => (
            <motion.div
              key={writing.id}
              className="timeline-item"
              variants={itemVariants}
            >
              <motion.div
                className="timeline-marker"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
              <motion.div
                className="timeline-content"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="timeline-header">
                  <h3>{writing.title}</h3>
                  <span className="publication">{writing.publication}</span>
                  <span className="period">{writing.date}</span>
                </div>
                <p>{writing.description}</p>
                <div className="timeline-tech">
                  {writing.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      className="tech-badge"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Writing;
