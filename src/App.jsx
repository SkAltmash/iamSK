
import React from 'react'
import About from './components/about/About'
import Hero from './components/hero/Hero'
import Navbar from './components/Navbar'
import Projects from './components/project'
import Contact from './components/contact'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className='bg-black'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App
