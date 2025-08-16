import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import DymondAVBookingSystem from './components/DymondAVBookingSystem'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/booking" element={<DymondAVBookingSystem />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}

export default App