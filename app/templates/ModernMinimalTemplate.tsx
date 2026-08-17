'use client'
import { Music, MapPin, Calendar, Clock } from 'lucide-react'

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
    <div style={{
      minHeight: '100vh',
      background: '#ECF0F1',
      fontFamily: "'Inter', sans-serif",
      color: '#2C3E50'
    }}>
      {/* Music Button */}
      {invitation.music_url && (
        <button
          onClick={toggleMusic}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: '#3498DB',
            border: 'none',
            boxShadow: '0 4px 20px rgba(52,152,219,0.4)',
            cursor: 'pointer',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF'
          }}
        >
          <Music className={`w-6 h-6 ${isPlaying ? 'animate-pulse' : ''}`} />
        </button>
      )}

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(45deg, transparent 30%, rgba(52,152,219,0.1) 50%, transparent 70%)'
        }}></div>

        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, color: '#FFFFFF' }}>
          <p style={{
            fontSize: '0.875rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
            opacity: 0.8
          }}>
            Wedding Invitation
          </p>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 300,
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            {invitation.bride_name}
            <br />
            <span style={{ fontSize: '0.6em', opacity: 0.6 }}>&</span>
            <br />
            {invitation.groom_name}
          </h1>

          <div style={{
            width: '80px',
            height: '2px',
            background: '#3498DB',
            margin: '2rem auto'
          }}></div>

          <p style={{
            fontSize: '1.125rem',
            opacity: 0.9,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            <Calendar className="w-5 h-5" />
            {invitation.resepsi_date}
          </p>
        </div>
      </section>

      {/* Couple Details */}
      <section style={{
        padding: '5rem 2rem',
        background: '#FFFFFF'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem'
          }}>
            {/* Bride */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '120px',
                height: '120px',
                margin: '0 auto 2rem',
                background: 'linear-gradient(135deg, #3498DB, #2980B9)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                color: '#FFFFFF'
              }}>
                👰
              </div>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: 300,
                marginBottom: '0.5rem',
                color: '#2C3E50'
              }}>
                {invitation.bride_name}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#7F8C8D',
                marginBottom: '1rem'
              }}>
                {invitation.bride_fullname}
              </p>
              <div style={{
                fontSize: '0.9rem',
                color: '#95A5A6',
                lineHeight: 1.6
              }}>
                Daughter of
                <br />
                <strong style={{ color: '#2C3E50' }}>{invitation.bride_parents}</strong>
              </div>
            </div>

            {/* Groom */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '120px',
                height: '120px',
                margin: '0 auto 2rem',
                background: 'linear-gradient(135deg, #3498DB, #2980B9)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                color: '#FFFFFF'
              }}>
                🤵
              </div>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: 300,
                marginBottom: '0.5rem',
                color: '#2C3E50'
              }}>
                {invitation.groom_name}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#7F8C8D',
                marginBottom: '1rem'
              }}>
                {invitation.groom_fullname}
              </p>
              <div style={{
                fontSize: '0.9rem',
                color: '#95A5A6',
                lineHeight: 1.6
              }}>
                Son of
                <br />
                <strong style={{ color: '#2C3E50' }}>{invitation.groom_parents}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section style={{
        padding: '4rem 2rem',
        background: '#2C3E50',
        color: '#FFFFFF',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 300,
          marginBottom: '3rem',
          letterSpacing: '0.05em'
        }}>
          TIME UNTIL WE SAY "I DO"
        </h2>
        
        <div style={{
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {[
            { label: 'Days', value: countdown.days },
            { label: 'Hours', value: countdown.hours },
            { label: 'Minutes', value: countdown.mins },
            { label: 'Seconds', value: countdown.secs }
          ].map((item, index) => (
            <div key={index} style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '4px',
              padding: '2rem 1.5rem',
              minWidth: '120px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: 700,
                marginBottom: '0.5rem',
                fontFamily: 'monospace'
              }}>
                {String(item.value).padStart(2, '0')}
              </div>
              <div style={{
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                opacity: 0.8
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Event Details */}
      <section style={{
        padding: '5rem 2rem',
        background: '#FFFFFF'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 300,
            textAlign: 'center',
            marginBottom: '4rem',
            letterSpacing: '0.05em',
            color: '#2C3E50'
          }}>
            EVENT DETAILS
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '3rem'
          }}>
            {/* Akad */}
            <div style={{
              padding: '2.5rem',
              background: '#ECF0F1',
              borderLeft: '4px solid #3498DB'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 400,
                marginBottom: '2rem',
                color: '#2C3E50'
              }}>
                Wedding Ceremony
              </h3>
              <div style={{ color: '#7F8C8D', lineHeight: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <Calendar className="w-5 h-5" style={{ color: '#3498DB' }} />
                  <span>{invitation.akad_date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <Clock className="w-5 h-5" style={{ color: '#3498DB' }} />
                  <span>{invitation.akad_time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                  <MapPin className="w-5 h-5" style={{ color: '#3498DB', marginTop: '0.25rem' }} />
                  <div>
                    <strong style={{ color: '#2C3E50' }}>{invitation.akad_venue}</strong>
                    <br />
                    <span style={{ fontSize: '0.9rem' }}>{invitation.akad_address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Resepsi */}
            <div style={{
              padding: '2.5rem',
              background: '#ECF0F1',
              borderLeft: '4px solid #3498DB'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 400,
                marginBottom: '2rem',
                color: '#2C3E50'
              }}>
                Reception
              </h3>
              <div style={{ color: '#7F8C8D', lineHeight: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <Calendar className="w-5 h-5" style={{ color: '#3498DB' }} />
                  <span>{invitation.resepsi_date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <Clock className="w-5 h-5" style={{ color: '#3498DB' }} />
                  <span>{invitation.resepsi_time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                  <MapPin className="w-5 h-5" style={{ color: '#3498DB', marginTop: '0.25rem' }} />
                  <div>
                    <strong style={{ color: '#2C3E50' }}>{invitation.resepsi_venue}</strong>
                    <br />
                    <span style={{ fontSize: '0.9rem' }}>{invitation.resepsi_address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      {invitation.photos && invitation.photos.length > 0 && (
        <section style={{
          padding: '5rem 2rem',
          background: '#F8F9FA'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 300,
              textAlign: 'center',
              marginBottom: '4rem',
              letterSpacing: '0.05em',
              color: '#2C3E50'
            }}>
              GALLERY
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {invitation.photos.map((photo: string, index: number) => (
                <div key={index} style={{
                  position: 'relative',
                  paddingBottom: '100%',
                  overflow: 'hidden',
                  background: '#FFFFFF',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RSVP */}
      <section style={{
        padding: '5rem 2rem',
        background: '#FFFFFF'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 300,
            textAlign: 'center',
            marginBottom: '1rem',
            letterSpacing: '0.05em',
            color: '#2C3E50'
          }}>
            RSVP
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#7F8C8D',
            marginBottom: '3rem'
          }}>
            Please confirm your attendance
          </p>

          <form onSubmit={handleRSVPSubmit} style={{
            background: '#F8F9FA',
            padding: '2.5rem',
            borderLeft: '4px solid #3498DB'
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#2C3E50',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '1px solid #BDC3C7',
                  background: '#FFFFFF',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#2C3E50',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Phone (Optional)
              </label>
              <input
                type="tel"
                name="phone"
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '1px solid #BDC3C7',
                  background: '#FFFFFF',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#2C3E50',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Attendance
              </label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {['✓ Hadir', '✕ Tidak Hadir', '? Mungkin'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedAttend(option)}
                    style={{
                      flex: 1,
                      padding: '0.875rem',
                      border: selectedAttend === option ? '2px solid #3498DB' : '1px solid #BDC3C7',
                      background: selectedAttend === option ? '#3498DB' : '#FFFFFF',
                      color: selectedAttend === option ? '#FFFFFF' : '#2C3E50',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      transition: 'all 0.3s'
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#2C3E50',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Number of Guests
              </label>
              <input
                type="number"
                name="guest_count"
                defaultValue={1}
                min={1}
                max={5}
                required
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '1px solid #BDC3C7',
                  background: '#FFFFFF',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '1rem',
                background: '#3498DB',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                transition: 'background 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#2980B9'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#3498DB'}
            >
              Submit Confirmation
            </button>
          </form>
        </div>
      </section>

      {/* Wishes */}
      <section style={{
        padding: '5rem 2rem',
        background: '#F8F9FA'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 300,
            textAlign: 'center',
            marginBottom: '3rem',
            letterSpacing: '0.05em',
            color: '#2C3E50'
          }}>
            WISHES
          </h2>

          <form onSubmit={handleWishSubmit} style={{
            background: '#FFFFFF',
            padding: '2.5rem',
            marginBottom: '3rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#2C3E50',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
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
                  padding: '0.875rem',
                  border: '1px solid #BDC3C7',
                  background: '#FFFFFF',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#2C3E50',
                fontSize: '0.875rem',
                textTransform: '0.1em'
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
                  padding: '0.875rem',
                  border: '1px solid #BDC3C7',
                  background: '#FFFFFF',
                  fontSize: '1rem',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '1rem',
                background: '#3498DB',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'pointer'
              }}
            >
              Send Message
            </button>
          </form>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {wishes.map((wish) => (
              <div key={wish.id} style={{
                background: '#FFFFFF',
                padding: '2rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #ECF0F1'
                }}>
                  <strong style={{ color: '#2C3E50', textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.05em' }}>
                    {wish.name}
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: '#95A5A6' }}>
                    {new Date(wish.created_at).toLocaleDateString('en-US')}
                  </span>
                </div>
                <p style={{
                  color: '#7F8C8D',
                  lineHeight: 1.8,
                  fontSize: '0.95rem'
                }}>
                  {wish.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '3rem 2rem',
        background: '#2C3E50',
        textAlign: 'center',
        color: '#FFFFFF'
      }}>
        <p style={{
          fontSize: '1.5rem',
          fontWeight: 300,
          marginBottom: '0.5rem',
          letterSpacing: '0.05em'
        }}>
          {invitation.bride_name} & {invitation.groom_name}
        </p>
        <p style={{ fontSize: '0.875rem', opacity: 0.6, marginTop: '1rem' }}>
          Powered by kaundang.id
        </p>
      </footer>
    </div>
  )
}