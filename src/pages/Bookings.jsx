import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import './Bookings.css'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December']

export default function Bookings() {
  const [tickets, setTickets] = useState([])
  const [today] = useState(new Date())
  const [current, setCurrent] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tickets') || '[]')
    setTickets(stored)
  }, [])

  const year  = current.getFullYear()
  const month = current.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  function prev() { setCurrent(new Date(year, month - 1, 1)) }
  function next() { setCurrent(new Date(year, month + 1, 1)) }

  function ticketsOnDay(day) {
    const d = new Date(year, month, day)
    return tickets.filter(t => {
      const td = new Date(t.date)
      return td.getFullYear() === d.getFullYear() &&
             td.getMonth()    === d.getMonth()    &&
             td.getDate()     === d.getDate()
    })
  }

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const selectedTickets = selected ? ticketsOnDay(selected) : []

  return (
    <div className="page">
      <Navbar />
      <div className="cal-page">
        <div className="cal-header">
          <div>
            <p className="page-tag">Schedule</p>
            <h1 className="page-title">Booking Calendar</h1>
          </div>
          <div className="cal-nav">
            <button className="cal-nav-btn" onClick={prev}>‹</button>
            <span className="cal-month-label">{MONTHS[month]} {year}</span>
            <button className="cal-nav-btn" onClick={next}>›</button>
          </div>
        </div>

        <div className="cal-grid-wrap">
          <div className="cal-grid">
            {DAYS.map(d => (
              <div key={d} className="cal-day-label">{d}</div>
            ))}
            {cells.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} className="cal-cell empty" />
              const dayTickets = ticketsOnDay(day)
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
              const isSelected = selected === day
              return (
                <div
                  key={day}
                  className={`cal-cell ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${dayTickets.length ? 'has-events' : ''}`}
                  onClick={() => setSelected(isSelected ? null : day)}
                >
                  <span className="cal-day-num">{day}</span>
                  {dayTickets.length > 0 && (
                    <div className="cal-dots">
                      {dayTickets.slice(0, 3).map((_, idx) => (
                        <span key={idx} className="cal-dot" />
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Side panel */}
          <div className="cal-side">
            <h3 className="side-title">
              {selected
                ? `${MONTHS[month]} ${selected}`
                : 'Select a day'}
            </h3>
            {selected && selectedTickets.length === 0 && (
              <p className="side-empty">No bookings on this day.</p>
            )}
            {selectedTickets.map(t => (
              <div key={t.id} className="side-ticket">
                <div className="side-ticket-top">
                  <span className="side-service">{t.service}</span>
                  <span className={`side-status status-${t.status.toLowerCase()}`}>{t.status}</span>
                </div>
                <p className="side-name">{t.name}</p>
                <p className="side-problem">{t.problem}</p>
              </div>
            ))}
            {!selected && tickets.length === 0 && (
              <p className="side-empty">No bookings yet. Submit a service request on the home page.</p>
            )}
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>TechFix · Designed by Alexander Radar · University of Ottawa</p>
      </footer>
    </div>
  )
}
