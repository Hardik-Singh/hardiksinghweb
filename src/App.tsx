import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Writing from './components/Writing'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LatticeBackground from './components/LatticeBackground'

function App() {
  return (
    <div className="App">
      <LatticeBackground />
      <Navbar />
      <Hero />
      <hr className="divider" />
      <About />
      <hr className="divider" />
      <Experience />
      <hr className="divider" />
      <Projects />
      <hr className="divider" />
      <Writing />
      <hr className="divider" />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
