'use client'
import { useState } from 'react'
import GoldCreamTemplate from '../templates/GoldCreamTemplate'
import ModernMinimalTemplate from '../templates/ModernMinimalTemplate'
import FloralRomanticTemplate from '../templates/FloralRomanticTemplate'

interface TemplatePreviewProps {
  template: string
  onClose: () => void
}

export default function TemplatePreview({ template, onClose }: TemplatePreviewProps) {
  const [selectedAttend, setSelectedAttend] = useState('✓ Hadir')
  const [wishName, setWishName] = useState('')
  const [wishMessage, setWishMessage] = useState('')

  // Sample data for preview
  const sampleInvitation = {
    id: 1,
    bride_name: 'Siti',
    groom_name: 'Reza',
    bride_fullname: 'Siti Nurhaliza Putri, S.Pd',
    groom_fullname: 'Muhammad Reza Pratama, S.T',
    bride_parents: 'Bapak H. Ahmad Fauzi & Ibu Hj. Rahmawati',
    groom_parents: 'Bapak H. Bambang Susilo & Ibu Hj. Sri Wahyuni',
    akad_date: 'Sabtu, 15 Maret 2025',
    akad_time: '08.00 - 10.00 WIB',
    akad_venue: 'Masjid Al-Ikhlas',
    akad_address: 'Jl. Sudirman No. 12, Jakarta Pusat',
    resepsi_date: 'Sabtu, 15 Maret 2025',
    resepsi_time: '11.00 - 15.00 WIB',
    resepsi_venue: 'Gedung Sasana Budaya',
    resepsi_address: 'Jl. Gatot Subroto Kav. 5, Jakarta',
    music_url: '',
    photos: [],
    template: template
  }

  const sampleRsvps = [
    { id: 1, name: 'Ahmad Fauzi', phone: '081234567890', attendance: '✓ Hadir', guest_count: 2, created_at: new Date().toISOString() }
  ]

  const sampleWishes = [
    { id: 1, name: 'Budi Santoso', message: 'Selamat menempuh hidup baru! Semoga langgeng sampai kakek nenek 🎉', created_at: new Date().toISOString() }
  ]

  const countdown = { days: 45, hours: 12, mins: 30, secs: 15 }

  const templateProps = {
    invitation: sampleInvitation,
    rsvps: sampleRsvps,
    wishes: sampleWishes,
    countdown,
    selectedAttend,
    setSelectedAttend,
    wishName,
    setWishName,
    wishMessage,
    setWishMessage,
    handleRSVPSubmit: (e: React.FormEvent) => { e.preventDefault(); alert('Preview mode - RSVP disabled') },
    handleWishSubmit: (e: React.FormEvent) => { e.preventDefault(); alert('Preview mode - Wishes disabled') },
    isPlaying: false,
    toggleMusic: () => {}
  }

  const renderTemplate = () => {
    switch (template) {
      case 'modern-minimal':
        return <ModernMinimalTemplate {...templateProps} />
      case 'floral-romantic':
        return <FloralRomanticTemplate {...templateProps} />
      case 'gold-cream':
      default:
        return <GoldCreamTemplate {...templateProps} />
    }
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.8)',
      zIndex: 9999,
      overflowY: 'auto'
    }}>
      {/* Close Button */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 10000,
        background: 'rgba(0,0,0,0.9)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600 }}>
          👁️ Template Preview
        </div>
        <button
          onClick={onClose}
          style={{
            padding: '0.6rem 1.5rem',
            background: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: 600
          }}
        >
          ✕ Close Preview
        </button>
      </div>

      {/* Preview Content */}
      <div style={{
        maxWidth: '500px',
        margin: '0 auto',
        boxShadow: '0 0 50px rgba(0,0,0,0.5)'
      }}>
        {renderTemplate()}
      </div>

      {/* Bottom Info */}
      <div style={{
        position: 'sticky',
        bottom: 0,
        background: 'rgba(0,0,0,0.9)',
        padding: '1rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <p style={{ color: '#999', fontSize: '0.85rem', margin: 0 }}>
          This is a preview with sample data. Forms are disabled in preview mode.
        </p>
      </div>
    </div>
  )
}