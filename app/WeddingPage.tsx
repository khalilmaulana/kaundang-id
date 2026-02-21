'use client'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'

export default function WeddingPage() {
  const [wishes, setWishes] = useState<any[]>([])
  const [wishName, setWishName] = useState('')
  const [wishMessage, setWishMessage] = useState('')
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })
  const [selectedAttend, setSelectedAttend] = useState('Hadir')

  useEffect(() => {
    const timer = setInterval(() => {
      const target = new Date('2025-03-15T08:00:00')
      const now = new Date()
      const diff = target.getTime() - now.getTime()
      
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, mins: 0, secs: 0 })
        return
      }
      
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      
      setCountdown({ days: d, hours: h, mins: m, secs: s })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    fetchWishes()
  }, [])

  const fetchWishes = async () => {
    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) {
      setWishes(data)
    }
  }

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { data, error } = await supabase
      .from('wishes')
      .insert([
        {
          name: wishName,
          message: wishMessage
        }
      ])
    
    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('Ucapan berhasil dikirim! 🎉')
      setWishName('')
      setWishMessage('')
      fetchWishes()
    }
  }

  const handleEnvelopeClick = () => {
    setEnvelopeOpen(true)
  }

  const handleRSVPSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  const form = e.target as HTMLFormElement
  const formData = new FormData(form)
  
  const { data, error } = await supabase
    .from('rsvp')
    .insert([
      {
        name: formData.get('name') as string,
        phone: formData.get('phone') as string,
        attendance: selectedAttend,
        guest_count: parseInt(formData.get('guest_count') as string)
      }
    ])
  
  if (error) {
    alert('Error: ' + error.message)
  } else {
    alert('Terima kasih sudah konfirmasi! Data tersimpan 🎉')
    form.reset()
  }
}

  if (!envelopeOpen) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--dark)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        zIndex: 1000
      }}>
        <div style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: '1.8rem',
          color: 'var(--gold2)',
          opacity: 0.7
        }}>
          Kepada Yth. Nama Tamu
        </div>
        
        <div 
          onClick={handleEnvelopeClick}
          style={{
            position: 'relative',
            width: '300px',
            height: '200px',
            cursor: 'pointer'
          }}
        >
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '160px',
            background: 'linear-gradient(135deg, #2a1f0a, #1a1305)',
            border: '1px solid rgba(201,165,87,0.3)'
          }}></div>
          
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--gold), var(--gold3))',
            border: '2px solid var(--gold2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
            zIndex: 3,
            boxShadow: '0 0 20px rgba(201,165,87,0.4)'
          }}>
            ❦
          </div>
        </div>
        
        <div style={{
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(201,165,87,0.6)',
          animation: 'pulse 2s infinite'
        }}>
          Klik untuk membuka undangan
        </div>
      </div>
    )
  }

  return (
    <main style={{ background: 'var(--cream)' }}>
      {/* COVER */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #1C150A 0%, #2D200E 50%, #1C150A 100%)',
        textAlign: 'center',
        padding: '4rem 2rem',
        position: 'relative'
      }}>
        <div style={{
          fontSize: '0.7rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(201,165,87,0.7)',
          marginBottom: '2.5rem'
        }}>
          ﷽ Bismillahirrahmanirrahim
        </div>
        
        <div style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 200,
          fontSize: '0.85rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(250,246,238,0.5)',
          marginBottom: '1rem'
        }}>
          Dengan segala kerendahan hati, kami mengundang
        </div>
        
        <div style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(4rem, 10vw, 7rem)',
          lineHeight: 1,
          color: 'var(--gold2)',
          textShadow: '0 0 60px rgba(201,165,87,0.3)',
          marginBottom: '0.5rem'
        }}>
          Siti
        </div>
        
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          color: 'rgba(201,165,87,0.5)',
          display: 'block',
          margin: '0.3rem 0'
        }}>
          &
        </span>
        
        <div style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(4rem, 10vw, 7rem)',
          lineHeight: 1,
          color: 'var(--gold2)',
          textShadow: '0 0 60px rgba(201,165,87,0.3)'
        }}>
          Reza
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          justifyContent: 'center',
          margin: '2rem 0'
        }}>
          <div style={{ height: '1px', width: '80px', background: 'linear-gradient(to right, transparent, var(--gold), transparent)' }}></div>
          <div style={{ width: '8px', height: '8px', background: 'var(--gold)', transform: 'rotate(45deg)' }}></div>
          <div style={{ height: '1px', width: '80px', background: 'linear-gradient(to right, transparent, var(--gold), transparent)' }}></div>
        </div>
        
        <div style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
          fontSize: '0.9rem',
          letterSpacing: '0.15em',
          color: 'rgba(250,246,238,0.7)'
        }}>
          Sabtu, 15 Maret 2025 · Pukul 10.00 WIB<br/>
          <span style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '0.3rem', display: 'block' }}>
            Gedung Sasana Budaya, Jakarta
          </span>
        </div>
      </section>

      {/* QUOTE */}
      <section style={{
        background: 'var(--cream)',
        padding: '6rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          color: 'var(--gold3)',
          lineHeight: 1.8,
          marginBottom: '1.5rem',
          fontFamily: "'Playfair Display', serif"
        }}>
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
        </div>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic',
          fontSize: '1rem',
          color: 'var(--muted)',
          maxWidth: '480px',
          margin: '0 auto 0.5rem',
          lineHeight: 1.8
        }}>
          "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri"
        </p>
        <div style={{
          fontSize: '0.7rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginTop: '0.5rem'
        }}>
          Q.S. Ar-Rum : 21
        </div>
      </section>

      {/* MEMPELAI */}
      <section style={{
        background: 'var(--dark)',
        padding: '6rem 2rem',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: '2rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '180px',
            height: '220px',
            margin: '0 auto 1.5rem',
            background: 'linear-gradient(135deg, #2d200e, #3d2d15)',
            border: '1px solid rgba(201,165,87,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '5rem',
            color: 'rgba(201,165,87,0.15)'
          }}>
            👰
          </div>
          <div style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: '3rem',
            color: 'var(--gold2)',
            lineHeight: 1,
            marginBottom: '0.3rem'
          }}>
            Siti
          </div>
          <div style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            color: 'rgba(250,246,238,0.6)',
            marginBottom: '0.8rem'
          }}>
            Siti Nurhaliza Putri, S.Pd
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: 'rgba(250,246,238,0.4)',
            lineHeight: 1.8
          }}>
            Putri dari<br/>
            <strong style={{ color: 'rgba(250,246,238,0.7)', fontWeight: 400 }}>Bapak H. Ahmad Fauzi</strong><br/>
            & <strong style={{ color: 'rgba(250,246,238,0.7)', fontWeight: 400 }}>Ibu Hj. Rahmawati</strong>
          </div>
        </div>

        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, transparent, var(--gold), transparent)' }}></div>
          <div style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: '5rem',
            color: 'var(--gold)',
            textShadow: '0 0 40px rgba(201,165,87,0.4)'
          }}>
            &
          </div>
          <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, var(--gold), transparent)' }}></div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '180px',
            height: '220px',
            margin: '0 auto 1.5rem',
            background: 'linear-gradient(135deg, #2d200e, #3d2d15)',
            border: '1px solid rgba(201,165,87,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '5rem',
            color: 'rgba(201,165,87,0.15)'
          }}>
            🤵
          </div>
          <div style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: '3rem',
            color: 'var(--gold2)',
            lineHeight: 1,
            marginBottom: '0.3rem'
          }}>
            Reza
          </div>
          <div style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            fontSize: '0.85rem',
            letterSpacing: '0.1em',
            color: 'rgba(250,246,238,0.6)',
            marginBottom: '0.8rem'
          }}>
            Muhammad Reza Pratama, S.T
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: 'rgba(250,246,238,0.4)',
            lineHeight: 1.8
          }}>
            Putra dari<br/>
            <strong style={{ color: 'rgba(250,246,238,0.7)', fontWeight: 400 }}>Bapak H. Bambang Susilo</strong><br/>
            & <strong style={{ color: 'rgba(250,246,238,0.7)', fontWeight: 400 }}>Ibu Hj. Sri Wahyuni</strong>
          </div>
        </div>
      </section>

      {/* ACARA */}
      <section style={{
        background: 'var(--cream2)',
        padding: '6rem 2rem',
        textAlign: 'center'
      }}>
        <span style={{
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          display: 'block',
          marginBottom: '0.8rem'
        }}>
          ✦ Jadwal Acara
        </span>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 400,
          color: 'var(--dark)',
          marginBottom: '3rem',
          lineHeight: 1.2
        }}>
          Rangkaian<br/>
          <em style={{ fontStyle: 'italic', color: 'var(--gold3)' }}>Acara Pernikahan</em>
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          <div style={{
            background: '#fff',
            border: '1px solid rgba(201,165,87,0.2)',
            padding: '2.5rem 2rem',
            transition: 'transform 0.3s'
          }}>
            <span style={{ fontSize: '2rem', marginBottom: '1rem', display: 'block' }}>🕌</span>
            <div style={{
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '0.8rem'
            }}>
              Akad Nikah
            </div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.6rem',
              color: 'var(--dark)',
              marginBottom: '1.2rem'
            }}>
              Ijab Kabul
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 2 }}>
              <strong style={{ display: 'block', color: 'var(--text)', fontWeight: 500, fontSize: '0.9rem' }}>
                Sabtu, 15 Maret 2025
              </strong>
              Pukul 08.00 – 10.00 WIB<br/>
              Masjid Al-Ikhlas<br/>
              Jl. Sudirman No. 12, Jakarta Pusat
            </div>
          </div>

          <div style={{
            background: '#fff',
            border: '1px solid rgba(201,165,87,0.2)',
            padding: '2.5rem 2rem',
            transition: 'transform 0.3s'
          }}>
            <span style={{ fontSize: '2rem', marginBottom: '1rem', display: 'block' }}>🌸</span>
            <div style={{
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '0.8rem'
            }}>
              Resepsi
            </div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.6rem',
              color: 'var(--dark)',
              marginBottom: '1.2rem'
            }}>
              Walimatul Ursy
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 2 }}>
              <strong style={{ display: 'block', color: 'var(--text)', fontWeight: 500, fontSize: '0.9rem' }}>
                Sabtu, 15 Maret 2025
              </strong>
              Pukul 11.00 – 15.00 WIB<br/>
              Gedung Sasana Budaya<br/>
              Jl. Gatot Subroto Kav. 5, Jakarta
            </div>
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section style={{
        background: 'var(--dark)',
        padding: '5rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          color: 'var(--gold2)',
          marginBottom: '3rem'
        }}>
          Menghitung Hari...
        </div>
        
        <div style={{
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              color: '#fff',
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, rgba(201,165,87,0.15), rgba(201,165,87,0.05))',
              border: '1px solid rgba(201,165,87,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {String(countdown.days).padStart(2, '0')}
            </div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,165,87,0.6)' }}>
              Hari
            </div>
          </div>
          
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', color: 'rgba(201,165,87,0.3)', alignSelf: 'flex-start', paddingTop: '1.5rem' }}>:</div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              color: '#fff',
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, rgba(201,165,87,0.15), rgba(201,165,87,0.05))',
              border: '1px solid rgba(201,165,87,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {String(countdown.hours).padStart(2, '0')}
            </div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,165,87,0.6)' }}>
              Jam
            </div>
          </div>
          
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', color: 'rgba(201,165,87,0.3)', alignSelf: 'flex-start', paddingTop: '1.5rem' }}>:</div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              color: '#fff',
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, rgba(201,165,87,0.15), rgba(201,165,87,0.05))',
              border: '1px solid rgba(201,165,87,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {String(countdown.mins).padStart(2, '0')}
            </div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,165,87,0.6)' }}>
              Menit
            </div>
          </div>
          
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', color: 'rgba(201,165,87,0.3)', alignSelf: 'flex-start', paddingTop: '1.5rem' }}>:</div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              color: '#fff',
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, rgba(201,165,87,0.15), rgba(201,165,87,0.05))',
              border: '1px solid rgba(201,165,87,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {String(countdown.secs).padStart(2, '0')}
            </div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,165,87,0.6)' }}>
              Detik
            </div>
          </div>
        </div>
      </section>
      
      {/* GALERI */}
      <section style={{
        background: 'var(--cream)',
        padding: '6rem 2rem'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            display: 'block',
            marginBottom: '0.8rem'
          }}>
            ✦ Galeri Foto
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 400,
            color: 'var(--dark)'
          }}>
            Momen <em style={{ fontStyle: 'italic', color: 'var(--gold3)' }}>Berharga</em> Kami
          </h2>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: '200px 200px',
          gap: '0.75rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--cream2), #E8DCC8)',
            border: '1px solid rgba(201,165,87,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            color: 'rgba(201,165,87,0.3)',
            gridColumn: 'span 2',
            cursor: 'pointer',
            transition: 'transform 0.3s'
          }}>
            🌸
          </div>
          <div style={{
            background: 'linear-gradient(135deg, var(--cream2), #E8DCC8)',
            border: '1px solid rgba(201,165,87,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            color: 'rgba(201,165,87,0.3)',
            cursor: 'pointer',
            transition: 'transform 0.3s'
          }}>
            💍
          </div>
          <div style={{
            background: 'linear-gradient(135deg, var(--cream2), #E8DCC8)',
            border: '1px solid rgba(201,165,87,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            color: 'rgba(201,165,87,0.3)',
            cursor: 'pointer',
            transition: 'transform 0.3s'
          }}>
            👫
          </div>
          <div style={{
            background: 'linear-gradient(135deg, var(--cream2), #E8DCC8)',
            border: '1px solid rgba(201,165,87,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            color: 'rgba(201,165,87,0.3)',
            gridColumn: 'span 2',
            cursor: 'pointer',
            transition: 'transform 0.3s'
          }}>
            🌹
          </div>
        </div>
        <p style={{
          textAlign: 'center',
          marginTop: '1rem',
          fontSize: '0.75rem',
          color: 'var(--muted)'
        }}>
          * Foto dapat diganti dengan foto asli mempelai
        </p>
      </section>

      {/* MAPS */}
      <section style={{
        background: 'var(--cream2)',
        padding: '6rem 2rem',
        textAlign: 'center'
      }}>
        <span style={{
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          display: 'block',
          marginBottom: '0.8rem'
        }}>
          ✦ Lokasi
        </span>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 400,
          color: 'var(--dark)',
          marginBottom: '2.5rem'
        }}>
          Temukan<br/>
          <em style={{ fontStyle: 'italic', color: 'var(--gold3)' }}>Lokasi Kami</em>
        </h2>
        
        <div style={{
          maxWidth: '700px',
          margin: '0 auto 1.5rem',
          height: '320px',
          background: 'linear-gradient(135deg, #e8e0d0, #d8ccb8)',
          border: '1px solid rgba(201,165,87,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '1rem',
          color: 'var(--muted)'
        }}>
          <span style={{ fontSize: '3rem' }}>📍</span>
          <div>
            <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--text)', marginBottom: '0.3rem' }}>
              Gedung Sasana Budaya
            </strong>
            <div style={{ fontSize: '0.85rem' }}>
              Jl. Gatot Subroto Kav. 5, Jakarta Selatan
            </div>
          </div>
        </div>
        
        <a 
          href="https://maps.google.com" 
          target="_blank"
          style={{
            display: 'inline-block',
            padding: '0.8rem 2rem',
            background: 'var(--gold)',
            color: '#fff',
            textDecoration: 'none',
            fontSize: '0.8rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            transition: 'background 0.3s'
          }}
        >
          Buka di Google Maps →
        </a>
      </section>

      {/* UCAPAN */}
      <section style={{
        background: 'var(--cream)',
        padding: '6rem 2rem',
        textAlign: 'center'
      }}>
        <span style={{
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          display: 'block',
          marginBottom: '0.8rem'
        }}>
          ✦ Doa & Ucapan
        </span>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 400,
          color: 'var(--dark)',
          marginBottom: '2rem'
        }}>
          Ucapan Selamat
        </h2>
        
        {/* Form Ucapan */}
        <form onSubmit={handleWishSubmit} style={{
          maxWidth: '600px',
          margin: '0 auto 3rem',
          background: '#fff',
          padding: '2rem',
          border: '1px solid rgba(201,165,87,0.15)'
        }}>
          <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
            <label style={{
              display: 'block',
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '0.5rem'
            }}>
              Nama
            </label>
            <input 
              type="text" 
              value={wishName}
              onChange={(e) => setWishName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                border: '1px solid rgba(201,165,87,0.2)',
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.9rem',
                outline: 'none'
              }} 
            />
          </div>
          
          <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <label style={{
              display: 'block',
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '0.5rem'
            }}>
              Ucapan & Doa
            </label>
            <textarea 
              value={wishMessage}
              onChange={(e) => setWishMessage(e.target.value)}
              required
              rows={4}
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                border: '1px solid rgba(201,165,87,0.2)',
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.9rem',
                outline: 'none',
                resize: 'vertical'
              }} 
            />
          </div>
          
          <button type="submit" style={{
            width: '100%',
            padding: '0.8rem',
            background: 'var(--gold)',
            border: 'none',
            color: '#fff',
            fontFamily: "'Jost', sans-serif",
            fontSize: '0.8rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            cursor: 'pointer'
          }}>
            Kirim Ucapan
          </button>
        </form>
        
        {/* List Ucapan */}
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {wishes.length > 0 ? (
            wishes.map((wish) => (
              <div key={wish.id} style={{
                background: '#fff',
                border: '1px solid rgba(201,165,87,0.15)',
                padding: '1.8rem',
                textAlign: 'left',
                position: 'relative'
              }}>
                <div style={{
                  fontWeight: 500,
                  color: 'var(--gold3)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.05em',
                  marginBottom: '0.5rem'
                }}>
                  {wish.name}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: 'var(--muted)',
                  lineHeight: 1.8
                }}>
                  {wish.message}
                </div>
                <div style={{
                  fontSize: '0.7rem',
                  color: 'rgba(201,165,87,0.5)',
                  marginTop: '0.8rem'
                }}>
                  {new Date(wish.created_at).toLocaleDateString('id-ID')}
                </div>
              </div>
            ))
          ) : (
            <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
              Belum ada ucapan. Jadilah yang pertama! 💝
            </div>
          )}
        </div>
      </section>

      {/* AMPLOP DIGITAL */}
      <section style={{
        background: 'var(--cream2)',
        padding: '5rem 2rem',
        textAlign: 'center'
      }}>
        <span style={{
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          display: 'block',
          marginBottom: '0.8rem'
        }}>
          ✦ Hadiah
        </span>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 400,
          color: 'var(--dark)',
          marginBottom: '0.5rem'
        }}>
          Amplop Digital
        </h2>
        <p style={{
          color: 'var(--muted)',
          fontSize: '0.85rem',
          marginTop: '0.5rem',
          marginBottom: '2.5rem'
        }}>
          Doa dan kehadiran kalian adalah hadiah terbaik bagi kami.<br/>
          Namun jika ingin memberikan tanda kasih, tersedia di bawah ini.
        </p>
        
        <div style={{
          maxWidth: '400px',
          margin: '0 auto',
          background: '#fff',
          border: '1px solid rgba(201,165,87,0.2)',
          padding: '2.5rem'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💌</div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.5rem',
            color: 'var(--dark)',
            marginBottom: '0.5rem'
          }}>
            Transfer Bank
          </div>
          <div style={{
            fontSize: '0.85rem',
            color: 'var(--muted)',
            marginBottom: '1.5rem',
            lineHeight: 1.7
          }}>
            Tersedia pilihan transfer ke rekening berikut
          </div>
          
          <div style={{
            background: 'var(--cream2)',
            padding: '1rem',
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--muted)'
              }}>
                Bank BCA — a.n. Siti Nurhaliza
              </div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.1rem',
                color: 'var(--dark)'
              }}>
                1234 5678 9012
              </div>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText('1234567890012')
                alert('Nomor rekening disalin!')
              }}
              style={{
                fontSize: '0.7rem',
                padding: '0.3rem 0.7rem',
                background: 'var(--gold)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.08em',
                transition: 'background 0.3s'
              }}
            >
              Salin
            </button>
          </div>
          
          <div style={{
            background: 'var(--cream2)',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--muted)'
              }}>
                Bank Mandiri — a.n. M. Reza Pratama
              </div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.1rem',
                color: 'var(--dark)'
              }}>
                9876 5432 1098
              </div>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText('9876543210098')
                alert('Nomor rekening disalin!')
              }}
              style={{
                fontSize: '0.7rem',
                padding: '0.3rem 0.7rem',
                background: 'var(--gold)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.08em',
                transition: 'background 0.3s'
              }}
            >
              Salin
            </button>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section style={{
        background: 'var(--cream2)',
        padding: '6rem 2rem',
        textAlign: 'center'
      }}>
        <span style={{
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          display: 'block',
          marginBottom: '0.8rem'
        }}>
          ✦ Konfirmasi Kehadiran
        </span>
        
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 400,
          color: 'var(--dark)',
          marginBottom: '2rem'
        }}>
          Kami Menanti Kehadiranmu
        </h2>
        
        <form onSubmit={handleRSVPSubmit} style={{
          maxWidth: '500px',
          margin: '0 auto',
          background: '#fff',
          padding: '2.5rem',
          border: '1px solid rgba(201,165,87,0.2)'
        }}>
          <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <label style={{
              display: 'block',
              fontSize: '0.68rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '0.5rem'
            }}>
              Nama Lengkap
            </label>
            <input type="text" name="name" required style={{
              width: '100%',
              padding: '0.9rem 1.2rem',
              border: '1px solid rgba(201,165,87,0.2)',
              fontFamily: "'Jost', sans-serif",
              fontSize: '0.9rem',
              outline: 'none'
            }} />
          </div>
          
          <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <label style={{
              display: 'block',
              fontSize: '0.68rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '0.5rem'
            }}>
              Nomor HP
            </label>
            <input type="tel" name="phone" style={{
              width: '100%',
              padding: '0.9rem 1.2rem',
              border: '1px solid rgba(201,165,87,0.2)',
              fontFamily: "'Jost', sans-serif",
              fontSize: '0.9rem',
              outline: 'none'
            }} />
          </div>
          
          <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <label style={{
              display: 'block',
              fontSize: '0.68rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '0.5rem'
            }}>
              Kehadiran
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
              {['✓ Hadir', '✕ Tidak Hadir', '? Mungkin'].map((opt) => (
                <div
                  key={opt}
                  onClick={() => setSelectedAttend(opt)}
                  style={{
                    padding: '0.8rem',
                    textAlign: 'center',
                    border: '1px solid rgba(201,165,87,0.2)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    letterSpacing: '0.05em',
                    background: selectedAttend === opt ? 'var(--gold)' : 'transparent',
                    color: selectedAttend === opt ? '#fff' : 'var(--muted)',
                    transition: 'all 0.3s'
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <label style={{
              display: 'block',
              fontSize: '0.68rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '0.5rem'
            }}>
              Jumlah Tamu
            </label>
            <select name="guest_count" style={{
              width: '100%',
              padding: '0.9rem 1.2rem',
              border: '1px solid rgba(201,165,87,0.2)',
              fontFamily: "'Jost', sans-serif",
              fontSize: '0.9rem',
              outline: 'none',
              background: '#fff'
            }}>
              <option value="1">1 orang</option>
              <option value="2">2 orang</option>
              <option value="3">3 orang</option>
              <option value="4">4 orang</option>
            </select>
          </div>
          
          <button type="submit" style={{
            width: '100%',
            padding: '1rem',
            background: 'var(--gold)',
            border: 'none',
            color: '#fff',
            fontFamily: "'Jost', sans-serif",
            fontSize: '0.8rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'background 0.3s'
          }}>
            Kirim Konfirmasi
          </button>
        </form>
      </section>

      {/* PENUTUP */}
      <section style={{
        background: 'var(--dark)',
        padding: '8rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          color: 'var(--gold2)',
          textShadow: '0 0 60px rgba(201,165,87,0.3)',
          marginBottom: '1.5rem'
        }}>
          Terima Kasih
        </div>
        
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic',
          fontSize: '1rem',
          color: 'rgba(250,246,238,0.5)',
          maxWidth: '400px',
          margin: '0 auto 3rem',
          lineHeight: 1.9
        }}>
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
        </p>
        
        <div style={{
          fontFamily: "'Jost', sans-serif",
          fontWeight: 200,
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(201,165,87,0.5)'
        }}>
          Hormat kami, Keluarga Besar<br/>
          <span style={{
            color: 'rgba(201,165,87,0.7)',
            fontFamily: "'Great Vibes', cursive",
            fontSize: '1.8rem',
            display: 'block',
            marginTop: '0.5rem'
          }}>
            Siti & Reza
          </span>
        </div>
      </section>
    </main>
  )
}