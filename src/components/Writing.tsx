import { useScrollReveal } from '../hooks/useScrollReveal';

const Writing = () => {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="writing" className="section" ref={ref}>
      <div className="container reveal">
        <span className="section-label">Writing</span>
        <h2 className="section-heading">Thoughts & essays</h2>
        <p className="coming-soon"><em>Coming soon...</em></p>
      </div>
    </section>
  );
};

export default Writing;
