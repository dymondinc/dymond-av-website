import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import TopTicker from '../components/TopTicker'
import DymondAVBookingSystem from '../components/DymondAVBookingSystem'
import '../booking-theme.css'

const QuoteBuilder = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <NavBar />
      <TopTicker />
      <main className="pt-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-[1200px] h-[1200px] rounded-full bg-blue-600/20 blur-[120px]" />
          <div className="absolute -bottom-1/2 -right-1/2 w-[1200px] h-[1200px] rounded-full bg-purple-600/20 blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Interactive Quote Builder</h1>
          <p className="text-white/80 mb-8">Design your setup, see pricing in real-time, and book with confidence.</p>
        </div>
        <div className="relative booking-theme">
          <DymondAVBookingSystem />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default QuoteBuilder