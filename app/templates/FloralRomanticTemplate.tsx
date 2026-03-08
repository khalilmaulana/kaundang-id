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

export default function FloralRomanticTemplate({
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
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
      
      <main style={{ background: '#fef8f5' }}>
        {/* COVER */}
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #ffd4e5 0%, #ffe8f0 50%, #fff5f8 100%)',
          textAlign: 'center',
          padding: '4rem 2rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative elements */}
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            fontSize: '3rem',
            opacity: 0.3,
            animation: 'float 3s ease-in-out infinite'
          }}>🌸</div>
          <div style={{
            position: 'absolute',
            top: '20%',
            right: '15%',
            fontSize: '2rem',
            opacity: 0.3,
            animation: 'float 4s ease-in-out infinite'
          }}>🌺</div>
          <div style={{
            position: 'absolute',
            bottom: '15%',
            left: '20%',
            fontSize: '2.5rem',
            opacity: 0.3,
            animation: 'float 3.5s ease-in-out infinite'
          }}>🌼</div>
          
          <div style={{
            fontSize: '0.8rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#ff9eb7',
            marginBottom: '2rem',
            fontWeight: 400
          }}>
            ✿ Wedding Invitation ✿
          </div>
          
          <div style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(4.5rem, 12vw, 8rem)',
            lineHeight: 1,
            color: '#ff6b9d',
            marginBottom: '1rem',
            textShadow: '0 2px 10px rgba(255,107,157,0.2)'
          }}>
            {invitation.bride_name}
          </div>
          
          <div style={{
            fontSize: '2.5rem',
            color: '#7fb069',
            margin: '1rem 0'
          }}>
            ✿
          </div>
          
          <div style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(4.5rem, 12vw, 8rem)',
            lineHeight: 1,
            color: '#ff6b9d',
            textShadow: '0 2px 10px rgba(255,107,157,0.2)'
          }}>
            {invitation.groom_name}
          </div>
          
          <div style={{
            marginTop: '2.5rem',
            fontSize: '1rem',
            color: '#a67c94',
            fontWeight: 300,
            letterSpacing: '0.1em'
          }}>
            {invitation.resepsi_date}
          </div>
        </section>

        {/* COUNTDOWN */}
        <section style={{
          background: '#fff',
          padding: '5rem 2rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '2.5rem',
            marginBottom: '1rem'
          }}>🌺</div>
          
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontFamily: "'Great Vibes', cursive",
            color: '#ff6b9d',
            marginBottom: '3rem'
          }}>
            Counting the Days
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
                  color: '#ff6b9d',
                  fontWeight: 300,
                  width: '100px',
                  height: '100px',
                  border: '2px solid #ffd4e5',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#fff5f8'
                }}>
                  {String(item.val).padStart(2, '0')}
                </div>
                <div style={{ 
                  fontSize: '0.75rem', 
                  letterSpacing: '0.2em', 
                  textTransform: 'uppercase', 
                  color: '#a67c94',
                  marginTop: '0.8rem',
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
            background: 'linear-gradient(to bottom, #fef8f5, #fff5f8)',
            padding: '6rem 2rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '2rem',
              marginBottom: '1rem'
            }}>🌸</div>
            
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontFamily: "'Great Vibes', cursive",
              color: '#ff6b9d',
              marginBottom: '3rem'
            }}>
              Our Moments
            </h2>

            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem'
            }}>
              {invitation.photos.map((photo: string, index: number) => (
                <div
                  key={index}
                  style={{
                    position: 'relative',
                    paddingBottom: '100%',
                    overflow: 'hidden',
                    borderRadius: '20px',
                    border: '3px solid #ffd4e5',
                    boxShadow: '0 5px 20px rgba(255,107,157,0.1)'
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
                      e.currentTarget.style.transform = 'scale(1.1) rotate(2deg)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* RSVP */}
        <section style={{
          background: '#fff',
          padding: '6rem 2rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '2rem',
            marginBottom: '1rem'
          }}>🌼</div>
          
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontFamily: "'Great Vibes', cursive",
            color: '#ff6b9d',
            marginBottom: '3rem'
          }}>
            Join Our Celebration
          </h2>
          
          <form onSubmit={handleRSVPSubmit} style={{
            maxWidth: '500px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, #fff5f8, #fef8f5)',
            padding: '2.5rem',
            borderRadius: '20px',
            border: '2px solid #ffd4e5'
          }}>
            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <label style={{
                display: 'block',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#a67c94',
                marginBottom: '0.5rem',
                fontWeight: 400
              }}>
                Your Name
              </label>
              <input type="text" name="name" required style={{
                width: '100%',
                padding: '0.9rem 1.2rem',
                border: '2px solid #ffd4e5',
                borderRadius: '10px',
                fontSize: '0.9rem',
                outline: 'none',
                background: '#fff'
              }} />
            </div>
            
            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <label style={{
                display: 'block',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#a67c94',
                marginBottom: '0.5rem',
                fontWeight: 400
              }}>
                Phone Number
              </label>
              <input type="tel" name="phone" style={{
                width: '100%',
                padding: '0.9rem 1.2rem',
                border: '2px solid #ffd4e5',
                borderRadius: '10px',
                fontSize: '0.9rem',
                outline: 'none',
                background: '#fff'
              }} />
            </div>
            
            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <label style={{
                display: 'block',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#a67c94',
                marginBottom: '0.5rem',
                fontWeight: 400
              }}>
                Will You Attend?
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                {['✓ Hadir', '✕ Tidak Hadir', '? Mungkin'].map((opt) => (
                  <div
                    key={opt}
                    onClick={() => setSelectedAttend(opt)}
                    style={{
                      padding: '0.8rem',
                      textAlign: 'center',
                      border: '2px solid #ffd4e5',
                      borderRadius: '10px',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      background: selectedAttend === opt ? '#ff9eb7' : '#fff',
                      color: selectedAttend === opt ? '#fff' : '#a67c94',
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
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#a67c94',
                marginBottom: '0.5rem',
                fontWeight: 400
              }}>
                Number of Guests
              </label>
              <select name="guest_count" style={{
                width: '100%',
                padding: '0.9rem 1.2rem',
                border: '2px solid #ffd4e5',
                borderRadius: '10px',
                fontSize: '0.9rem',
                outline: 'none',
                background: '#fff'
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
              background: 'linear-gradient(135deg, #ff9eb7, #ff6b9d)',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '0.8rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontWeight: 500,
              boxShadow: '0 5px 15px rgba(255,107,157,0.3)'
            }}>
              Send RSVP
            </button>
          </form>
        </section>

        {/* WISHES */}
        <section style={{
          background: 'linear-gradient(to bottom, #fef8f5, #fff5f8)',
          padding: '6rem 2rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '2rem',
            marginBottom: '1rem'
          }}>🌺</div>
          
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontFamily: "'Great Vibes', cursive",
            color: '#ff6b9d',
            marginBottom: '3rem'
          }}>
            Your Wishes
          </h2>
          
          <form onSubmit={handleWishSubmit} style={{
            maxWidth: '600px',
            margin: '0 auto 3rem',
            background: '#fff',
            padding: '2rem',
            borderRadius: '20px',
            border: '2px solid #ffd4e5'
          }}>
            <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
              <label style={{
                display: 'block',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#a67c94',
                marginBottom: '0.5rem',
                fontWeight: 400
              }}>
                Your Name
              </label>
              <input 
                type="text" 
                value={wishName}
                onChange={(e) => setWishName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  border: '2px solid #ffd4e5',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  outline: 'none'
                }} 
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <label style={{
                display: 'block',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#a67c94',
                marginBottom: '0.5rem',
                fontWeight: 400
              }}>
                Your Message
              </label>
              <textarea 
                value={wishMessage}
                onChange={(e) => setWishMessage(e.target.value)}
                required
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  border: '2px solid #ffd4e5',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  outline: 'none',
                  resize: 'vertical'
                }} 
              />
            </div>
            
            <button type="submit" style={{
              width: '100%',
              padding: '0.8rem',
              background: 'linear-gradient(135deg, #ff9eb7, #ff6b9d)',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontWeight: 500
            }}>
              Send Wishes
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
                  border: '2px solid #ffd4e5',
                  borderRadius: '15px',
                  padding: '1.8rem',
                  textAlign: 'left'
                }}>
                  <div style={{
                    fontWeight: 500,
                    color: '#ff6b9d',
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem'
                  }}>
                    {wish.name} 🌸
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#666',
                    lineHeight: 1.8
                  }}>
                    {wish.message}
                  </div>
                  <div style={{
                    fontSize: '0.7rem',
                    color: '#a67c94',
                    marginTop: '0.8rem'
                  }}>
                    {new Date(wish.created_at).toLocaleDateString('id-ID')}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: '#a67c94', fontSize: '0.9rem' }}>
                Be the first to send your wishes! 💐
              </div>
            )}
          </div>
        </section>

        {/* CLOSING */}
        <section style={{
          background: 'linear-gradient(135deg, #ffd4e5 0%, #ffe8f0 100%)',
          padding: '8rem 2rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1.5rem'
          }}>🌼</div>
          
          <div style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            color: '#ff6b9d',
            marginBottom: '1.5rem'
          }}>
            Thank You
          </div>
          
          <p style={{
            fontSize: '1rem',
            color: '#a67c94',
            maxWidth: '400px',
            margin: '0 auto 2rem',
            lineHeight: 1.9,
            fontWeight: 300
          }}>
            We can't wait to celebrate this special day with you
          </p>
          
          <div style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: '2rem',
            color: '#ff6b9d'
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
              background: 'linear-gradient(135deg, #ff9eb7, #ff6b9d)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 5px 20px rgba(255,107,157,0.4)',
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