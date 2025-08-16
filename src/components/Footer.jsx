import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer id="contact" className="border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8 text-white/80">
        <div className="md:col-span-2">
          <div className="text-white font-extrabold text-xl">Dymond AV</div>
          <p className="mt-2 text-sm italic">Making People Dance Since 2005</p>
          <div className="mt-4 text-sm">
            <div className="text-white/60">Serving All of Southern California</div>
            <div>Orange County | Los Angeles | Riverside | San Bernardino</div>
          </div>
        </div>
        <div className="text-sm">
          <div className="text-white/60 mb-2">Explore</div>
          <a href="#about" className="block hover:text-white">About</a>
          <a href="#services" className="block hover:text-white">Services</a>
          <a href="#difference" className="block hover:text-white">Why Us</a>
          <a href="#gallery" className="block hover:text-white">See Our Work</a>
          <Link to="/booking" className="block hover:text-white">Try Our Interactive Quote Builder</Link>
        </div>
        <div className="text-sm">
          <div className="text-white/60 mb-2">Contact</div>
          <a href="tel:+17142621441" className="block hover:text-white">Call (714) 262-1441</a>
          <a href="mailto:info@dymondentertainment.com" className="block hover:text-white">info@dymondentertainment.com</a>
          <a href="https://www.dymondentertainment.com" target="_blank" rel="noreferrer" className="block hover:text-white">www.dymondentertainment.com</a>
          <div className="mt-4">
            <div className="text-white/60 mb-2">Follow Us</div>
            <a href="https://instagram.com/dymondav" target="_blank" rel="noreferrer" className="block hover:text-white">Instagram: @dymondav</a>
            <a href="https://facebook.com/dymondentertainment" target="_blank" rel="noreferrer" className="block hover:text-white">Facebook: /dymondentertainment</a>
            <a href="https://linkedin.com/company/dymond-entertainment" target="_blank" rel="noreferrer" className="block hover:text-white">LinkedIn: /company/dymond-entertainment</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © 2025 Dymond Entertainment. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer