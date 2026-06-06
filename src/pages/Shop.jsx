import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import './Shop.css'

const products = [
  {
    id: 1, brand: 'Wacom', name: 'Cintiq Pro 27', price: 4799.95,
    desc: 'A 27" 4K OLED pen display with Wacom\'s most advanced Pro Pen 3 stylus. The definitive professional tool for concept artists and animators.',
    tag: 'OLED Display', color: '#0073e6',
    specs: ['27" 4K OLED display', '8192 pressure levels', 'Pro Pen 3 — 3 swappable nibs', 'Adjustable stand included'],
    image: 'tablet1.jpg',
  },
  {
    id: 2, brand: 'Wacom', name: 'Cintiq Pro 22', price: 3199.95,
    desc: 'A 22" 4K pen display built for studio professionals. Massive working surface with near-zero parallax and full Adobe RGB coverage.',
    tag: 'Studio', color: '#0073e6',
    specs: ['22" 4K UHD display', '99% Adobe RGB', 'Pro Pen 2 included', 'Multi-touch + ExpressKey Remote'],
    image: 'tablet2.jpg',
  },
  {
    id: 3, brand: 'XP-Pen', name: 'Artist Pro 24 (Gen 2)', price: 1799.95,
    desc: 'A 23.8" 4K pen display with a 16384-level X3 Pro stylus and a 140% sRGB gamut. High-end performance at a competitive studio price.',
    tag: '4K Display', color: '#e63946',
    specs: ['23.8" 4K UHD display', '16384 pressure levels', 'X3 Pro stylus', '140% sRGB / 95% DCI-P3'],
    image: 'tablet3.jpg',
  },
  {
    id: 4, brand: 'XP-Pen', name: 'Artist Pro 19 (Gen 2)', price: 1199.95,
    desc: 'A 19" 2.5K pen display with an ultra-thin profile and the X3 Pro Elite stylus for near-zero lag and maximum precision.',
    tag: '2.5K Display', color: '#e63946',
    specs: ['19" 2.5K display', 'X3 Pro Elite stylus', '8 express keys + dial', 'USB-C single cable'],
    image: 'tablet4.jpg',
  },
  {
    id: 5, brand: 'Huion', name: 'Kamvas Pro 27 (4K)', price: 1899.95,
    desc: 'A 27" 4K pen display with a fully laminated anti-glare glass screen and PenTech 3.0 for the most natural drawing feel Huion has ever produced.',
    tag: '4K Display', color: '#7c3aed',
    specs: ['27" 4K UHD display', 'PenTech 3.0 — 8192 levels', '145% sRGB colour gamut', 'Tilt-adjustable stand'],
    image: 'tablet5.jpg',
  },
  {
    id: 6, brand: 'Huion', name: 'Kamvas Pro 24 (4K)', price: 1499.95,
    desc: 'A 23.8" 4K pen display with Huion\'s PW600 stylus featuring 8192 pressure levels and ±60° tilt — engineered for professional illustration and 3D work.',
    tag: 'Pro Studio', color: '#7c3aed',
    specs: ['23.8" 4K UHD display', 'PW600 stylus — ±60° tilt', '99% Adobe RGB / DCI-P3', '10 express keys + 2 dials'],
    image: 'tablet6.jpg',
  },
]

const BRANDS = ['All', 'Wacom', 'XP-Pen', 'Huion']

export default function Shop() {
  const [filter, setFilter] = useState('All')
  const [cart, setCart] = useState([])
  const [added, setAdded] = useState(null)

  const shown = filter === 'All' ? products : products.filter(p => p.brand === filter)

  function addToCart(p) {
    setCart(prev => {
      const existing = prev.find(i => i.id === p.id)
      if (existing) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...p, qty: 1 }]
    })
    setAdded(p.id)
    setTimeout(() => setAdded(null), 1200)
  }

  function resetCart() {
    setCart([])
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <div className="page">
      <Navbar />
      <div className="shop-page">
        <div className="shop-header">
          <div>
            <p className="page-tag">Drawing Tablets</p>
            <h1 className="page-title">Shop Tablets</h1>
            <p className="shop-subtitle">Wacom · XP-Pen · Huion</p>
          </div>
          {cart.length > 0 && (
            <div className="cart-preview">
              <span className="cart-icon">🛒</span>
              <div>
                <p className="cart-count">{cart.reduce((s, i) => s + i.qty, 0)} item{cart.reduce((s,i) => s+i.qty,0) !== 1 ? 's' : ''}</p>
                <p className="cart-total">${total.toFixed(2)}</p>
              </div>
              <button className="cart-reset" onClick={resetCart}>Reset</button>
            </div>
          )}
        </div>

        <div className="brand-filters">
          {BRANDS.map(b => (
            <button
              key={b}
              className={`brand-btn ${filter === b ? 'active' : ''}`}
              onClick={() => setFilter(b)}
            >
              {b}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {shown.map(p => (
            <div key={p.id} className="product-card">
              <div className="product-brand-bar" style={{ '--brand-color': p.color }}>
                <span className="product-brand">{p.brand}</span>
                <span className="product-tag">{p.tag}</span>
              </div>
              <div className="product-visual">
                <img src={p.image} alt={p.name} className="product-img" />
              </div>
              <div className="product-body">
                <h3 className="product-name">{p.name}</h3>
                <p className="product-desc">{p.desc}</p>
                <ul className="product-specs">
                  {p.specs.map(s => <li key={s}>{s}</li>)}
                </ul>
              </div>
              <div className="product-footer">
                <span className="product-price">${p.price.toFixed(2)}</span>
                <button
                  className={`add-btn ${added === p.id ? 'added' : ''}`}
                  onClick={() => addToCart(p)}
                >
                  {added === p.id ? '✓ Added' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="footer">
        <p>TechFix · Designed by Alexander Radar · University of Ottawa</p>
      </footer>
    </div>
  )
}