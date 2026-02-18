import { ExternalLink, Github } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Projects = () => {
  const ref = useScrollReveal<HTMLElement>();

  const projects = [
    {
      id: 'infiniwell',
      name: 'InfiniWell',
      description: 'Advanced data processing and analytics platform with real-time insights',
      background: 'linear-gradient(135deg, #c45d3e 0%, #e8879b 100%)',
      tech: ['Python', 'TensorFlow', 'AWS'],
      isPrivate: true
    },
    {
      id: 'loopit',
      name: 'LoopIt',
      description: 'Interactive loop visualization and optimization tool for developers',
      background: 'linear-gradient(135deg, #7EC8E3 0%, #3D7EA6 100%)',
      tech: ['JavaScript', 'HTML5', 'CSS3'],
      isPrivate: true
    },
    {
      id: 'virtuchat',
      name: 'VirtuChat',
      description: 'AI-powered virtual chat assistant with natural language processing',
      background: 'linear-gradient(135deg, #A8D5A2 0%, #5FA35A 100%)',
      tech: ['Python', 'TensorFlow', 'React'],
      isPrivate: true
    },
    {
      id: 'chaos-theory',
      name: 'Chaos Theory Visualizer',
      description: 'Mathematical visualization of chaos theory and fractal patterns',
      background: 'linear-gradient(135deg, #F5C77E 0%, #D48B2A 100%)',
      tech: ['Python', 'Matplotlib', 'NumPy'],
      isPrivate: true
    },
    {
      id: 'huffman',
      name: 'Huffman Coding',
      description: 'Data compression algorithm implementation with visualization',
      background: 'linear-gradient(135deg, #C9A8E2 0%, #8752A8 100%)',
      tech: ['C++', 'Data Structures', 'Algorithms'],
      isPrivate: false
    },
    {
      id: 'cargo',
      name: 'Cargo Management System',
      description: 'Efficient cargo tracking and logistics management platform',
      background: 'linear-gradient(135deg, #8ECAE6 0%, #3094AC 100%)',
      tech: ['Java', 'Spring Boot', 'MySQL'],
      isPrivate: true
    }
  ];

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="container reveal">
        <span className="section-label">Projects</span>
        <h2 className="section-heading">Featured work</h2>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="card project-card">
              <div
                className="project-visual"
                style={{ background: project.background }}
              >
                <span className="project-visual-name">{project.name}</span>
                {project.isPrivate && (
                  <span className="private-badge">Private</span>
                )}
                {!project.isPrivate && (
                  <div className="project-hover-links">
                    <a href="#" className="project-link"><ExternalLink size={18} /></a>
                    <a href="#" className="project-link"><Github size={18} /></a>
                  </div>
                )}
              </div>
              <div className="project-body">
                <h3 className="project-name">{project.name}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
