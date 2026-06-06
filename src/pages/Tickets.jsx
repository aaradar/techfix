import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import './Tickets.css'

const STATUS_CYCLE = ['Pending', 'Active', 'Complete']

export default function Tickets() {
  const [tickets, setTickets] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tickets') || '[]')
    setTickets(stored)
  }, [])

  function cycleStatus(id) {
    const updated = tickets.map(t => {
      if (t.id !== id) return t
      const next = STATUS_CYCLE[(STATUS_CYCLE.indexOf(t.status) + 1) % STATUS_CYCLE.length]
      return { ...t, status: next }
    })
    setTickets(updated)
    localStorage.setItem('tickets', JSON.stringify(updated))
    if (selected?.id === id) {
      setSelected(updated.find(t => t.id === id))
    }
  }

  function deleteTicket(id) {
    const updated = tickets.filter(t => t.id !== id)
    setTickets(updated)
    localStorage.setItem('tickets', JSON.stringify(updated))
    if (selected?.id === id) setSelected(null)
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-CA', {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  const pending  = tickets.filter(t => t.status === 'Pending')
  const active   = tickets.filter(t => t.status === 'Active')
  const complete = tickets.filter(t => t.status === 'Complete')

  return (
    <div className="page">
      <Navbar />
      <div className="tickets-page">
        <div className="tickets-header">
          <div>
            <p className="page-tag">Overview</p>
            <h1 className="page-title">My Service Tickets</h1>
          </div>
          <div className="ticket-counts">
            <div className="count-chip pending">{pending.length} Pending</div>
            <div className="count-chip active">{active.length} Active</div>
            <div className="count-chip complete">{complete.length} Complete</div>
          </div>
        </div>

        {tickets.length === 0 ? (
          <div className="no-tickets">
            <h3>No tickets yet</h3>
            <p>Submit a service request on the home page and it will appear here.</p>
          </div>
        ) : (
          <div className="tickets-layout">
            <div className="tickets-list">
              {tickets.slice().reverse().map(t => (
                <div
                  key={t.id}
                  className={`ticket-row ${selected?.id === t.id ? 'active' : ''}`}
                  onClick={() => setSelected(selected?.id === t.id ? null : t)}
                >
                  <div className="ticket-row-left">
                    <div className="ticket-id">#{String(t.id).slice(-5)}</div>
                    <div>
                      <p className="ticket-row-service">{t.service}</p>
                      <p className="ticket-row-name">{t.name}</p>
                    </div>
                  </div>
                  <div className="ticket-row-right">
                    <span className={`status-badge status-${t.status.toLowerCase()}`}>{t.status}</span>
                    <span className="ticket-row-date">{new Date(t.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="ticket-detail">
              {selected ? (
                <>
                  <div className="detail-header">
                    <div>
                      <p className="detail-id">Ticket #{String(selected.id).slice(-5)}</p>
                      <h3 className="detail-service">{selected.service}</h3>
                    </div>
                    <span className={`status-badge lg status-${selected.status.toLowerCase()}`}>{selected.status}</span>
                  </div>

                  <div className="detail-grid">
                    <div className="detail-field">
                      <label>Client Name</label>
                      <p>{selected.name}</p>
                    </div>
                    <div className="detail-field">
                      <label>Submitted</label>
                      <p>{formatDate(selected.date)}</p>
                    </div>
                    <div className="detail-field full">
                      <label>Problem Summary</label>
                      <p>{selected.problem}</p>
                    </div>
                    {selected.details && (
                      <div className="detail-field full">
                        <label>Additional Details</label>
                        <p>{selected.details}</p>
                      </div>
                    )}
                  </div>

                  <div className="detail-actions">
                    <button
                      className="btn-primary"
                      onClick={() => cycleStatus(selected.id)}
                    >
                      Move to: {STATUS_CYCLE[(STATUS_CYCLE.indexOf(selected.status) + 1) % STATUS_CYCLE.length]}
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => deleteTicket(selected.id)}
                    >
                      Delete Ticket
                    </button>
                  </div>
                </>
              ) : (
                <div className="detail-empty">
                  <p>Select a ticket to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <footer className="footer">
        <p>TechFix · Designed by Alexander Radar · University of Ottawa</p>
      </footer>
    </div>
  )
}
