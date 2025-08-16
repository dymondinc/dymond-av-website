import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import TopTicker from '../components/TopTicker'
import DymondAVBookingSystem from '../components/DymondAVBookingSystem'

const QuoteBuilder = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <NavBar />
      <TopTicker />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6">Interactive Quote Builder</h1>
        </div>
        <DymondAVBookingSystem />
      </main>
      <Footer />
    </div>
  )
}

export default QuoteBuilder