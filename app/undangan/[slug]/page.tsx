'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useParams } from 'next/navigation'

export default function InvitationPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [invitation, setInvitation] = useState<any>(null)
  const [rsvps, setRsvps] = useState<any[]>([])
  const [wishes, setWishes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })
  const [selectedAttend, setSelectedAttend] = useState('✓ Hadir')
  const [wishName, setWishName] = useState('')
  const [wishMessage, setWishMessage] = useState('')

  useEffect(() => {
    fetchInvitation()
  }, [slug])

  useEffect(() => {
    if (invitation) {
      const timer = setInterval(() => {
        const target = new Date(invitation.resepsi_date)
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
    }
  }, [invitation])

  const fetchInvitation = async () => {
    setLoading(true)
    
    const { data: invData } = await supabase
      .from('invitations')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (invData) {
      setInvitation(invData)
      
      // Fetch RSVP & wishes for this invitation
      const { data: rsvpData } = await supabase
        .from('rsvp')
        .select('*')
        .eq('invitation_id', invData.id)
      
      const { data: wishData } = await supabase
        .from('wishes')
        .select('*')
        .eq('invitation_id', invData.id)
        .order('created_at', { ascending: false })
      
      if (rsvpData) setRsvps(rsvpData)
      if (wishData) setWishes(wishData)
    }
    
    setLoading(false)
  }

  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    
    const { error } = await supabase
      .from('rsvp')
      .insert([
        {
          invitation_id: invitation.id,
          name: formData.get('name') as string,
          phone: formData.get('phone') as string,
          attendance: selectedAttend,
          guest_count: parseInt(formData.get('guest_count') as string)
        }
      ])
    
    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('Terima kasih sudah konfirmasi! 🎉')
      form.reset()
      fetchInvitation()
    }
  }

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { error } = await supabase
      .from('wishes')
      .insert([
        {
          invitation_id: invitation.id,
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
      fetchInvitation()
    }
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1C150A',
        color: '#C9A557'
      }}>
        Loading undangan...
      </div>
    )
  }

  if (!invitation) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1C150A',
        color: '#C9A557',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
        <p style={{ fontSize: '1.2rem' }}>Undangan tidak ditemukan</p>
      </div>
    )
  }

  // Envelope
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
          onClick={() => setEnvelopeOpen(true)}
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
          color: 'rgba(201,165,87,0.6)'
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
          {invitation.bride_name}
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
          {invitation.groom_name}
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
          {invitation.resepsi_date} · {invitation.resepsi_time}<br/>
          <span style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '0.3rem', display: 'block' }}>
            {invitation.resepsi_venue}
          </span>
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
            {invitation.bride_name} & {invitation.groom_name}
          </span>
        </div>
      </section>
    </main>
  )
}