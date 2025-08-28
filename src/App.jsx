import React from 'react'
import About from './components/about/About'
import Hero from './components/hero/Hero'
import Navbar from './components/Navbar'
import Projects from './components/project'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </>
  )
}

export default App
