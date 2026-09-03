'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Music, MapPin, Calendar, Clock, Heart, Instagram, Video, Sparkles, Copy, Gift, CalendarPlus, ExternalLink } from 'lucide-react'
import { getGoogleCalendarUrl } from '../lib/eventHelpers'

interface TemplateProps {
  invitation: any
  rsvps: any[]
  wishes: any[]
  countdown: { days: number; hours: number; mins: number; secs: number }
  selectedAttend: string
  setSelectedAttend: (value: string) => void
  wishName: string
  setWishName: (value: string) => void
  wishMessage: string
  setWishMessage: (value: string) => void
  handleRSVPSubmit: (e: React.FormEvent) => void
  handleWishSubmit: (e: React.FormEvent) => void
  isPlaying: boolean
  toggleMusic: () => void
}

const MAROON_DARK = '#2A0A0A'
const MAROON = '#5C1A1A'
const GOLD_DARK = '#5C4423'
const GOLD_MID = '#7A5C33'
const GOLD_ACCENT = '#E8C468'
const CREAM = '#F5E9D8'

// Style dasar dipakai SEMUA input/textarea — width:100% + boxSizing + minWidth:0
// WAJIB supaya form gak bikin grid/flex "blowout" di layar sempit (mobile).
const inputBaseStyle: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  minWidth: 0,
  padding: '0.75rem',
  border: 'none',
  borderRadius: '8px',
  fontSize: '0.9rem',
  outline: 'none',
  background: CREAM,
  color: '#333'
}

function parseDateParts(dateStr: string) {
  if (!dateStr) return { dayName: '', dayNumber: '', monthYear: '' }
  const cleaned = dateStr.replace(/^[A-Za-z]+,\s*/, '').trim()
  const dayNameMatch = dateStr.match(/^([A-Za-z]+),/)
  const numMatch = cleaned.match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/)
  return {
    dayName: dayNameMatch ? dayNameMatch[1] : '',
    dayNumber: numMatch ? numMatch[1] : '',
    monthYear: numMatch ? `${numMatch[2]} ${numMatch[3]}` : cleaned
  }
}

export default function GrandCelebrationTemplate({
  invitation,
  rsvps,
  wishes,
  countdown,
  selectedAttend,
  setSelectedAttend,
  wishName,
  setWishName,
  wishMessage,
  setWishMessage,
  handleRSVPSubmit,
  handleWishSubmit,
  isPlaying,
  toggleMusic
}: TemplateProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [giftType, setGiftType] = useState('transfer')
  const [giftAmount, setGiftAmount] = useState('')
  const [giftBank, setGiftBank] = useState('')
  const [giftDescription, setGiftDescription] = useState('')
  const [giftName, setGiftName] = useState('')
  const [giftShippingNote, setGiftShippingNote] = useState('')
  const [giftSubmitting, setGiftSubmitting] = useState(false)
  const [giftSubmitted, setGiftSubmitted] = useState(false)

  const hadirCount = rsvps.filter(r => r.attendance === '✓ Hadir').length
  const tidakCount = rsvps.filter(r => r.attendance === '✕ Tidak Hadir').length
  const mungkinCount = rsvps.filter(r => r.attendance === '? Mungkin').length

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const calendarUrl = getGoogleCalendarUrl({
    title: `Pernikahan ${invitation.bride_name} & ${invitation.groom_name}`,
    dateStr: invitation.resepsi_date,
    timeStr: invitation.resepsi_time,
    location: invitation.resepsi_venue,
    description: `Resepsi pernikahan ${invitation.bride_name} & ${invitation.groom_name}`
  })

  const giftBankAccounts: Array<{ bank: string; account_number: string; account_name: string }> =
    invitation.gift_bank_accounts || []

  const akadParts = parseDateParts(invitation.akad_date)
  const resepsiParts = parseDateParts(invitation.resepsi_date)

  const initials = `${(invitation.bride_name || 'P')[0]}${(invitation.groom_name || 'K')[0]}`.toUpperCase()

  const journeyMilestones = [
    { year: 'When We Met', text: 'Awal kami dipertemukan dalam sebuah momen sederhana yang ternyata menjadi awal cerita panjang kami.' },
    { year: 'Becoming Us', text: 'Perlahan kami saling mengenal lebih dalam, tumbuh bersama, dan yakin bahwa kami saling melengkapi.' },
    { year: 'The Promise', text: 'Sebuah janji terucap untuk melangkah bersama menuju jenjang yang lebih serius.' },
    { year: 'Our Forever Begins', text: 'Dan kini, kami memutuskan untuk menyatukan dua hati dalam ikatan pernikahan yang sakral.' }
  ]

  const handleGiftSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGiftSubmitting(true)

    const { error } = await supabase
      .from('gift_confirmations')
      .insert([{
        invitation_id: invitation.id,
        name: giftName,
        confirmation_type: giftType,
        amount: giftAmount,
        bank: giftBank,
        gift_description: giftDescription,
        shipping_note: giftShippingNote
      }])

    if (error) {
      alert('Error: ' + error.message)
    } else {
      setGiftSubmitted(true)
    }
    setGiftSubmitting(false)
  }

  return (
    <div style={{ minHeight: '100vh', width: '100%', maxWidth: '100%', overflowX: 'hidden', background: GOLD_DARK, fontFamily: "'Lora', serif", color: CREAM, boxSizing: 'border-box' }}>
      {/* Music Button */}
      {invitation.music_url && (
        <button
          onClick={toggleMusic}
          style={{
            position: 'fixed', bottom: '2rem', right: '2rem', width: '60px', height: '60px',
            borderRadius: '50%', background: MAROON, border: `3px solid ${CREAM}`,
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)', cursor: 'pointer', zIndex: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: CREAM
          }}
        >
          <Music className={`w-6 h-6 ${isPlaying ? 'animate-pulse' : ''}`} />
        </button>
      )}

      {/* HERO */}
      <section style={{
        position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: invitation.photos?.[0] ? `url(${invitation.photos[0]})` : `linear-gradient(135deg, ${MAROON} 0%, ${MAROON_DARK} 100%)`,
          backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.6)'
        }}></div>
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, rgba(60,10,15,0.35), rgba(30,5,8,0.6))` }}></div>

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: CREAM, padding: '2rem', maxWidth: '100%', boxSizing: 'border-box' }}>
          <p style={{ fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.5rem', opacity: 0.9, fontFamily: "'Lora', serif" }}>
            The Wedding of
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 8vw, 4.2rem)',
            textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500,
            marginBottom: '1rem', textShadow: '0 2px 20px rgba(0,0,0,0.4)', wordBreak: 'break-word'
          }}>
            {invitation.bride_name} & {invitation.groom_name}
          </h1>
          <div style={{ fontSize: '1rem', letterSpacing: '0.15em', opacity: 0.95 }}>
            {invitation.resepsi_date}
          </div>
        </div>
      </section>

      {/* DUAL VERSE */}
      {(invitation.verse_1_text || invitation.verse_2_text) && (
        <section style={{ padding: '4rem 1.5rem', background: GOLD_DARK, boxSizing: 'border-box' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto', display: 'grid', gap: '2rem' }}>
            {invitation.verse_1_text && (
              <div style={{ background: 'rgba(0,0,0,0.15)', borderRadius: '16px', padding: '2rem', textAlign: 'center', border: '1px solid rgba(232,196,104,0.25)', boxSizing: 'border-box' }}>
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD_ACCENT, marginBottom: '1rem', fontWeight: 700 }}>
                  {invitation.verse_1_source}
                </p>
                <p style={{ fontSize: '1rem', color: CREAM, lineHeight: 1.9, fontStyle: 'italic', opacity: 0.9 }}>
                  "{invitation.verse_1_text}"
                </p>
              </div>
            )}
            {invitation.verse_2_text && (
              <div style={{ background: 'rgba(0,0,0,0.15)', borderRadius: '16px', padding: '2rem', textAlign: 'center', border: '1px solid rgba(232,196,104,0.25)', boxSizing: 'border-box' }}>
                <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD_ACCENT, marginBottom: '1rem', fontWeight: 700 }}>
                  {invitation.verse_2_source}
                </p>
                <p style={{ fontSize: '1rem', color: CREAM, lineHeight: 1.9, fontStyle: 'italic', opacity: 0.9 }}>
                  "{invitation.verse_2_text}"
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* BRIDE & GROOM */}
      <section style={{ padding: '5rem 1.5rem', background: MAROON_DARK, boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD_ACCENT, marginBottom: '0.5rem' }}>
              Bride and Groom
            </p>
          </div>

          {[
            { name: invitation.groom_name, fullname: invitation.groom_fullname, parents: invitation.groom_parents, label: 'Putra dari', ig: invitation.groom_instagram, emoji: '🤵', photo: invitation.groom_photo },
            { name: invitation.bride_name, fullname: invitation.bride_fullname, parents: invitation.bride_parents, label: 'Putri dari', ig: invitation.bride_instagram, emoji: '👰', photo: invitation.bride_photo }
          ].map((p, i) => (
            <div key={i}>
              {i === 1 && (
                <div style={{ textAlign: 'center', margin: '2.5rem 0' }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', color: GOLD_ACCENT, fontStyle: 'italic' }}>&</span>
                </div>
              )}

              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '150px', height: '190px', margin: '0 auto 1.5rem', borderRadius: '16px', overflow: 'hidden',
                  border: `3px solid ${GOLD_ACCENT}`, boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                  background: p.photo ? undefined : `linear-gradient(135deg, ${MAROON}, ${MAROON_DARK})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  {p.photo ? (
                    <img src={p.photo} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: '3.2rem' }}>{p.emoji}</span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: CREAM, marginBottom: '0.6rem' }}>
                  {p.fullname || p.name}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(245,233,216,0.7)', marginBottom: '0.75rem' }}>
                  {p.label} <strong style={{ color: CREAM }}>{p.parents}</strong>
                </p>
                {p.ig && (
                  <a href={`https://instagram.com/${p.ig.replace('@', '')}`} target="_blank"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: GOLD_ACCENT, fontSize: '0.85rem', textDecoration: 'none' }}>
                    <Instagram className="w-4 h-4" /> @{p.ig.replace('@', '')}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COUNTDOWN + CALENDAR */}
      <section style={{ padding: '5rem 1.5rem', background: `linear-gradient(135deg, ${GOLD_MID}, ${GOLD_DARK})`, textAlign: 'center', color: CREAM, boxSizing: 'border-box' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD_ACCENT, marginBottom: '0.75rem' }}>
          Count the Date
        </p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', marginBottom: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', wordBreak: 'break-word' }}>
          {invitation.bride_name} & {invitation.groom_name}
        </h2>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {[
            { v: countdown.days, l: 'Hari' }, { v: countdown.hours, l: 'Jam' },
            { v: countdown.mins, l: 'Menit' }, { v: countdown.secs, l: 'Detik' }
          ].map((item, i) => (
            <div key={i} style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '1rem 1.1rem', minWidth: '75px', border: '1px solid rgba(232,196,104,0.3)', boxSizing: 'border-box' }}>
              <div style={{ fontSize: '1.9rem', fontWeight: 700, color: CREAM }}>{String(item.v).padStart(2, '0')}</div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.85 }}>{item.l}</div>
            </div>
          ))}
        </div>

        {calendarUrl && (
          <a href={calendarUrl} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 2rem',
              background: CREAM, color: GOLD_DARK, borderRadius: '999px', fontWeight: 600,
              fontSize: '0.9rem', textDecoration: 'none'
            }}>
            <CalendarPlus className="w-5 h-5" /> Simpan di Kalender
          </a>
        )}
      </section>

      {/* AKAD NIKAH & RESEPSI */}
      <section style={{ padding: '5rem 1.5rem', background: MAROON_DARK, boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', display: 'grid', gap: '3rem' }}>
          {[
            { title: 'Akad Nikah', parts: akadParts, time: invitation.akad_time, venue: invitation.akad_venue, address: invitation.akad_address, mapsUrl: invitation.maps_akad_url, photo: invitation.photos?.[0] },
            { title: 'Resepsi', parts: resepsiParts, time: invitation.resepsi_time, venue: invitation.resepsi_venue, address: invitation.resepsi_address, mapsUrl: invitation.maps_resepsi_url, photo: invitation.photos?.[1] || invitation.photos?.[0] }
          ].map((ev, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                width: '130px', height: '160px', margin: '0 auto 1.5rem', borderRadius: '50% / 40%',
                overflow: 'hidden', border: `3px solid ${GOLD_ACCENT}`, boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
                background: ev.photo ? undefined : `linear-gradient(135deg, ${MAROON}, ${MAROON_DARK})`
              }}>
                {ev.photo && <img src={ev.photo} alt={ev.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              </div>

              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', color: GOLD_ACCENT, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                {ev.title}
              </h3>
              {ev.parts.dayName && (
                <p style={{ fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,233,216,0.7)', marginBottom: '1rem' }}>
                  {ev.parts.dayName}
                </p>
              )}

              <div style={{
                width: '90px', height: '90px', margin: '0 auto 1rem', borderRadius: '50%',
                border: `2px solid ${GOLD_ACCENT}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', color: CREAM, fontWeight: 700
              }}>
                {ev.parts.dayNumber || '•'}
              </div>

              <p style={{ fontSize: '0.95rem', color: GOLD_ACCENT, fontWeight: 600, marginBottom: '1rem' }}>
                {ev.parts.monthYear}
              </p>

              <div style={{ color: CREAM, fontSize: '0.9rem', lineHeight: 1.8, opacity: 0.9, padding: '0 0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Clock className="w-4 h-4" style={{ color: GOLD_ACCENT, flexShrink: 0 }} />
                  <span>{ev.time}</span>
                </div>
                <p style={{ fontWeight: 700, marginBottom: '0.25rem', wordBreak: 'break-word' }}>{ev.venue}</p>
                <p style={{ opacity: 0.75, fontSize: '0.85rem', wordBreak: 'break-word' }}>{ev.address}</p>
              </div>

              {ev.mapsUrl && (
                <a href={ev.mapsUrl} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.25rem',
                    padding: '0.7rem 1.5rem', background: 'transparent', border: `1.5px solid ${GOLD_ACCENT}`,
                    color: GOLD_ACCENT, borderRadius: '999px', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600
                  }}>
                  <MapPin className="w-4 h-4" /> Tunjukkan Peta <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* OUR JOURNEY */}
      <section style={{ padding: '5rem 1.5rem', background: GOLD_DARK, boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: GOLD_ACCENT, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Our Journey
            </h2>
          </div>

          <div style={{ display: 'grid', gap: '2.5rem' }}>
            {journeyMilestones.map((m, i) => {
              const photo = invitation.photos?.[i]
              return (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: photo ? '90px 1fr' : '1fr', gap: '1.25rem', alignItems: 'start' }}>
                  {photo && (
                    <div style={{ width: '90px', height: '90px', borderRadius: '12px', overflow: 'hidden', border: `2px solid ${GOLD_ACCENT}`, flexShrink: 0 }}>
                      <img src={photo} alt={m.year} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: GOLD_ACCENT, fontWeight: 700, marginBottom: '0.5rem' }}>
                      {m.year}
                    </p>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(245,233,216,0.85)', lineHeight: 1.8 }}>
                      {m.text}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* LIVE STREAMING */}
      {invitation.live_streaming_url && (
        <section style={{ padding: '4rem 1.5rem', background: MAROON_DARK, textAlign: 'center', boxSizing: 'border-box' }}>
          <Video className="w-10 h-10 mx-auto mb-4" style={{ color: GOLD_ACCENT }} />
          <h2 style={{ fontSize: '1.6rem', fontWeight: 600, marginBottom: '1rem', color: CREAM }}>Live Streaming</h2>
          <p style={{ color: 'rgba(245,233,216,0.75)', maxWidth: '450px', margin: '0 auto 2rem', lineHeight: 1.7, fontSize: '0.9rem' }}>
            Kami mengajak Anda yang tidak dapat hadir langsung untuk bergabung dalam momen spesial kami secara virtual.
          </p>
          <a href={invitation.live_streaming_url} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 2rem', background: GOLD_ACCENT, color: MAROON_DARK, borderRadius: '999px', textDecoration: 'none', fontWeight: 700 }}>
            <Video className="w-5 h-5" /> Join Live
          </a>
        </section>
      )}

      {/* INSTAGRAM FILTER */}
      {invitation.instagram_filter_url && (
        <section style={{ padding: '4rem 1.5rem', background: GOLD_DARK, textAlign: 'center', boxSizing: 'border-box' }}>
          <Instagram className="w-10 h-10 mx-auto mb-4" style={{ color: GOLD_ACCENT }} />
          <h2 style={{ fontSize: '1.6rem', fontWeight: 600, marginBottom: '1rem', color: CREAM }}>Filter Instagram</h2>
          <p style={{ color: 'rgba(245,233,216,0.75)', maxWidth: '450px', margin: '0 auto 2rem', lineHeight: 1.7, fontSize: '0.9rem' }}>
            Bantu kami memeriahkan acara dengan menggunakan filter Instagram spesial ini.
          </p>
          <a href={invitation.instagram_filter_url} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 2rem', background: GOLD_ACCENT, color: MAROON_DARK, borderRadius: '999px', textDecoration: 'none', fontWeight: 700 }}>
            <Sparkles className="w-5 h-5" /> Coba Filter
          </a>
        </section>
      )}

      {/* GALLERY */}
      {invitation.photos && invitation.photos.length > 0 && (
        <section style={{ padding: '5rem 1.5rem', background: MAROON_DARK, boxSizing: 'border-box' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: GOLD_ACCENT, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Our Gallery
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
              {invitation.photos.map((photo: string, i: number) => (
                <div key={i} style={{ position: 'relative', paddingBottom: '100%', overflow: 'hidden', borderRadius: '10px', border: `1px solid rgba(232,196,104,0.3)` }}>
                  <img src={photo} alt={`Gallery ${i + 1}`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WEDDING WISH */}
      <section style={{ padding: '5rem 1.5rem', background: GOLD_DARK, boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '550px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.9rem', color: CREAM, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              Wedding Wish
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'rgba(245,233,216,0.75)', marginBottom: '1.5rem' }}>
              Kirimkan doa & ucapan kepada kedua mempelai
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              {[
                { v: hadirCount, l: 'Hadir' },
                { v: tidakCount, l: 'Tidak Hadir' },
                { v: mungkinCount, l: 'Masih Ragu' }
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: GOLD_ACCENT }}>{s.v}</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(245,233,216,0.7)', textTransform: 'uppercase' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleWishSubmit} style={{ marginBottom: '2rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <input type="text" placeholder="Nama Anda" value={wishName} onChange={(e) => setWishName(e.target.value)} required
                style={inputBaseStyle} />
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <textarea placeholder="Tulis ucapan & doa..." value={wishMessage} onChange={(e) => setWishMessage(e.target.value)} required rows={3}
                style={{ ...inputBaseStyle, resize: 'vertical' }} />
            </div>
            <button type="submit" style={{ width: '100%', boxSizing: 'border-box', padding: '0.9rem', background: MAROON, color: CREAM, border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
              Kirim
            </button>
          </form>

          <div style={{ display: 'grid', gap: '1rem', maxHeight: '400px', overflowY: 'auto' }}>
            {wishes.map((wish) => (
              <div key={wish.id} style={{ background: 'rgba(0,0,0,0.15)', padding: '1.25rem', borderRadius: '10px', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <strong style={{ color: GOLD_ACCENT, fontSize: '0.95rem' }}>{wish.name}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(245,233,216,0.5)' }}>{new Date(wish.created_at).toLocaleDateString('id-ID')}</span>
                </div>
                <p style={{ color: 'rgba(245,233,216,0.85)', fontSize: '0.88rem', lineHeight: 1.7, wordBreak: 'break-word' }}>{wish.message}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WEDDING GIFT */}
      {(giftBankAccounts.length > 0 || invitation.gift_address) && (
        <section style={{ padding: '5rem 1.5rem', background: MAROON_DARK, boxSizing: 'border-box' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: invitation.photos?.[0] ? 'minmax(0, 1fr) minmax(0, 1fr)' : 'minmax(0, 1fr)', gap: '2.5rem', alignItems: 'center' }}>
              <div style={{ minWidth: 0 }}>
                <Gift className="w-8 h-8 mb-3" style={{ color: GOLD_ACCENT }} />
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.7rem', color: GOLD_ACCENT, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                  Wedding Gift
                </h2>
                <p style={{ color: 'rgba(245,233,216,0.8)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  Doa restu Anda merupakan karunia terbesar bagi kami. Jika ingin memberi tanda kasih, Anda dapat melakukannya secara cashless.
                </p>

                {giftSubmitted ? (
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px' }}>
                    <p style={{ color: GOLD_ACCENT, fontWeight: 700 }}>✓ Konfirmasi terkirim, terima kasih!</p>
                  </div>
                ) : (
                  <>
                    {giftBankAccounts.length > 0 && (
                      <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        {giftBankAccounts.map((acc, i) => (
                          <div key={i} style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '10px', boxSizing: 'border-box', minWidth: 0 }}>
                            <p style={{ fontWeight: 700, color: CREAM, fontSize: '0.9rem', marginBottom: '0.35rem' }}>{acc.bank}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                              <span style={{ fontFamily: 'monospace', fontSize: '1rem', color: GOLD_ACCENT, wordBreak: 'break-all' }}>{acc.account_number}</span>
                              <button onClick={() => handleCopy(acc.account_number, `bank-${i}`)}
                                style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.35rem 0.7rem', background: CREAM, border: 'none', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}>
                                <Copy className="w-3 h-3" /> {copiedField === `bank-${i}` ? 'Tersalin!' : 'Salin'}
                              </button>
                            </div>
                            <p style={{ fontSize: '0.75rem', color: 'rgba(245,233,216,0.6)', marginTop: '0.35rem' }}>a.n. {acc.account_name}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {invitation.gift_address && (
                      <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem', boxSizing: 'border-box', minWidth: 0 }}>
                        <p style={{ fontWeight: 700, color: CREAM, fontSize: '0.9rem', marginBottom: '0.35rem' }}>Alamat Kirim Kado</p>
                        <p style={{ fontSize: '0.8rem', color: 'rgba(245,233,216,0.7)' }}>Penerima: {invitation.gift_recipient_name}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', marginTop: '0.35rem', flexWrap: 'wrap' }}>
                          <p style={{ fontSize: '0.8rem', color: 'rgba(245,233,216,0.7)', flex: '1 1 150px', minWidth: 0, wordBreak: 'break-word' }}>{invitation.gift_address}</p>
                          <button onClick={() => handleCopy(invitation.gift_address, 'address')}
                            style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.35rem 0.7rem', background: CREAM, border: 'none', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}>
                            <Copy className="w-3 h-3" /> {copiedField === 'address' ? 'Tersalin!' : 'Salin'}
                          </button>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleGiftSubmit} style={{ background: 'rgba(0,0,0,0.2)', padding: '1.25rem', borderRadius: '12px', boxSizing: 'border-box', minWidth: 0 }}>
                      <p style={{ fontWeight: 700, color: CREAM, fontSize: '0.9rem', marginBottom: '1rem' }}>Konfirmasi Hadiah</p>

                      <div style={{ marginBottom: '0.75rem' }}>
                        <input type="text" placeholder="Nama Anda" value={giftName} onChange={(e) => setGiftName(e.target.value)} required
                          style={{ ...inputBaseStyle, padding: '0.65rem', fontSize: '0.85rem' }} />
                      </div>

                      <div style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {['transfer', 'parcel', 'both'].map(t => (
                          <button key={t} type="button" onClick={() => setGiftType(t)}
                            style={{
                              flex: '1 1 80px', minWidth: 0, padding: '0.5rem 0.3rem', fontSize: '0.7rem', borderRadius: '6px', cursor: 'pointer',
                              border: giftType === t ? `1.5px solid ${GOLD_ACCENT}` : '1px solid rgba(245,233,216,0.3)',
                              background: giftType === t ? GOLD_ACCENT : 'transparent',
                              color: giftType === t ? MAROON_DARK : CREAM,
                              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                            }}>
                            {t === 'transfer' ? 'Transfer' : t === 'parcel' ? 'Parcel' : 'Keduanya'}
                          </button>
                        ))}
                      </div>

                      {(giftType === 'transfer' || giftType === 'both') && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '0.5rem', marginBottom: '0.75rem' }}>
                          <input type="text" placeholder="Jumlah" value={giftAmount} onChange={(e) => setGiftAmount(e.target.value)}
                            style={{ ...inputBaseStyle, padding: '0.65rem', fontSize: '0.8rem' }} />
                          <input type="text" placeholder="Bank" value={giftBank} onChange={(e) => setGiftBank(e.target.value)}
                            style={{ ...inputBaseStyle, padding: '0.65rem', fontSize: '0.8rem' }} />
                        </div>
                      )}

                      {(giftType === 'parcel' || giftType === 'both') && (
                        <>
                          <div style={{ marginBottom: '0.75rem' }}>
                            <input type="text" placeholder="Deskripsi hadiah" value={giftDescription} onChange={(e) => setGiftDescription(e.target.value)}
                              style={{ ...inputBaseStyle, padding: '0.65rem', fontSize: '0.8rem' }} />
                          </div>
                          <div style={{ marginBottom: '1rem' }}>
                            <input type="text" placeholder="Catatan pengiriman (opsional)" value={giftShippingNote} onChange={(e) => setGiftShippingNote(e.target.value)}
                              style={{ ...inputBaseStyle, padding: '0.65rem', fontSize: '0.8rem' }} />
                          </div>
                        </>
                      )}

                      <button type="submit" disabled={giftSubmitting}
                        style={{ width: '100%', boxSizing: 'border-box', padding: '0.75rem', background: GOLD_ACCENT, color: MAROON_DARK, border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', opacity: giftSubmitting ? 0.6 : 1 }}>
                        {giftSubmitting ? 'Mengirim...' : 'Konfirmasi'}
                      </button>
                    </form>
                  </>
                )}
              </div>

              {invitation.photos?.[0] && (
                <div style={{ borderRadius: '16px', overflow: 'hidden', border: `2px solid ${GOLD_ACCENT}`, minWidth: 0 }}>
                  <img src={invitation.photos[0]} alt="Gift" style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }} />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{ padding: '4rem 1.5rem', background: MAROON_DARK, textAlign: 'center', boxSizing: 'border-box' }}>
        <div style={{
          width: '70px', height: '70px', margin: '0 auto 1.5rem', borderRadius: '50%',
          border: `2px solid ${GOLD_ACCENT}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: GOLD_ACCENT, fontWeight: 700
        }}>
          {initials}
        </div>
        <p style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD_ACCENT, marginBottom: '0.5rem' }}>
          With Love
        </p>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: CREAM, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem', wordBreak: 'break-word' }}>
          {invitation.bride_name} & {invitation.groom_name}
        </p>
        <p style={{ color: 'rgba(245,233,216,0.7)', maxWidth: '400px', margin: '0 auto 2rem', fontSize: '0.85rem', lineHeight: 1.7 }}>
          Menjadi sebuah kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dalam hari bahagia kami. Terima kasih atas segala ucapan, doa, dan perhatian yang diberikan.
        </p>
        <p style={{ fontSize: '0.75rem', color: 'rgba(245,233,216,0.4)' }}>Made with ♥ by kaundang.id</p>
      </footer>
    </div>
  )
}