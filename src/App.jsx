import React from 'react'
import NavBar from './Components/nav/NavBar'
import Hero from './Components/hero/Hero'
import About from './Components/about/About'
import TechStack from './Components/about/TechStack'
import Project from './Components/project/Project'
import Contact from './Components/Contact'
import  Services from './Components/Services'
function App() {
  return (
         <div className='bg-black overflow-x-hidden w-screen'>
         <NavBar />
         <Hero />
         <About />
          <Project />
          <Services />
         <TechStack />

         <Contact />
         </div> 
 )
}

export default App