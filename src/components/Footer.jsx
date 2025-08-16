import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer id="contact" className="border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8 text-white/80">
        <div>
          <div className="text-white font-extrabold text-xl">Dymond Audio/Visual</div>
          <p className="mt-2 text-sm">Professional DJ, lighting, and AV production for weddings, corporate events, and nightlife.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <a href="#services" className="hover:text-white">Services</a><br/>
            <a href="#packages" className="hover:text-white">Packages</a><br/>
            <a href="#testimonials" className="hover:text-white">Reviews</a>
          </div>
          <div className="space-y-2">
            <a href="#gallery" className="hover:text-white">Gallery</a><br/>
            <Link to="/booking" className="hover:text-white">Book</Link><br/>
            <a href="mailto:info@dymondav.com" className="hover:text-white">info@dymondav.com</a>
          </div>
        </div>
        <div className="md:text-right">
          <Link to="/booking" className="inline-flex items-center rounded-full bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 font-medium">
            Check availability
          </Link>
          <div className="mt-3 text-xs text-white/50">© {new Date().getFullYear()} Dymond Audio/Visual</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer