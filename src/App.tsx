import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Writing from './components/Writing'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CursorFollower from './components/CursorFollower'
import AmbientBackground from './components/AmbientBackground'
import { useThemeStore } from './store/themeStore'

function App() {
  const { theme } = useThemeStore()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="App">
      <AmbientBackground />
      <CursorFollower />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Writing />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
