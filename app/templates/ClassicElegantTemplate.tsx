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

export default function ClassicElegantTemplate({
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
      background: '#F5F0E8',
      fontFamily: "'Lora', serif",
      color: '#333'
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
            background: '#D4A843',
            border: 'none',
            boxShadow: '0 4px 20px rgba(212,168,67,0.4)',
            cursor: 'pointer',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            transition: 'transform 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Music className={`w-6 h-6 ${isPlaying ? 'animate-pulse' : ''}`} />
        </button>
      )}

      {/* Hero Section - Full Width Image */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: invitation.photos && invitation.photos[0] 
            ? `url(${invitation.photos[0]})` 
            : 'linear-gradient(135deg, #D4A843 0%, #C9A557 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)'
        }}></div>

        {/* Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.3)'
        }}></div>

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          color: '#FFFFFF',
          padding: '2rem'
        }}>
          <p style={{
            fontSize: '0.9rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
            opacity: 0.9
          }}>
            The Wedding Celebration of
          </p>

          <h1 style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(3.5rem, 12vw, 7rem)',
            fontWeight: 400,
            marginBottom: '1.5rem',
            lineHeight: 1.2,
            textShadow: '0 2px 20px rgba(0,0,0,0.3)'
          }}>
            {invitation.bride_name} & {invitation.groom_name}
          </h1>

          <div style={{
            fontSize: '1rem',
            letterSpacing: '0.2em',
            opacity: 0.95,
            textTransform: 'uppercase'
          }}>
            {invitation.resepsi_date}
          </div>
        </div>
      </section>

      {/* Our Love Story - Vertical Timeline */}
      <section style={{
        padding: '6rem 2rem',
        background: '#FDFCF9'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '5rem'
          }}>
            <p style={{
              fontSize: '0.75rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#999',
              marginBottom: '1rem'
            }}>
              How It All Began
            </p>
            <h2 style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: '3.5rem',
              color: '#D4A843',
              fontWeight: 400
            }}>
              Our Love Story
            </h2>
          </div>

          {/* Timeline */}
          <div style={{ position: 'relative' }}>
            {/* Vertical Line */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '1px',
              background: '#D4A843',
              transform: 'translateX(-50%)',
              opacity: 0.3
            }}></div>

            {/* Timeline Items */}
            {[
              {
                date: 'JUNE 2020',
                title: 'First Meeting',
                description: `We met at a mutual friend's wedding ceremony in January. A beautiful day for the first time we saw each other and started our conversation.`
              },
              {
                date: 'DECEMBER 2021',
                title: 'First Date',
                description: 'A candlelit dinner at a rooftop restaurant became our first official date. We talked until the stars came out, and we knew this was something special.'
              },
              {
                date: 'AUGUST 2023',
                title: 'Moving In Together',
                description: `We decided to build a home together. Ballin calls brings laughter, and we can't stop the wave of laughter from each other.`
              },
              {
                date: 'AUGUST 2025',
                title: 'The Proposal',
                description: `Under a canopy of fairy lights, with our favorite song playing, the question was asked and the answer was yes. The first beautiful start of our journey into forever.`
              }
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  marginBottom: '4rem',
                  paddingLeft: index % 2 === 0 ? '0' : '52%',
                  paddingRight: index % 2 === 0 ? '52%' : '0',
                  textAlign: index % 2 === 0 ? 'right' : 'left'
                }}
              >
                {/* Gold Dot */}
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: '0.5rem',
                  width: '14px',
                  height: '14px',
                  background: '#D4A843',
                  borderRadius: '50%',
                  transform: 'translateX(-50%)',
                  border: '3px solid #F5F0E8',
                  zIndex: 1
                }}></div>

                <div style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  color: '#D4A843',
                  marginBottom: '0.75rem',
                  fontWeight: 600
                }}>
                  {item.date}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  color: '#333',
                  marginBottom: '0.75rem',
                  fontWeight: 600
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#666',
                  lineHeight: 1.8
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Events - Card Layout */}
      <section style={{
        padding: '6rem 2rem',
        background: '#F5F0E8'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '5rem'
          }}>
            <p style={{
              fontSize: '0.75rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#999',
              marginBottom: '1rem'
            }}>
              Save The Date
            </p>
            <h2 style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: '3.5rem',
              color: '#D4A843',
              fontWeight: 400
            }}>
              Wedding Events
            </h2>
          </div>

          {/* Event Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem'
          }}>
            {/* Holy Matrimony / Akad */}
            <div style={{
              background: '#FFFFFF',
              padding: '3rem 2.5rem',
              textAlign: 'center',
              boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
              borderRadius: '4px'
            }}>
              <h3 style={{
                fontSize: '1.75rem',
                color: '#333',
                marginBottom: '2rem',
                fontWeight: 600
              }}>
                Holy Matrimony
              </h3>

              <div style={{
                marginBottom: '1.5rem',
                paddingBottom: '1.5rem',
                borderBottom: '1px solid #E8E3DA'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.75rem',
                  color: '#D4A843'
                }}>
                  <Calendar className="w-5 h-5" />
                  <span style={{ fontSize: '0.95rem' }}>{invitation.akad_date}</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  color: '#666'
                }}>
                  <Clock className="w-4 h-4" />
                  <span style={{ fontSize: '0.9rem' }}>{invitation.akad_time}</span>
                </div>
              </div>

              <div style={{
                fontSize: '0.95rem',
                color: '#333',
                lineHeight: 1.8
              }}>
                <strong>{invitation.akad_venue}</strong>
                <div style={{
                  display: 'flex',
                  alignItems: 'start',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginTop: '0.75rem',
                  color: '#666',
                  fontSize: '0.85rem'
                }}>
                  <MapPin className="w-4 h-4" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                  <span>{invitation.akad_address}</span>
                </div>
              </div>
            </div>

            {/* Wedding Reception / Resepsi */}
            <div style={{
              background: '#FFFFFF',
              padding: '3rem 2.5rem',
              textAlign: 'center',
              boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
              borderRadius: '4px'
            }}>
              <h3 style={{
                fontSize: '1.75rem',
                color: '#333',
                marginBottom: '2rem',
                fontWeight: 600
              }}>
                Wedding Reception
              </h3>

              <div style={{
                marginBottom: '1.5rem',
                paddingBottom: '1.5rem',
                borderBottom: '1px solid #E8E3DA'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.75rem',
                  color: '#D4A843'
                }}>
                  <Calendar className="w-5 h-5" />
                  <span style={{ fontSize: '0.95rem' }}>{invitation.resepsi_date}</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  color: '#666'
                }}>
                  <Clock className="w-4 h-4" />
                  <span style={{ fontSize: '0.9rem' }}>{invitation.resepsi_time}</span>
                </div>
              </div>

              <div style={{
                fontSize: '0.95rem',
                color: '#333',
                lineHeight: 1.8
              }}>
                <strong>{invitation.resepsi_venue}</strong>
                <div style={{
                  display: 'flex',
                  alignItems: 'start',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginTop: '0.75rem',
                  color: '#666',
                  fontSize: '0.85rem'
                }}>
                  <MapPin className="w-4 h-4" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
                  <span>{invitation.resepsi_address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Big Day - Countdown */}
      <section style={{
        padding: '6rem 2rem',
        background: '#FDFCF9',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{
            fontSize: '0.75rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#999',
            marginBottom: '1rem'
          }}>
            Counting Down To
          </p>
          <h2 style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: '3.5rem',
            color: '#D4A843',
            marginBottom: '4rem',
            fontWeight: 400
          }}>
            The Big Day
          </h2>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            {[
              { value: countdown.days, label: 'Days' },
              { value: countdown.hours, label: 'Hours' },
              { value: countdown.mins, label: 'Minutes' },
              { value: countdown.secs, label: 'Seconds' }
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  background: '#FFFFFF',
                  padding: '2rem 2.5rem',
                  minWidth: '140px',
                  boxShadow: '0 2px 15px rgba(0,0,0,0.06)',
                  borderRadius: '4px'
                }}
              >
                <div style={{
                  fontSize: '3.5rem',
                  fontWeight: 300,
                  color: '#333',
                  marginBottom: '0.5rem',
                  fontFamily: "'Lora', serif"
                }}>
                  {String(item.value).padStart(2, '0')}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#999'
                }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Gallery - 6 Photos Grid */}
      {invitation.photos && invitation.photos.length > 0 && (
        <section style={{
          padding: '6rem 2rem',
          background: '#F5F0E8'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '5rem'
            }}>
              <p style={{
                fontSize: '0.75rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#999',
                marginBottom: '1rem'
              }}>
                Captured Moments
              </p>
              <h2 style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: '3.5rem',
                color: '#D4A843',
                fontWeight: 400
              }}>
                Our Gallery
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {invitation.photos.slice(0, 6).map((photo: string, index: number) => (
                <div
                  key={index}
                  style={{
                    position: 'relative',
                    paddingBottom: '100%',
                    overflow: 'hidden',
                    background: '#FFFFFF',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                  }}
                >
                  <img
                    src={photo}
                    alt={`Gallery ${index + 1}`}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RSVP Form */}
      <section style={{
        padding: '6rem 2rem',
        background: '#FDFCF9'
      }}>
        <div style={{ maxWidth: '650px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            <p style={{
              fontSize: '0.75rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#999',
              marginBottom: '1rem'
            }}>
              Join Us
            </p>
            <h2 style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: '3.5rem',
              color: '#D4A843',
              marginBottom: '1rem',
              fontWeight: 400
            }}>
              RSVP
            </h2>
            <p style={{
              color: '#666',
              fontSize: '1rem'
            }}>
              Kindly respond by {invitation.resepsi_date}
            </p>
          </div>

          <form onSubmit={handleRSVPSubmit} style={{
            background: '#FFFFFF',
            padding: '3rem',
            boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
            borderRadius: '4px'
          }}>
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: '#333',
                fontSize: '0.9rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Your Name
              </label>
              <input
                type="text"
                name="name"
                required
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '1px solid #D8D3C8',
                  borderRadius: '2px',
                  fontSize: '1rem',
                  outline: 'none',
                  background: '#FDFCF9'
                }}
                onFocus={(e) => e.target.style.borderColor = '#D4A843'}
                onBlur={(e) => e.target.style.borderColor = '#D8D3C8'}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: '#333',
                fontSize: '0.9rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '1px solid #D8D3C8',
                  borderRadius: '2px',
                  fontSize: '1rem',
                  outline: 'none',
                  background: '#FDFCF9'
                }}
                onFocus={(e) => e.target.style.borderColor = '#D4A843'}
                onBlur={(e) => e.target.style.borderColor = '#D8D3C8'}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: '#333',
                fontSize: '0.9rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Attendance
              </label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {['✓ Hadir', '✕ Tidak Hadir'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedAttend(option)}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      border: '1px solid #D8D3C8',
                      background: selectedAttend === option ? '#D4A843' : '#FFFFFF',
                      color: selectedAttend === option ? '#FFFFFF' : '#666',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
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
                color: '#333',
                fontSize: '0.9rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
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
                  border: '1px solid #D8D3C8',
                  borderRadius: '2px',
                  fontSize: '1rem',
                  outline: 'none',
                  background: '#FDFCF9'
                }}
                onFocus={(e) => e.target.style.borderColor = '#D4A843'}
                onBlur={(e) => e.target.style.borderColor = '#D8D3C8'}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '1.25rem',
                background: '#D4A843',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '2px',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'background 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#C9A557'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#D4A843'}
            >
              Send RSVP
            </button>
          </form>
        </div>
      </section>

      {/* Wishes */}
      <section style={{
        padding: '6rem 2rem',
        background: '#F5F0E8'
      }}>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            <h2 style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: '3.5rem',
              color: '#D4A843',
              fontWeight: 400
            }}>
              Wedding Wishes
            </h2>
          </div>

          {/* Wish Form */}
          <form onSubmit={handleWishSubmit} style={{
            background: '#FFFFFF',
            padding: '3rem',
            boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
            marginBottom: '4rem',
            borderRadius: '4px'
          }}>
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: '#333',
                fontSize: '0.9rem',
                fontWeight: 600
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
                  border: '1px solid #D8D3C8',
                  borderRadius: '2px',
                  fontSize: '1rem',
                  outline: 'none',
                  background: '#FDFCF9'
                }}
                onFocus={(e) => e.target.style.borderColor = '#D4A843'}
                onBlur={(e) => e.target.style.borderColor = '#D8D3C8'}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                color: '#333',
                fontSize: '0.9rem',
                fontWeight: 600
              }}>
                Your Wishes
              </label>
              <textarea
                value={wishMessage}
                onChange={(e) => setWishMessage(e.target.value)}
                required
                rows={5}
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '1px solid #D8D3C8',
                  borderRadius: '2px',
                  fontSize: '1rem',
                  outline: 'none',
                  resize: 'vertical',
                  background: '#FDFCF9'
                }}
                onFocus={(e) => e.target.style.borderColor = '#D4A843'}
                onBlur={(e) => e.target.style.borderColor = '#D8D3C8'}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '1.25rem',
                background: '#D4A843',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '2px',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer'
              }}
            >
              Send Wishes
            </button>
          </form>

          {/* Wishes List */}
          <div style={{ display: 'grid', gap: '2rem' }}>
            {wishes.map((wish) => (
              <div
                key={wish.id}
                style={{
                  background: '#FFFFFF',
                  padding: '2rem',
                  boxShadow: '0 2px 15px rgba(0,0,0,0.06)',
                  borderRadius: '4px'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #E8E3DA'
                }}>
                  <strong style={{
                    color: '#333',
                    fontSize: '1.05rem'
                  }}>
                    {wish.name}
                  </strong>
                  <span style={{
                    fontSize: '0.85rem',
                    color: '#999'
                  }}>
                    {new Date(wish.created_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <p style={{
                  color: '#666',
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
        padding: '4rem 2rem',
        background: '#2C2C2C',
        textAlign: 'center',
        color: '#FFFFFF'
      }}>
        <p style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: '3rem',
          marginBottom: '1rem',
          color: '#D4A843'
        }}>
          {invitation.bride_name} & {invitation.groom_name}
        </p>
        <p style={{
          fontSize: '0.85rem',
          opacity: 0.6,
          letterSpacing: '0.1em'
        }}>
          {invitation.resepsi_date}
        </p>
        <div style={{
          width: '60px',
          height: '1px',
          background: '#D4A843',
          margin: '2rem auto',
          opacity: 0.5
        }}></div>
        <p style={{
          fontSize: '0.75rem',
          opacity: 0.5
        }}>
          Made with ♥ by kaundang.id
        </p>
      </footer>
    </div>
  )
}