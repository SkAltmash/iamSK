import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/admin/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'

import About from './components/about/About'
import Home from './components/Home'
import Hero from './components/hero/Hero'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Projects from './components/project'
import Contact from './components/contact'
import Splash from './components/Splash'
import Services from './components/Services'
import ProjectDetails from './components/ProjectDetails'
import Blogs from './components/Blogs'
import BlogDetails from './components/BlogDetails'

// Admin pages
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import ClientProjectsAdmin from './pages/admin/ClientProjectsAdmin'
import ServicesAdmin from './pages/admin/ServicesAdmin'
import PricingAdmin from './pages/admin/PricingAdmin'
import MessagesAdmin from './pages/admin/MessagesAdmin'
import ResumeAdmin from './pages/admin/ResumeAdmin'
import TestimonialsAdmin from './pages/admin/TestimonialsAdmin'
import BlogsAdmin from './pages/admin/BlogsAdmin'
import AchievementsAdmin from './pages/admin/AchievementsAdmin'
import TechStackAdmin from './pages/admin/TechStackAdmin'

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className='bg-black min-h-screen'>
      <Toaster position="top-center" />
      <ScrollToTop />
      {!isAdmin && location.pathname !== '/' && <Navbar />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetails />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={
          <ProtectedRoute><AdminDashboard /></ProtectedRoute>
        } />
        <Route path="/admin/client-projects" element={
          <ProtectedRoute><ClientProjectsAdmin /></ProtectedRoute>
        } />
        <Route path="/admin/services" element={
          <ProtectedRoute><ServicesAdmin /></ProtectedRoute>
        } />
        <Route path="/admin/pricing" element={
          <ProtectedRoute><PricingAdmin /></ProtectedRoute>
        } />
        <Route path="/admin/messages" element={
          <ProtectedRoute><MessagesAdmin /></ProtectedRoute>
        } />
        <Route path="/admin/resume" element={
          <ProtectedRoute><ResumeAdmin /></ProtectedRoute>
        } />
        <Route path="/admin/testimonials" element={
          <ProtectedRoute><TestimonialsAdmin /></ProtectedRoute>
        } />
        <Route path="/admin/blogs" element={
          <ProtectedRoute><BlogsAdmin /></ProtectedRoute>
        } />
        <Route path="/admin/achievements" element={
          <ProtectedRoute><AchievementsAdmin /></ProtectedRoute>
        } />
        <Route path="/admin/tech-stack" element={
          <ProtectedRoute><TechStackAdmin /></ProtectedRoute>
        } />
      </Routes>

      {!isAdmin && location.pathname !== '/' && <Footer />}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App