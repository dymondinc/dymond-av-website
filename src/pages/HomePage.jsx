import React, { lazy, Suspense } from 'react'
import { Music, Lightbulb, Monitor, Camera, Star, Calendar, Sparkles, Sliders, DollarSign, FileText, Palette, Target, Gem, Rocket, PhoneCall, Award, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Logo from '../components/Logo'
import TopTicker from '../components/TopTicker'

// const Visualizer3D = lazy(() => import('../components/Visualizer3D'))

const HomePage = () => {
  return (
    <div className="bg-black text-white">
      <NavBar />
      <TopTicker />

      <section className="relative overflow-hidden pt-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-[1200px] h-[1200px] rounded-full bg-blue-600/20 blur-[120px]" />
          <div className="absolute -bottom-1/2 -right-1/2 w-[1200px] h-[1200px] rounded-full bg-purple-600/20 blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div className="py-16">
            <Logo className="mb-4" size="large" />
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              We Don't Just Do Events. We Create Experiences That Leave Your Guests Speechless.
            </h1>
            <p className="mt-4 text-lg text-white/80">
              Premium audio-visual production for Southern California's most discerning clients. From intimate ceremonies to grand corporate galas, we transform your vision into an unforgettable reality.
            </p>
            <p className="mt-3 text-sm text-white/70 italic">Formerly Dymond Entertainment - Now Dymond AV with expanded services and capabilities</p>
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              <Link to="/quote-builder" className="inline-flex items-center rounded-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 font-medium shadow-lg shadow-blue-600/30">
                Try Our Interactive Quote Builder
              </Link>
              <a href="#contact" className="inline-flex items-center rounded-full border border-white/20 hover:border-white/40 text-white px-6 py-3 font-medium">
                Get Your Free Consultation
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
          <div className="h-[460px] rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-center p-8">
            <div>
              <div className="text-sm uppercase tracking-wider text-white/60">Live Demo</div>
              <div className="mt-2 text-2xl font-extrabold">Interactive 3D Visualizer</div>
              <p className="mt-2 text-white/70">See your setup come to life as you build. Configure lighting, audio, and visuals with instant pricing.</p>
              <Link to="/quote-builder" className="mt-6 inline-flex items-center rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 font-medium">
                Launch Quote Builder
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="quote-builder" className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold">Design Your Perfect Event Experience</h2>
          <p className="mt-3 text-white/80 max-w-3xl">Skip the back-and-forth emails. Our revolutionary quote builder lets you visualize your event setup in real-time, customize every detail, and get instant pricing - all in one seamless experience.</p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-xl border border-white/10 p-6 bg-white/5">
              <Sliders className="text-blue-400" />
              <h3 className="mt-3 font-semibold">Visual Setup Configurator</h3>
              <p className="text-white/70">Watch your event come to life as you select equipment.</p>
            </div>
            <div className="rounded-xl border border-white/10 p-6 bg-white/5">
              <DollarSign className="text-blue-400" />
              <h3 className="mt-3 font-semibold">Real-Time Pricing</h3>
              <p className="text-white/70">See exactly what everything costs as you build.</p>
            </div>
            <div className="rounded-xl border border-white/10 p-6 bg-white/5">
              <FileText className="text-blue-400" />
              <h3 className="mt-3 font-semibold">Complete Booking System</h3>
              <p className="text-white/70">From quote to contract in minutes.</p>
            </div>
            <div className="rounded-xl border border-white/10 p-6 bg-white/5">
              <Palette className="text-blue-400" />
              <h3 className="mt-3 font-semibold">Interactive Design Tool</h3>
              <p className="text-white/70">Preview your lighting, audio, and visual setup.</p>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <Link to="/quote-builder" className="inline-flex items-center rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 font-medium">
              Launch Quote Builder
            </Link>
            <a href="#" className="inline-flex items-center rounded-lg border border-white/20 hover:border-white/40 text-white px-5 py-3 font-medium">
              See Demo Video
            </a>
          </div>
          <p className="mt-6 text-white/70">No more guesswork. No more surprises. Just transparent, professional event planning.</p>
        </div>
      </section>

      <section id="about" className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Settle for Ordinary When You Can Have Extraordinary?</h2>
          <p className="text-white/80 max-w-4xl">We've Evolved. What started as Dymond Entertainment has transformed into Dymond AV – expanding our capabilities to serve you better. For over 20 years, we've been the secret weapon behind Southern California's most talked-about events. We don't just set up equipment – we craft immersive experiences that make your guests stop, stare, and remember.</p>
          <p className="text-white/80 max-w-4xl mt-4">Our rebrand reflects our growth: More services. Advanced technology. Same uncompromising quality.</p>
          <p className="text-white/90 font-semibold mt-4">Our clients don't just hire us. They trust us with their most important moments.</p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Zero Compromises', text: 'Every detail matters. Every moment counts.' },
              { title: 'Flawless Execution', text: '13+ years, thousands of events, zero disasters.' },
              { title: 'Your Vision, Amplified', text: 'We listen. We understand. We deliver beyond expectations.' },
              { title: 'Southern California Experts', text: 'We know every venue, every challenge, every solution.' },
              { title: 'Expanded Capabilities', text: 'Our rebrand to Dymond AV brings you more services under one roof.' },
            ].map((i) => (
              <div key={i.title} className="rounded-xl border border-white/10 p-6 bg-white/5">
                <div className="text-white/90 font-semibold">{i.title}</div>
                <div className="text-white/70 mt-2">{i.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-white/10 p-6 bg-white/5">
              <div className="text-sm uppercase tracking-wider text-white/60">Corporate Events</div>
              <h3 className="mt-2 font-semibold">Transform Your Brand Into An Experience</h3>
              <ul className="mt-4 space-y-2 text-white/80">
                {[
                  'Stage lighting that commands attention',
                  'Crystal-clear audio that reaches every corner',
                  'Projection screens that bring presentations to life',
                  'Custom branding and logo projection',
                  'Professional MC and V.O.G. services',
                  'Award ceremonies that feel like the Oscars',
                ].map((t) => <li key={t} className="flex items-center gap-2"><Sparkles size={16} className="text-blue-400" />{t}</li>)}
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 p-6 bg-white/5">
              <div className="text-sm uppercase tracking-wider text-white/60">Weddings</div>
              <h3 className="mt-2 font-semibold">Your Most Important Day Deserves Perfection</h3>
              <ul className="mt-4 space-y-2 text-white/80">
                {[
                  'Ceremony audio that ensures every word is heard',
                  'Custom wedding gobos and monograms',
                  'HD video screens for those in the back',
                  'Romantic uplighting that sets the perfect mood',
                  'Photo booth experiences your guests will love',
                  'Intelligent lighting and truss systems',
                  'Dance floor lighting that gets everyone moving',
                  'Seamless transitions from "I do" to "Let\'s party!"',
                ].map((t) => <li key={t} className="flex items-center gap-2"><Sparkles size={16} className="text-blue-400" />{t}</li>)}
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 p-6 bg-white/5">
              <div className="text-sm uppercase tracking-wider text-white/60">Live Sound & Lighting</div>
              <h3 className="mt-2 font-semibold">Making People Dance Since 2005</h3>
              <ul className="mt-4 space-y-2 text-white/80">
                {[
                  'Multi-channel mixing consoles',
                  'Professional monitor systems',
                  'Dynamic stage lighting',
                  'Intelligent moving lights',
                  'Haze and atmospheric effects',
                  'Wireless microphone systems',
                  'In-ear monitoring for performers',
                ].map((t) => <li key={t} className="flex items-center gap-2"><Sparkles size={16} className="text-blue-400" />{t}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="difference" className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">The Dymond Difference: Why We're Not Like Everyone Else</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-xl border border-white/10 p-6 bg-white/5">
              <Target className="text-blue-400" />
              <h3 className="mt-3 font-semibold">Obsessed with Perfection</h3>
              <p className="text-white/70">We don't do "good enough." Every cable is hidden. Every light is positioned perfectly. Every sound check is flawless.</p>
            </div>
            <div className="rounded-xl border border-white/10 p-6 bg-white/5">
              <Gem className="text-blue-400" />
              <h3 className="mt-3 font-semibold">Premium Equipment Only</h3>
              <p className="text-white/70">We invest in the best so you get the best. No budget gear. No compromises. No excuses.</p>
            </div>
            <div className="rounded-xl border border-white/10 p-6 bg-white/5">
              <Rocket className="text-blue-400" />
              <h3 className="mt-3 font-semibold">Stress-Free Experience</h3>
              <p className="text-white/70">You plan the event. We handle the technology. Our interactive quote builder even lets you design and price everything yourself.</p>
            </div>
            <div className="rounded-xl border border-white/10 p-6 bg-white/5">
              <PhoneCall className="text-blue-400" />
              <h3 className="mt-3 font-semibold">Always Available</h3>
              <p className="text-white/70">Questions at 9 PM on a Sunday? We answer. Last-minute changes? We adapt. Emergency backup? We're ready.</p>
            </div>
            <div className="rounded-xl border border-white/10 p-6 bg-white/5">
              <Award className="text-blue-400" />
              <h3 className="mt-3 font-semibold">Proven Track Record</h3>
              <p className="text-white/70">13+ years. Thousands of events. Zero disasters. Your success is our reputation.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="services-list" className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Full Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-xl border border-white/10 p-6 bg-white/5">
              <div className="text-sm uppercase tracking-wider text-white/60">Audio-Visual Services</div>
              <ul className="mt-4 space-y-2 text-white/80">
                {[
                  'Professional Sound Systems — Crystal clear audio for any size venue',
                  'Wireless Microphone Systems — Freedom to move, guaranteed to work',
                  'Stage & Architectural Lighting — Transform any space into something magical',
                  'Video Projection & LED Walls — Make your content impossible to ignore',
                  'Live Streaming & Recording — Share your event with the world',
                  'Professional DJ Services — Music that moves your crowd',
                  'Master of Ceremonies — Professional hosting that keeps energy high',
                  'Event Production Management — Coordination from concept to completion',
                ].map((t) => <li key={t} className="flex items-center gap-2"><ChevronRight size={16} className="text-blue-400" />{t}</li>)}
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 p-6 bg-white/5">
              <div className="text-sm uppercase tracking-wider text-white/60">Specialty Services</div>
              <ul className="mt-4 space-y-2 text-white/80">
                {[
                  'Custom Gobos & Logo Projection — Your brand, projected larger than life',
                  'Intelligent Lighting Design — Automated lighting that responds to your event',
                  'Photo Booth Experiences — Create memories your guests will cherish',
                  'Uplighting & Mood Lighting — Set the perfect atmosphere',
                  'Fog & Haze Effects — Add drama and depth to your lighting',
                  'Table Pin Spotting — Highlight your VIPs and special moments',
                  'Power Distribution — Reliable power for every piece of equipment',
                  'Technical Consulting — Expert advice for venue upgrades and installations',
                ].map((t) => <li key={t} className="flex items-center gap-2"><ChevronRight size={16} className="text-blue-400" />{t}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "Dymond AV didn't just provide equipment – they created magic. Our guests are still talking about the lighting and sound quality months later.", name: 'Sarah M., Corporate Event Planner' },
              { quote: 'We hired them for our wedding and it was the best decision we made. Everything was flawless, and they made our vision come to life perfectly.', name: 'Michael & Jennifer K., Newport Beach' },
              { quote: "Professional, reliable, and incredibly talented. They've handled all our company events for 5 years running.", name: 'David Chen, Tech Startup CEO' },
            ].map((t) => (
              <div key={t.name} className="rounded-xl border border-white/10 p-6 bg-white/5">
                <p className="text-white/90">“{t.quote}”</p>
                <div className="mt-4 text-white/60 text-sm">— {t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Create Something Unforgettable?</h2>
          <p className="text-white/80 max-w-3xl">Don't leave your event to chance. Let's discuss how we can make your vision a reality.</p>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-white/10 p-6 bg-white/5 md:col-span-2">
              <div className="grid sm:grid-cols-2 gap-4 text-white/80 text-sm">
                <div>
                  <div className="text-white/60">Phone</div>
                  <a href="tel:+17142621441" className="hover:text-white">(714) 262-1441</a>
                </div>
                <div>
                  <div className="text-white/60">Email</div>
                  <a href="mailto:info@dymondentertainment.com" className="hover:text-white">info@dymondentertainment.com</a>
                </div>
                <div>
                  <div className="text-white/60">Website</div>
                  <a href="https://www.dymondentertainment.com" target="_blank" rel="noreferrer" className="hover:text-white">www.dymondentertainment.com</a>
                </div>
                <div>
                  <div className="text-white/60">Service Area</div>
                  <div>All of Southern California</div>
                </div>
                <div>
                  <div className="text-white/60">Based In</div>
                  <div>Orange County, CA</div>
                </div>
                <div>
                  <div className="text-white/60">Office Hours</div>
                  <div>Mon–Sun: Consultations • Emergency Support: 24/7 during events</div>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <a href="mailto:info@dymondentertainment.com" className="inline-flex items-center rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 font-medium">Get Free Consultation</a>
                <Link to="/quote-builder" className="inline-flex items-center rounded-lg border border-white/20 hover:border-white/40 text-white px-5 py-3 font-medium">Get Custom Quote</Link>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 p-6 bg-white/5">
              <div className="text-white/90 font-semibold">Quick Actions</div>
              <div className="mt-4 space-y-3 text-sm">
                <Link to="/quote-builder" className="block hover:text-white">Try Our Interactive Quote Builder</Link>
                <a href="#gallery" className="block hover:text-white">See Our Work</a>
                <a href="tel:+17142621441" className="block hover:text-white">Call (714) 262-1441</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'How far in advance should I book?', a: 'For peak seasons (spring/summer weddings, holiday corporate events), we recommend booking 6-12 months in advance. However, we\'ve pulled off amazing events with just weeks notice.' },
              { q: 'Do you provide backup equipment?', a: 'Absolutely. We bring backup systems for all critical components. Your show will go on, guaranteed.' },
              { q: "Can you work with our venue's existing AV?", a: 'Yes, we\'re experts at integrating with venue systems or can provide a complete standalone solution.' },
              { q: 'Do you offer payment plans?', a: 'Yes, we offer flexible payment options to fit your budget and timeline.' },
              { q: "What happens if there's a technical issue during our event?", a: 'Our team includes certified technicians who monitor everything throughout your event. We solve problems before your guests even notice them.' },
            ].map((item) => (
              <details key={item.q} className="rounded-xl border border-white/10 bg-white/5">
                <summary className="cursor-pointer list-none px-4 py-3 font-medium flex items-center justify-between">
                  <span>{item.q}</span>
                </summary>
                <div className="px-4 pb-4 text-white/80">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default HomePage