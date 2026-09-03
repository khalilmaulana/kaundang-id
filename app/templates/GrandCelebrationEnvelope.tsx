'use client'
import { Mail } from 'lucide-react'

interface Props {
  invitation: any
  guestName: string | null
  onOpen: () => void
}

const CONTENT_MAX_WIDTH = '480px'

export default function GrandCelebrationEnvelope({ invitation, guestName, onOpen }: Props) {
  const bgImage = invitation.photos?.[0]
    ? `url(${invitation.photos[0]})`
    : 'linear-gradient(135deg, #5C1A1A, #2A0A0A)'

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, overflow: 'hidden', background: '#1a0505' }}>
      {/* LAYER 1: Backdrop tajam (tanpa blur, tanpa scale) — full-bleed, cuma kelihatan di layar lebar (desktop) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: bgImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.7)'
      }}></div>

      {/* LAYER 2: Kolom tajam di kanan — lebar mobile (480px), ini yang kelihatan penuh di HP */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: CONTENT_MAX_WIDTH,
        marginLeft: 'auto',
        marginRight: 0,
        height: '100%',
        boxShadow: '0 0 100px rgba(0,0,0,0.7)',
        overflow: 'hidden'
      }}>
        {/* Foto asli (tajam, tidak blur) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: bgImage,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></div>

        {/* Overlay maroon (efek tirai merah) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(70,10,15,0.5) 0%, rgba(40,5,8,0.75) 60%, rgba(30,3,5,0.85) 100%)'
        }}></div>

        <div style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '3rem 2rem'
        }}>
          {/* Top: The Wedding of + Names */}
          <div style={{ color: '#F5E9D8' }}>
            <p style={{
              fontSize: '0.8rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
              opacity: 0.9,
              fontFamily: "'Lora', serif"
            }}>
              The Wedding of
            </p>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.8rem, 7vw, 3rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              lineHeight: 1.25,
              fontWeight: 500,
              textShadow: '0 2px 15px rgba(0,0,0,0.4)'
            }}>
              {invitation.bride_name} & {invitation.groom_name}
            </h1>
          </div>

          {/* Bottom: Kepada Yth + Guest Name + Button */}
          <div style={{ alignSelf: 'flex-end', textAlign: 'right', color: '#F5E9D8' }}>
            <p style={{ fontSize: '0.85rem', marginBottom: '0.35rem', opacity: 0.85 }}>
              Kepada Yth.
            </p>
            <p style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.75rem' }}>
              {guestName || 'Tamu Undangan'}
            </p>
            <button
              onClick={onOpen}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.9rem 1.8rem',
                background: '#C9A46B',
                color: '#3B0F0F',
                border: 'none',
                borderRadius: '999px',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'transform 0.3s, background 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <Mail className="w-4 h-4" /> Buka Undangan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}