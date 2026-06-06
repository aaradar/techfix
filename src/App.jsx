import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Bookings from './pages/Bookings'
import Tickets from './pages/Tickets'
import Shop from './pages/Shop'
import './App.css'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </Router>
  )
}
