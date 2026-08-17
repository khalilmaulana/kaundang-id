'use client'
import { Music, MapPin, Calendar, Clock, Heart } from 'lucide-react'

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
    <div style={{
      minHeight: '100vh',
      background: '#FFF5F7',
      fontFamily: "'Playfair Display', serif"
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
            background: 'linear-gradient(135deg, #E8B4B8, #C48B9F)',
            border: '3px solid #FFF',
            boxShadow: '0 4px 20px rgba(228,180,184,0.4)',
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'linear-gradient(180deg, #FFF5F7 0%, #FFEEF1 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Floral Decorations */}
        <div style={{
          position: 'absolute',
          top: '5%',
          left: '5%',
          fontSize: '4rem',
          opacity: 0.15,
          transform: 'rotate(-15deg)'
        }}>🌸</div>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '8%',
          fontSize: '3rem',
          opacity: 0.15,
          transform: 'rotate(25deg)'
        }}>🌺</div>
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '10%',
          fontSize: '2.5rem',
          opacity: 0.1
        }}>🌹</div>

        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{ width: '50px', height: '1px', background: '#E8B4B8' }}></div>
            <Heart className="w-5 h-5" style={{ color: '#E8B4B8', fill: '#E8B4B8' }} />
            <div style={{ width: '50px', height: '1px', background: '#E8B4B8' }}></div>
          </div>

          <p style={{
            fontSize: '1rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#C48B9F',
            marginBottom: '2rem',
            fontWeight: 400
          }}>
            Together with our families
          </p>

          <h1 style={{
            fontFamily: "'Sacramento', cursive",
            fontSize: 'clamp(3.5rem, 12vw, 7rem)',
            fontWeight: 400,
            color: '#E8B4B8',
            marginBottom: '1rem',
            lineHeight: 1.1
          }}>
            {invitation.bride_name}
            <br />
            <span style={{ fontSize: '0.5em', fontFamily: "'Playfair Display', serif" }}>&</span>
            <br />
            {invitation.groom_name}
          </h1>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            margin: '2rem 0'
          }}>
            <div style={{ width: '80px', height: '1px', background: 'linear-gradient(90deg, transparent, #E8B4B8)' }}></div>
            <span style={{ fontSize: '1.5rem' }}>✿</span>
            <div style={{ width: '80px', height: '1px', background: 'linear-gradient(270deg, transparent, #E8B4B8)' }}></div>
          </div>

          <p style={{
            fontSize: '1.125rem',
            color: '#C48B9F',
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
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            <span style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'block' }}>🌸</span>
            <h2 style={{
              fontFamily: "'Sacramento', cursive",
              fontSize: '3rem',
              color: '#E8B4B8',
              marginBottom: '1rem'
            }}>
              Our Love Story
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem'
          }}>
            {/* Bride */}
            <div style={{
              textAlign: 'center',
              padding: '2.5rem',
              background: 'linear-gradient(135deg, #FFF5F7 0%, #FFEEF1 100%)',
              borderRadius: '24px',
              border: '2px solid rgba(232,180,184,0.2)'
            }}>
              <div style={{
                width: '100px',
                height: '100px',
                margin: '0 auto 1.5rem',
                background: 'linear-gradient(135deg, #E8B4B8, #C48B9F)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                color: '#FFF',
                border: '4px solid #FFFFFF',
                boxShadow: '0 4px 20px rgba(232,180,184,0.3)'
              }}>
                👰
              </div>
              <h3 style={{
                fontFamily: "'Sacramento', cursive",
                fontSize: '3rem',
                color: '#E8B4B8',
                marginBottom: '0.5rem'
              }}>
                {invitation.bride_name}
              </h3>
              <p style={{
                fontSize: '1.05rem',
                color: '#C48B9F',
                marginBottom: '1rem',
                fontStyle: 'italic'
              }}>
                {invitation.bride_fullname}
              </p>
              <div style={{
                fontSize: '0.95rem',
                color: '#A07B8E',
                lineHeight: 1.8
              }}>
                <span style={{ opacity: 0.7 }}>Beloved daughter of</span>
                <br />
                <strong style={{ color: '#C48B9F' }}>{invitation.bride_parents}</strong>
              </div>
            </div>

            {/* Groom */}
            <div style={{
              textAlign: 'center',
              padding: '2.5rem',
              background: 'linear-gradient(135deg, #FFF5F7 0%, #FFEEF1 100%)',
              borderRadius: '24px',
              border: '2px solid rgba(232,180,184,0.2)'
            }}>
              <div style={{
                width: '100px',
                height: '100px',
                margin: '0 auto 1.5rem',
                background: 'linear-gradient(135deg, #E8B4B8, #C48B9F)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                color: '#FFF',
                border: '4px solid #FFFFFF',
                boxShadow: '0 4px 20px rgba(232,180,184,0.3)'
              }}>
                🤵
              </div>
              <h3 style={{
                fontFamily: "'Sacramento', cursive",
                fontSize: '3rem',
                color: '#E8B4B8',
                marginBottom: '0.5rem'
              }}>
                {invitation.groom_name}
              </h3>
              <p style={{
                fontSize: '1.05rem',
                color: '#C48B9F',
                marginBottom: '1rem',
                fontStyle: 'italic'
              }}>
                {invitation.groom_fullname}
              </p>
              <div style={{
                fontSize: '0.95rem',
                color: '#A07B8E',
                lineHeight: 1.8
              }}>
                <span style={{ opacity: 0.7 }}>Beloved son of</span>
                <br />
                <strong style={{ color: '#C48B9F' }}>{invitation.groom_parents}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section style={{
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #E8B4B8, #C48B9F)',
        textAlign: 'center',
        color: '#FFFFFF'
      }}>
        <span style={{ fontSize: '2rem', marginBottom: '1rem', display: 'block' }}>💕</span>
        <h2 style={{
          fontFamily: "'Sacramento', cursive",
          fontSize: '3.5rem',
          marginBottom: '2rem',
          fontWeight: 400
        }}>
          Counting the Days
        </h2>
        
        <div style={{
          display: 'flex',
          gap: '1.5rem',
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
              background: 'rgba(255,255,255,0.25)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '2rem 1.5rem',
              minWidth: '110px',
              border: '2px solid rgba(255,255,255,0.3)'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 400,
                marginBottom: '0.5rem',
                fontFamily: "'Playfair Display', serif"
              }}>
                {String(item.value).padStart(2, '0')}
              </div>
              <div style={{
                fontSize: '0.85rem',
                textTransform: 'capitalize',
                letterSpacing: '0.15em',
                opacity: 0.95
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
        background: '#FFF5F7'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            <span style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'block' }}>🌺</span>
            <h2 style={{
              fontFamily: "'Sacramento', cursive",
              fontSize: '3.5rem',
              color: '#E8B4B8'
            }}>
              When & Where
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem'
          }}>
            {/* Akad */}
            <div style={{
              background: '#FFFFFF',
              padding: '2.5rem',
              borderRadius: '24px',
              boxShadow: '0 8px 30px rgba(232,180,184,0.15)',
              border: '1px solid rgba(232,180,184,0.2)'
            }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '2rem'
              }}>
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>💍</span>
                <h3 style={{
                  fontSize: '1.75rem',
                  color: '#E8B4B8',
                  fontWeight: 400
                }}>
                  Wedding Ceremony
                </h3>
              </div>
              
              <div style={{ color: '#A07B8E', lineHeight: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <Calendar className="w-5 h-5" style={{ color: '#E8B4B8', flexShrink: 0 }} />
                  <span>{invitation.akad_date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <Clock className="w-5 h-5" style={{ color: '#E8B4B8', flexShrink: 0 }} />
                  <span>{invitation.akad_time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                  <MapPin className="w-5 h-5" style={{ color: '#E8B4B8', flexShrink: 0, marginTop: '0.25rem' }} />
                  <div>
                    <strong style={{ color: '#C48B9F' }}>{invitation.akad_venue}</strong>
                    <br />
                    <span style={{ fontSize: '0.9rem' }}>{invitation.akad_address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Resepsi */}
            <div style={{
              background: '#FFFFFF',
              padding: '2.5rem',
              borderRadius: '24px',
              boxShadow: '0 8px 30px rgba(232,180,184,0.15)',
              border: '1px solid rgba(232,180,184,0.2)'
            }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '2rem'
              }}>
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>🎊</span>
                <h3 style={{
                  fontSize: '1.75rem',
                  color: '#E8B4B8',
                  fontWeight: 400
                }}>
                  Reception
                </h3>
              </div>
              
              <div style={{ color: '#A07B8E', lineHeight: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <Calendar className="w-5 h-5" style={{ color: '#E8B4B8', flexShrink: 0 }} />
                  <span>{invitation.resepsi_date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <Clock className="w-5 h-5" style={{ color: '#E8B4B8', flexShrink: 0 }} />
                  <span>{invitation.resepsi_time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                  <MapPin className="w-5 h-5" style={{ color: '#E8B4B8', flexShrink: 0, marginTop: '0.25rem' }} />
                  <div>
                    <strong style={{ color: '#C48B9F' }}>{invitation.resepsi_venue}</strong>
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
          background: '#FFFFFF'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '4rem'
            }}>
              <span style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'block' }}>🌸</span>
              <h2 style={{
                fontFamily: "'Sacramento', cursive",
                fontSize: '3.5rem',
                color: '#E8B4B8'
              }}>
                Our Gallery
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '2rem'
            }}>
              {invitation.photos.map((photo: string, index: number) => (
                <div key={index} style={{
                  position: 'relative',
                  paddingBottom: '100%',
                  overflow: 'hidden',
                  borderRadius: '20px',
                  boxShadow: '0 8px 30px rgba(232,180,184,0.2)',
                  border: '4px solid #FFF5F7'
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
        background: '#FFF5F7'
      }}>
        <div style={{ maxWidth: '650px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <span style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'block' }}>💌</span>
            <h2 style={{
              fontFamily: "'Sacramento', cursive",
              fontSize: '3.5rem',
              color: '#E8B4B8',
              marginBottom: '0.5rem'
            }}>
              RSVP
            </h2>
            <p style={{ color: '#C48B9F', fontSize: '1.05rem' }}>
              We would love to have you celebrate with us
            </p>
          </div>

          <form onSubmit={handleRSVPSubmit} style={{
            background: '#FFFFFF',
            padding: '3rem',
            borderRadius: '24px',
            boxShadow: '0 8px 30px rgba(232,180,184,0.15)',
            border: '1px solid rgba(232,180,184,0.2)'
          }}>
            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: '#C48B9F',
                fontSize: '0.95rem',
                fontWeight: 500
              }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #FFEEF1',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none',
                  background: '#FFF5F7',
                  color: '#A07B8E'
                }}
                onFocus={(e) => e.target.style.borderColor = '#E8B4B8'}
                onBlur={(e) => e.target.style.borderColor = '#FFEEF1'}
              />
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: '#C48B9F',
                fontSize: '0.95rem',
                fontWeight: 500
              }}>
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                name="phone"
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #FFEEF1',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none',
                  background: '#FFF5F7',
                  color: '#A07B8E'
                }}
                onFocus={(e) => e.target.style.borderColor = '#E8B4B8'}
                onBlur={(e) => e.target.style.borderColor = '#FFEEF1'}
              />
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: '#C48B9F',
                fontSize: '0.95rem',
                fontWeight: 500
              }}>
                Will you attend?
              </label>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {['✓ Hadir', '✕ Tidak Hadir', '? Mungkin'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedAttend(option)}
                    style={{
                      flex: 1,
                      minWidth: '100px',
                      padding: '1rem',
                      border: selectedAttend === option ? '2px solid #E8B4B8' : '2px solid #FFEEF1',
                      background: selectedAttend === option ? '#E8B4B8' : '#FFF5F7',
                      color: selectedAttend === option ? '#FFFFFF' : '#C48B9F',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      transition: 'all 0.3s'
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: '#C48B9F',
                fontSize: '0.95rem',
                fontWeight: 500
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
                  padding: '1rem',
                  border: '2px solid #FFEEF1',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none',
                  background: '#FFF5F7',
                  color: '#A07B8E'
                }}
                onFocus={(e) => e.target.style.borderColor = '#E8B4B8'}
                onBlur={(e) => e.target.style.borderColor = '#FFEEF1'}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '1.25rem',
                background: 'linear-gradient(135deg, #E8B4B8, #C48B9F)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.05rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'transform 0.3s',
                boxShadow: '0 4px 15px rgba(232,180,184,0.3)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Send Confirmation
            </button>
          </form>
        </div>
      </section>

      {/* Wishes */}
      <section style={{
        padding: '5rem 2rem',
        background: '#FFFFFF'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            <span style={{ fontSize: '2.5rem', marginBottom: '1rem', display: 'block' }}>🌹</span>
            <h2 style={{
              fontFamily: "'Sacramento', cursive",
              fontSize: '3.5rem',
              color: '#E8B4B8'
            }}>
              Send Your Wishes
            </h2>
          </div>

          {/* Wish Form */}
          <form onSubmit={handleWishSubmit} style={{
            background: 'linear-gradient(135deg, #FFF5F7 0%, #FFEEF1 100%)',
            padding: '3rem',
            borderRadius: '24px',
            marginBottom: '4rem',
            border: '1px solid rgba(232,180,184,0.2)'
          }}>
            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: '#C48B9F',
                fontSize: '0.95rem',
                fontWeight: 500
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
                  padding: '1rem',
                  border: '2px solid rgba(255,255,255,0.5)',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none',
                  background: '#FFFFFF',
                  color: '#A07B8E'
                }}
                onFocus={(e) => e.target.style.borderColor = '#E8B4B8'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.5)'}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: '#C48B9F',
                fontSize: '0.95rem',
                fontWeight: 500
              }}>
                Your Message
              </label>
              <textarea
                value={wishMessage}
                onChange={(e) => setWishMessage(e.target.value)}
                required
                rows={5}
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid rgba(255,255,255,0.5)',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  outline: 'none',
                  resize: 'vertical',
                  background: '#FFFFFF',
                  color: '#A07B8E'
                }}
                onFocus={(e) => e.target.style.borderColor = '#E8B4B8'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.5)'}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '1.25rem',
                background: 'linear-gradient(135deg, #E8B4B8, #C48B9F)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.05rem',
                fontWeight: 500,
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(232,180,184,0.3)'
              }}
            >
              Send Message
            </button>
          </form>

          {/* Wishes List */}
          <div style={{
            display: 'grid',
            gap: '2rem'
          }}>
            {wishes.map((wish) => (
              <div key={wish.id} style={{
                background: '#FFF5F7',
                padding: '2rem',
                borderRadius: '20px',
                borderLeft: '4px solid #E8B4B8',
                boxShadow: '0 4px 15px rgba(232,180,184,0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid rgba(232,180,184,0.2)'
                }}>
                  <strong style={{
                    color: '#E8B4B8',
                    fontSize: '1.1rem',
                    fontFamily: "'Sacramento', cursive"
                  }}>
                    {wish.name}
                  </strong>
                  <span style={{ fontSize: '0.85rem', color: '#C48B9F', opacity: 0.7 }}>
                    {new Date(wish.created_at).toLocaleDateString('id-ID')}
                  </span>
                </div>
                <p style={{
                  color: '#A07B8E',
                  lineHeight: 1.8,
                  fontSize: '1rem',
                  fontStyle: 'italic'
                }}>
                  "{wish.message}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #E8B4B8, #C48B9F)',
        textAlign: 'center',
        color: '#FFFFFF'
      }}>
        <span style={{ fontSize: '2.5rem', marginBottom: '1.5rem', display: 'block' }}>💐</span>
        <p style={{
          fontFamily: "'Sacramento', cursive",
          fontSize: '3rem',
          marginBottom: '1rem'
        }}>
          Thank You
        </p>
        <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem', opacity: 0.95 }}>
          {invitation.bride_name} & {invitation.groom_name}
        </p>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '1rem',
          margin: '1.5rem 0'
        }}>
          <div style={{ width: '50px', height: '1px', background: 'rgba(255,255,255,0.5)' }}></div>
          <Heart className="w-4 h-4" style={{ fill: '#FFFFFF' }} />
          <div style={{ width: '50px', height: '1px', background: 'rgba(255,255,255,0.5)' }}></div>
        </div>
        <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
          With love from kaundang.id
        </p>
      </footer>
    </div>
  )
}