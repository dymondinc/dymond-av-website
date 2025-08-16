import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

const NavBar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <Logo size="small" />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <a href="#about" className="hover:text-white">About</a>
          <a href="#services" className="hover:text-white">Services</a>
          <a href="#difference" className="hover:text-white">Why Us</a>
          <a href="#testimonials" className="hover:text-white">Reviews</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
          <a href="#contact" className="hover:text-white">Contact</a>
          <Link to="/quote-builder" className="ml-2 inline-flex items-center rounded-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 font-medium shadow-lg shadow-blue-600/30">
            Quote Builder
          </Link>
        </nav>
        <Link to="/quote-builder" className="md:hidden inline-flex items-center rounded-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 font-medium">
          Quote
        </Link>
      </div>
    </header>
  )
}

export default NavBar