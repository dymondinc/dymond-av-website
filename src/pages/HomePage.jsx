import React, { lazy, Suspense } from 'react'
import { Music, Lightbulb, Monitor, Camera, Star, Calendar, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Logo from '../components/Logo'

const Visualizer3D = lazy(() => import('../components/Visualizer3D'))

const HomePage = () => {
  return (
    <div className="bg-black text-white">
      <NavBar />

      <section className="relative overflow-hidden pt-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-[1200px] h-[1200px] rounded-full bg-blue-600/20 blur-[120px]" />
          <div className="absolute -bottom-1/2 -right-1/2 w-[1200px] h-[1200px] rounded-full bg-purple-600/20 blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div className="py-16">
            <Logo className="mb-4" size="large" />
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Elite DJ + AV that turns moments into memories
            </h1>
            <p className="mt-4 text-lg text-white/80">
              Weddings. Corporate. Nightlife. From clean, modern aesthetics to immersive sound and lighting, we craft unforgettable experiences.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link to="/booking" className="inline-flex items-center rounded-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 font-medium shadow-lg shadow-blue-600/30">
                Check availability
              </Link>
              <a href="#packages" className="inline-flex items-center rounded-full border border-white/20 hover:border-white/40 text-white px-6 py-3 font-medium">
                View packages
              </a>
            </div>
            <div className="mt-8 flex items-center gap-6 text-white/70">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400" size={18} />
                <span>5⭐ client reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>Limited 2025 dates</span>
              </div>
            </div>
          </div>
          <div className="h-[460px] rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0">
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white/60">Loading visualizer…</div>}>
              <Visualizer3D />
            </Suspense>
          </div>
        </div>
      </section>

      <section id="services" className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Signature services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-xl border border-white/10 p-6 bg-white/5">
              <Music className="text-blue-400" />
              <h3 className="mt-3 font-semibold">Premium DJ</h3>
              <p className="text-white/70">Club-caliber mixing, curated playlists, clean MC work.</p>
            </div>
            <div className="rounded-xl border border-white/10 p-6 bg-white/5">
              <Lightbulb className="text-blue-400" />
              <h3 className="mt-3 font-semibold">Lighting Design</h3>
              <p className="text-white/70">Uplighting, moving heads, custom gobos, dance-floor looks.</p>
            </div>
            <div className="rounded-xl border border-white/10 p-6 bg-white/5">
              <Monitor className="text-blue-400" />
              <h3 className="mt-3 font-semibold">AV & Screens</h3>
              <p className="text-white/70">TV displays, projection, and visual integrations.</p>
            </div>
            <div className="rounded-xl border border-white/10 p-6 bg-white/5">
              <Camera className="text-blue-400" />
              <h3 className="mt-3 font-semibold">Photo Experiences</h3>
              <p className="text-white/70">Modern photo booth options with instant sharing.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="packages" className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Featured packages</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Premium Wedding', price: 3500, items: ['Base DJ', 'Uplighting (8)', 'Moving Heads (2)', 'Photo Booth', 'Dance Floor Lighting'] },
              { name: 'Corporate Event', price: 2800, items: ['Base DJ', 'TV Screens (2)', 'Projection', 'Ceremony Audio'] },
              { name: 'Deluxe Celebration', price: 4200, items: ['Base DJ', 'Uplighting (8)', 'Moving Heads (4)', 'Screens (2)', 'Custom Gobo'] },
            ].map((pkg) => (
              <div key={pkg.name} className="rounded-xl border border-white/10 p-6 bg-white/5 flex flex-col">
                <div className="text-sm uppercase tracking-wider text-white/60">{pkg.name}</div>
                <div className="mt-2 text-3xl font-extrabold">${pkg.price}</div>
                <ul className="mt-4 space-y-2 text-white/80">
                  {pkg.items.map((i) => <li key={i} className="flex items-center gap-2"><Sparkles size={16} className="text-blue-400" />{i}</li>)}
                </ul>
                <Link to="/booking" className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 font-medium">
                  Customize & book
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">What clients say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: 'The dance floor was packed all night. The lighting was stunning.', name: 'Alyssa & Mark' },
              { quote: 'Professional, on time, and our CEO loved the stage look.', name: 'TechCorp' },
              { quote: 'Sleek setup. Incredible sound. Zero stress for us.', name: 'Brianna' },
            ].map((t) => (
              <div key={t.name} className="rounded-xl border border-white/10 p-6 bg-white/5">
                <p className="text-white/90">“{t.quote}”</p>
                <div className="mt-4 text-white/60 text-sm">— {t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Gallery</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white/50">
                Media coming soon
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold">Ready to design your perfect event?</h2>
          <p className="mt-3 text-white/80">Tell us your vision. We’ll dial in the look, sound, and flow.</p>
          <Link to="/booking" className="mt-6 inline-flex items-center rounded-full bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 font-medium shadow-lg shadow-blue-600/30">
            Get a quote
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default HomePage