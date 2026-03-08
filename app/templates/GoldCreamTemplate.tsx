'use client'

interface TemplateProps {
  invitation: any
  rsvps: any[]
  wishes: any[]
  countdown: { days: number; hours: number; mins: number; secs: number }
  selectedAttend: string
  setSelectedAttend: (val: string) => void
  wishName: string
  setWishName: (val: string) => void
  wishMessage: string
  setWishMessage: (val: string) => void
  handleRSVPSubmit: (e: React.FormEvent) => void
  handleWishSubmit: (e: React.FormEvent) => void
  isPlaying: boolean
  toggleMusic: () => void
}

export default function GoldCreamTemplate({
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
  return (
    <>
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
      
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
            {[
              { val: countdown.days, label: 'Hari' },
              { val: countdown.hours, label: 'Jam' },
              { val: countdown.mins, label: 'Menit' },
              { val: countdown.secs, label: 'Detik' }
            ].map((item, idx) => (
              <div key={idx}>
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
                  {String(item.val).padStart(2, '0')}
                </div>
                <div style={{ 
                  fontSize: '0.65rem', 
                  letterSpacing: '0.2em', 
                  textTransform: 'uppercase', 
                  color: 'rgba(201,165,87,0.6)',
                  marginTop: '0.5rem'
                }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PHOTO GALLERY */}
        {invitation.photos && invitation.photos.length > 0 && (
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
              ✦ Galeri Foto
            </span>
            
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400,
              color: 'var(--dark)',
              marginBottom: '3rem'
            }}>
              Momen Kami
            </h2>

            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {invitation.photos.map((photo: string, index: number) => (
                <div
                  key={index}
                  style={{
                    position: 'relative',
                    paddingBottom: '100%',
                    overflow: 'hidden',
                    border: '1px solid rgba(201,165,87,0.2)',
                    cursor: 'pointer',
                    transition: 'transform 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  <img
                    src={photo}
                    alt={`Gallery ${index + 1}`}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

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

        {/* WISHES */}
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

        {/* CLOSING */}
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

        {/* Floating Music Button */}
        {invitation.music_url && (
          <div
            onClick={toggleMusic}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #C9A557, #D4A843)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(201,165,87,0.4)',
              zIndex: 999,
              transition: 'transform 0.3s',
              animation: isPlaying ? 'pulse 2s infinite' : 'none'
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>
              {isPlaying ? '🔊' : '🔇'}
            </span>
          </div>
        )}
      </main>
    </>
  )
}