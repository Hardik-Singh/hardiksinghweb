import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Experience = () => {
  const ref = useScrollReveal<HTMLElement>();
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const toggleExpanded = (id: number) => {
    setExpandedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const experiences = [
    {
      id: 1,
      title: 'Software Engineering Intern',
      company: 'Google',
      period: 'Aug 2025 – Nov 2025',
      summary: 'Built AI-powered debugging tools for CI/CD systems.',
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
      period: 'May 2025 – Aug 2025',
      summary: 'Optimized CloudFront edge computing with 46% faster string parsing.',
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
      period: 'May 2024 – Aug 2024',
      summary: 'Built REST APIs streaming 12M+ telemetry data points for equipment analytics.',
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
      period: 'May 2022 – Aug 2022',
      summary: 'Developed C++ libraries and ML pipelines with 330% faster validation.',
      description: [
        'Developed C++ libraries for DSP and control system integration',
        'Built TensorFlow object detection pipeline with 330% faster validation',
      ],
      tech: ['C++', 'TensorFlow']
    }
  ];

  return (
    <section id="experience" className="section" ref={ref}>
      <div className="container reveal">
        <span className="section-label">Experience</span>
        <h2 className="section-heading">Where I've worked</h2>

        <div className="experience-stack">
          {experiences.map((exp) => {
            const isExpanded = expandedIds.includes(exp.id);
            return (
              <div key={exp.id} className="card experience-card">
                <div className="experience-header">
                  <div>
                    <h3 className="experience-company">{exp.company}</h3>
                    <span className="experience-role">{exp.title}</span>
                  </div>
                  <span className="experience-period">{exp.period}</span>
                </div>

                <p className="experience-summary">{exp.summary}</p>

                <div
                  className="experience-details"
                  style={{
                    maxHeight: isExpanded ? '300px' : '0',
                    opacity: isExpanded ? 1 : 0,
                  }}
                >
                  <ul className="experience-description">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <button
                  className="expand-toggle"
                  onClick={() => toggleExpanded(exp.id)}
                >
                  {isExpanded ? 'View less' : 'View more'}
                </button>

                <div className="experience-tech">
                  {exp.tech.map((t) => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
