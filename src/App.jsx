import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import SoftSkills from './components/SoftSkills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import Toast from './components/Toast'
import Search from './components/Search'
import resume from './data/resume.json'
import useScrollReveal from './hooks/useScrollReveal'
import { useState } from 'react'
import './App.css'

function App() {
  useScrollReveal()
  const [toast, setToast] = useState(null)

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <>
      <ScrollProgress />
      <Nav name={resume.name} />
      <Hero data={resume} onCopyEmail={() => {
        navigator.clipboard.writeText(resume.email)
        showToast('Email copied to clipboard!')
      }} />
      <About data={resume} />
      <Skills skills={resume.skills} />
      <Experience experience={resume.experience} />
      <Projects projects={resume.projects} />
      <Education education={resume.education} additional={resume.additional} />
      <SoftSkills softSkills={resume.softSkills} />
      <Contact data={resume} showToast={showToast} />
      <Footer name={resume.name} />
      <BackToTop />
      <Search resume={resume} />
      {toast && <Toast message={toast} />}
    </>
  )
}

export default App