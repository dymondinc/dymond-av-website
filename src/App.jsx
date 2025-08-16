import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import QuoteBuilder from './pages/QuoteBuilder.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/quote-builder" element={<QuoteBuilder />} />
      <Route path="/booking" element={<Navigate to="/quote-builder" replace />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}

export default App