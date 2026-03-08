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

export default function ModernMinimalTemplate({
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
      
      <main style={{ background: '#ffffff' }}>
        {/* COVER */}
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1a1a1a',
          textAlign: 'center',
          padding: '4rem 2rem',
          position: 'relative'
        }}>
          <div style={{
            fontSize: '0.65rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: '#999',
            marginBottom: '3rem',
            fontWeight: 300
          }}>
            The Wedding of
          </div>
          
          <div style={{
            fontSize: 'clamp(3.5rem, 10vw, 6rem)',
            lineHeight: 1.1,
            color: '#fff',
            marginBottom: '1rem',
            fontWeight: 200,
            letterSpacing: '-0.02em'
          }}>
            {invitation.bride_name}
          </div>
          
          <div style={{
            width: '60px',
            height: '1px',
            background: '#fff',
            margin: '1.5rem 0'
          }}></div>
          
          <div style={{
            fontSize: 'clamp(3.5rem, 10vw, 6rem)',
            lineHeight: 1.1,
            color: '#fff',
            fontWeight: 200,
            letterSpacing: '-0.02em'
          }}>
            {invitation.groom_name}
          </div>
          
          <div style={{
            fontSize: '0.9rem',
            color: '#999',
            marginTop: '3rem',
            fontWeight: 300,
            letterSpacing: '0.05em'
          }}>
            {invitation.resepsi_date}
          </div>
        </section>

        {/* COUNTDOWN */}
        <section style={{
          background: '#f5f5f5',
          padding: '5rem 2rem',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#1a1a1a',
            marginBottom: '3rem',
            fontWeight: 500
          }}>
            Countdown
          </h2>
          
          <div style={{
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {[
              { val: countdown.days, label: 'Days' },
              { val: countdown.hours, label: 'Hours' },
              { val: countdown.mins, label: 'Minutes' },
              { val: countdown.secs, label: 'Seconds' }
            ].map((item, idx) => (
              <div key={idx}>
                <div style={{
                  fontSize: '3.5rem',
                  color: '#1a1a1a',
                  fontWeight: 200,
                  lineHeight: 1
                }}>
                  {String(item.val).padStart(2, '0')}
                </div>
                <div style={{ 
                  fontSize: '0.65rem', 
                  letterSpacing: '0.2em', 
                  textTransform: 'uppercase', 
                  color: '#999',
                  marginTop: '0.5rem',
                  fontWeight: 300
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
            background: '#fff',
            padding: '6rem 2rem'
          }}>
            <h2 style={{
              fontSize: '0.7rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#1a1a1a',
              marginBottom: '3rem',
              fontWeight: 500,
              textAlign: 'center'
            }}>
              Gallery
            </h2>

            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1rem'
            }}>
              {invitation.photos.map((photo: string, index: number) => (
                <div
                  key={index}
                  style={{
                    position: 'relative',
                    paddingBottom: '100%',
                    overflow: 'hidden',
                    background: '#f5f5f5'
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
                      objectFit: 'cover',
                      transition: 'transform 0.5s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* RSVP */}
        <section style={{
          background: '#1a1a1a',
          padding: '6rem 2rem',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#fff',
            marginBottom: '3rem',
            fontWeight: 500
          }}>
            RSVP
          </h2>
          
          <form onSubmit={handleRSVPSubmit} style={{
            maxWidth: '500px',
            margin: '0 auto',
            background: '#222',
            padding: '2.5rem',
            border: '1px solid #333'
          }}>
            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <label style={{
                display: 'block',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#999',
                marginBottom: '0.5rem',
                fontWeight: 300
              }}>
                Name
              </label>
              <input type="text" name="name" required style={{
                width: '100%',
                padding: '0.9rem',
                border: '1px solid #333',
                background: '#1a1a1a',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none'
              }} />
            </div>
            
            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <label style={{
                display: 'block',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#999',
                marginBottom: '0.5rem',
                fontWeight: 300
              }}>
                Phone
              </label>
              <input type="tel" name="phone" style={{
                width: '100%',
                padding: '0.9rem',
                border: '1px solid #333',
                background: '#1a1a1a',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none'
              }} />
            </div>
            
            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <label style={{
                display: 'block',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#999',
                marginBottom: '0.5rem',
                fontWeight: 300
              }}>
                Attendance
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                {['✓ Hadir', '✕ Tidak Hadir', '? Mungkin'].map((opt) => (
                  <div
                    key={opt}
                    onClick={() => setSelectedAttend(opt)}
                    style={{
                      padding: '0.8rem',
                      textAlign: 'center',
                      border: selectedAttend === opt ? '1px solid #fff' : '1px solid #333',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      background: selectedAttend === opt ? '#fff' : 'transparent',
                      color: selectedAttend === opt ? '#1a1a1a' : '#999',
                      transition: 'all 0.3s',
                      fontWeight: 300
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
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#999',
                marginBottom: '0.5rem',
                fontWeight: 300
              }}>
                Guests
              </label>
              <select name="guest_count" style={{
                width: '100%',
                padding: '0.9rem',
                border: '1px solid #333',
                background: '#1a1a1a',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none'
              }}>
                <option value="1">1 person</option>
                <option value="2">2 people</option>
                <option value="3">3 people</option>
                <option value="4">4 people</option>
              </select>
            </div>
            
            <button type="submit" style={{
              width: '100%',
              padding: '1rem',
              background: '#fff',
              border: 'none',
              color: '#1a1a1a',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontWeight: 500
            }}>
              Submit
            </button>
          </form>
        </section>

        {/* WISHES */}
        <section style={{
          background: '#f5f5f5',
          padding: '6rem 2rem',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#1a1a1a',
            marginBottom: '3rem',
            fontWeight: 500
          }}>
            Wishes
          </h2>
          
          <form onSubmit={handleWishSubmit} style={{
            maxWidth: '600px',
            margin: '0 auto 3rem',
            background: '#fff',
            padding: '2rem',
            border: '1px solid #e0e0e0'
          }}>
            <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
              <label style={{
                display: 'block',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#666',
                marginBottom: '0.5rem',
                fontWeight: 300
              }}>
                Name
              </label>
              <input 
                type="text" 
                value={wishName}
                onChange={(e) => setWishName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '1px solid #e0e0e0',
                  fontSize: '0.9rem',
                  outline: 'none'
                }} 
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <label style={{
                display: 'block',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#666',
                marginBottom: '0.5rem',
                fontWeight: 300
              }}>
                Message
              </label>
              <textarea 
                value={wishMessage}
                onChange={(e) => setWishMessage(e.target.value)}
                required
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '1px solid #e0e0e0',
                  fontSize: '0.9rem',
                  outline: 'none',
                  resize: 'vertical'
                }} 
              />
            </div>
            
            <button type="submit" style={{
              width: '100%',
              padding: '0.8rem',
              background: '#1a1a1a',
              border: 'none',
              color: '#fff',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontWeight: 500
            }}>
              Send
            </button>
          </form>
          
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {wishes.length > 0 ? (
              wishes.map((wish) => (
                <div key={wish.id} style={{
                  background: '#fff',
                  border: '1px solid #e0e0e0',
                  padding: '1.5rem',
                  textAlign: 'left'
                }}>
                  <div style={{
                    fontWeight: 500,
                    color: '#1a1a1a',
                    fontSize: '0.85rem',
                    marginBottom: '0.5rem'
                  }}>
                    {wish.name}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#666',
                    lineHeight: 1.6
                  }}>
                    {wish.message}
                  </div>
                  <div style={{
                    fontSize: '0.7rem',
                    color: '#999',
                    marginTop: '0.8rem'
                  }}>
                    {new Date(wish.created_at).toLocaleDateString('id-ID')}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: '#999', fontSize: '0.9rem' }}>
                No messages yet
              </div>
            )}
          </div>
        </section>

        {/* CLOSING */}
        <section style={{
          background: '#1a1a1a',
          padding: '8rem 2rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            color: '#fff',
            marginBottom: '2rem',
            fontWeight: 200,
            letterSpacing: '-0.02em'
          }}>
            Thank You
          </div>
          
          <p style={{
            fontSize: '0.9rem',
            color: '#999',
            maxWidth: '400px',
            margin: '0 auto 2rem',
            lineHeight: 1.8,
            fontWeight: 300
          }}>
            We look forward to celebrating with you
          </p>
          
          <div style={{
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#666',
            fontWeight: 300
          }}>
            {invitation.bride_name} & {invitation.groom_name}
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
              background: '#1a1a1a',
              border: '1px solid #333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
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