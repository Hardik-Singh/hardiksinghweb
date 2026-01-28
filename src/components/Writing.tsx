import { motion } from 'framer-motion';

const Writing = () => {
  const writings: Array<{
    id: number;
    title: string;
    publication: string;
    date: string;
    description: string;
    tags: string[];
    link: string;
  }> = [];

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

        {writings.length === 0 ? (
          <motion.div
            className="writing-empty"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="coming-soon">Coming soon...</p>
          </motion.div>
        ) : (
          <motion.div
            className="timeline"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {writings.map((writing) => (
              <motion.div
                key={writing.id}
                className="timeline-item"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
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
        )}
      </div>
    </section>
  );
};

export default Writing;
