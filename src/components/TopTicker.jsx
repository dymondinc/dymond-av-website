import React, { useEffect, useState } from 'react'

const words = ['Galas', 'Events', 'Conferences', 'Productions', 'Spectacles']

const TopTicker = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="bg-white/5 border-b border-white/10 text-white/80 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center">
        <span>From Intimate Weddings to Corporate</span>
        <span className="ml-2 font-semibold text-white">{words[index]}</span>
      </div>
    </div>
  )
}

export default TopTicker