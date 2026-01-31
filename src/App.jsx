import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom' // 1. Import useLocation
import About from './components/about/About'
import Hero from './components/hero/Hero'
import Navbar from './components/Navbar'
import Projects from './components/project'
import Contact from './components/contact'
import Splash from './components/Splash'
import Services from './components/Services'

function App() {
  const location = useLocation();

  return (
    <div className='bg-black'>
      {location.pathname !== '/' && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App