import { useScrollReveal } from '../hooks/useScrollReveal';

const About = () => {
  const ref = useScrollReveal<HTMLElement>();

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
    <section id="about" className="section" ref={ref}>
      <div className="container reveal">
        <span className="section-label">About</span>
        <h2 className="section-heading">Who I am</h2>

        <div className="chunk-row">
          <div className="chunk-text">
            <p className="body-text">
              I'm a software engineer with a deep passion for creating innovative solutions
              and pushing the boundaries of what's possible with technology. My journey in
              software development has led me through various domains including machine learning,
              web development, and system architecture.
            </p>
            <p className="body-text">
              When I'm not coding, you'll find me exploring new technologies, contributing
              to open-source projects, or diving into complex algorithmic challenges. I believe
              in writing clean, maintainable code and creating user experiences that delight.
            </p>

            <div className="skill-groups">
              {skillCategories.map((category) => (
                <div key={category.title} className="skill-group">
                  <h4 className="skill-group-title">{category.title}</h4>
                  <div className="skill-tags">
                    {category.skills.map((skill) => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="chunk-media">
            <div className="card about-photo-card">
              <img src="/assets/me.PNG" alt="Hardik Singh" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
