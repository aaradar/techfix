import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const links = [
  { to: '/',         label: 'Home' },
  { to: '/bookings', label: 'Calendar' },
  { to: '/tickets',  label: 'My Tickets' },
  { to: '/shop',     label: 'Drawing Tablets' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-icon">⬡</span>
        <span className="brand-text">TechFix</span>
      </Link>

      <div className={`navbar-links ${open ? 'open' : ''}`}>
        {links.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className={`nav-link ${pathname === l.to ? 'active' : ''}`}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        <Link to="/" className="nav-cta" onClick={() => setOpen(false)}>
          Book a Service
        </Link>
      </div>

      <button className="hamburger" onClick={() => setOpen(!open)} aria-label="menu">
        <span /><span /><span />
      </button>
    </nav>
  )
}
