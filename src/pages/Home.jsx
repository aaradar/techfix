import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './Home.css'

const services = [
  'Computer Repair',
  'Phone / Tablet Repairs',
  'Custom PC Build',
  'Virus Removal',
  'Hardware Upgrade',
  'Data Recovery',
  'OS Installation'
]

const TIME_SLOTS = [
  '8:00 AM','9:00 AM','10:00 AM','11:00 AM',
  '12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM',
]

const todayStr = new Date().toISOString().split('T')[0]

export default function Home() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', service: '', problem: '', details: '', apptDate: '', apptTime: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.service || !form.problem || !form.apptDate || !form.apptTime) {
      setError('Please fill in all required fields including date and time.')
      return
    }
    setError('')

    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]')
    const newTicket = {
      id: Date.now(),
      ...form,
      date: new Date(`${form.apptDate}T${to24(form.apptTime)}`).toISOString(),
      status: 'Pending',
    }
    localStorage.setItem('tickets', JSON.stringify([...tickets, newTicket]))
    setSubmitted(true)
  }

  function to24(slot) {
    const [time, period] = slot.split(' ')
    let [h, m] = time.split(':').map(Number)
    if (period === 'PM' && h !== 12) h += 12
    if (period === 'AM' && h === 12) h = 0
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:00`
  }

  function handleAnother() {
    setForm({ name: '', service: '', problem: '', details: '', apptDate: '', apptTime: '' })
    setSubmitted(false)
  }

  return (
    <div className="page">
      <Navbar />

      {/* Hero */}
      <section className="hero">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-tag">
            <span className="dot" />
            Computer Repair & Custom Builds — Ottawa
          </div>
          <h1 className="hero-title">
            We Fix.<br />
            We <em>Build.</em><br />
            We Deliver.
          </h1>
          <p className="hero-sub">
            We provide services for a wide range of technology. <br/> Book today and we'll get back to you within 24 hours!
          </p>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num">—</span><span className="stat-label">Repairs Done</span></div>
            <div className="stat"><span className="stat-num">—</span><span className="stat-label">Custom Builds</span></div>
            <div className="stat"><span className="stat-num">—</span><span className="stat-label">Happy Clients</span></div>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hex-grid">
            {['🔧','💻','🖥️','⚡','🛠️','📱','⌨️','🪫'].map((ic, i) => (
              <div className="hex" key={i} style={{ animationDelay: `${i * .15}s` }}>{ic}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Services quick-look */}
      <section className="services-strip">
        <div className="container">
          <p className="strip-label">What we do</p>
          <div className="strip-pills">
            {services.map(s => <span key={s} className="pill">{s}</span>)}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="form-section" id="book">
        <div className="container form-grid">
          <div className="form-intro">
            <h2 className="section-title">Book a Service</h2>
            <p className="form-desc">
              Fill out the form and we'll get back to you within 24 hours to confirm your appointment.
              Walk-ins are also welcome during business hours.
            </p>
            <div className="contact-block">
              <div className="contact-row">
                <span className="contact-icon">📍</span>
                <span>[900 Industrial Drive]</span>
              </div>
              <div className="contact-row">
                <span className="contact-icon">📞</span>
                <span>[+1 (613)-000-8686]</span>
              </div>
              <div className="contact-row">
                <span className="contact-icon">✉️</span>
                <span>[techfix.ottawa@gmail.com]</span>
              </div>
              <div className="contact-row">
                <span className="contact-icon">🕐</span>
                <span>Open Every Day · 8:00 AM – 5:00 PM</span>
              </div>
            </div>
          </div>

          <div className="form-card">
            {submitted ? (
              <div className="success-state">
                <div className="success-icon">✓</div>
                <h3>Ticket Submitted!</h3>
                <p>
                  Appointment booked for <strong>{form.apptDate}</strong> at <strong>{form.apptTime}</strong>.
                  Check <strong>My Tickets</strong> to track your booking.
                </p>
                <div className="success-btns">
                  <button className="btn-primary" onClick={() => navigate('/tickets')}>View My Tickets</button>
                  <button className="btn-ghost" onClick={handleAnother}>Submit Another</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-header">
                  <span className="form-tag">New Request</span>
                  <h3>Service Booking</h3>
                </div>

                {error && <div className="form-error">{error}</div>}

                <div className="field">
                  <label htmlFor="name">Your Name <span className="req">*</span></label>
                  <input
                    id="name" name="name" type="text"
                    placeholder="e.g. Alex Radar"
                    value={form.name} onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label htmlFor="service">Service Needed <span className="req">*</span></label>
                  <select id="service" name="service" value={form.service} onChange={handleChange}>
                    <option value="">Select a service...</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="problem">Problem Summary <span className="req">*</span></label>
                  <input
                    id="problem" name="problem" type="text"
                    placeholder="e.g. Blue screen of death on startup"
                    value={form.problem} onChange={handleChange}
                  />
                </div>

                {/* Date + Time row */}
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="apptDate">Appointment Date <span className="req">*</span></label>
                    <input
                      id="apptDate" name="apptDate" type="date"
                      min={todayStr}
                      value={form.apptDate} onChange={handleChange}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="apptTime">Time Slot <span className="req">*</span></label>
                    <select id="apptTime" name="apptTime" value={form.apptTime} onChange={handleChange}>
                      <option value="">Select a time...</option>
                      {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="details">Additional Details</label>
                  <textarea
                    id="details" name="details" rows={4}
                    placeholder="Describe your issue in more detail — when it started, what you've tried, any error messages..."
                    value={form.details} onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn-primary full">
                  Submit Service Request →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>TechFix · Designed by Alexander Radar · University of Ottawa</p>
      </footer>
    </div>
  )
}