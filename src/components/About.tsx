import { useState } from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const [isHovered, setIsHovered] = useState(false);

  const techStack = [
    { name: 'Python', icon: '/assets/language_icons/python.png' },
    { name: 'React', icon: '/assets/language_icons/react.png' },
    { name: 'TypeScript', icon: '/assets/language_icons/ts.png' },
    { name: 'Java', icon: '/assets/language_icons/java.png' },
    { name: 'C++', icon: '/assets/language_icons/c++.png' },
    { name: 'AWS', icon: '/assets/language_icons/aws.png' },
  ];

  const skillCategories = [
    {
      title: 'Frontend',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'HTML5']
    },
    {
      title: 'Backend',
      skills: ['Python', 'Java', 'Node.js', 'C++']
    },
    {
      title: 'Tools & Cloud',
      skills: ['AWS', 'Docker', 'Git', 'TensorFlow']
    }
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>

        <div className="about-content">
          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div
              className="image-container"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img src="/assets/me.PNG" alt="Hardik Singh" />
              <motion.div
                className="image-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="tech-stack">
                  <h3>Tech Stack</h3>
                  <div className="tech-grid">
                    {techStack.map((tech, index) => (
                      <motion.div
                        key={tech.name}
                        className="tech-item"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.1, y: -5 }}
                      >
                        <img src={tech.icon} alt={tech.name} />
                        <span>{tech.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3>Passionate Developer & Problem Solver</h3>
            <p>
              I'm a software engineer with a deep passion for creating innovative solutions
              and pushing the boundaries of what's possible with technology. My journey in
              software development has led me through various domains including machine learning,
              web development, and system architecture.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new technologies, contributing
              to open-source projects, or diving into complex algorithmic challenges. I believe
              in writing clean, maintainable code and creating user experiences that delight.
            </p>

            <div className="skills-showcase">
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  className="skill-category"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.2 }}
                  viewport={{ once: true }}
                >
                  <h4>{category.title}</h4>
                  <div className="skill-tags">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        className="skill-tag"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
