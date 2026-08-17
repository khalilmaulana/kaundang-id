'use client'
import { Music, MapPin, Calendar, Clock, Gift } from 'lucide-react'

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
    <div style={{
      minHeight: '100vh',
      background: '#FAF6EE',
      fontFamily: "'Lora', serif"
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
            background: 'linear-gradient(135deg, #D4A843, #C9A557)',
            border: '3px solid #FAF6EE',
            boxShadow: '0 4px 20px rgba(201,165,87,0.4)',
            cursor: 'pointer',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s',
            color: '#FAF6EE'
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
        background: 'linear-gradient(180deg, #FAF6EE 0%, #F5EFE0 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '100px',
          height: '100px',
          border: '2px solid rgba(201,165,87,0.2)',
          borderRadius: '50%',
          transform: 'rotate(45deg)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '15%',
          right: '15%',
          width: '80px',
          height: '80px',
          border: '2px solid rgba(201,165,87,0.2)',
          borderRadius: '50%'
        }}></div>

        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p style={{
            fontSize: '0.9rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#C9A557',
            marginBottom: '2rem',
            fontWeight: 500
          }}>
            The Wedding of
          </p>

          <h1 style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(3rem, 10vw, 6rem)',
            fontWeight: 400,
            background: 'linear-gradient(135deg, #D4A843, #C9A557)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
            lineHeight: 1.2
          }}>
            {invitation.bride_name} & {invitation.groom_name}
          </h1>

          <div style={{
            width: '150px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #C9A557, transparent)',
            margin: '2rem auto'
          }}></div>

          <p style={{
            fontSize: '1.1rem',
            color: '#8B7355',
            marginTop: '1.5rem',
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
        padding: '4rem 2rem',
        background: '#FAF6EE'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem'
          }}>
            {/* Bride */}
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              background: '#FFFFFF',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              border: '1px solid rgba(201,165,87,0.2)'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 1.5rem',
                background: 'linear-gradient(135deg, #D4A843, #C9A557)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                color: '#FAF6EE'
              }}>
                👰
              </div>
              <h3 style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: '2.5rem',
                color: '#D4A843',
                marginBottom: '0.5rem'
              }}>
                {invitation.bride_name}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#8B7355',
                marginBottom: '1rem',
                fontWeight: 500
              }}>
                {invitation.bride_fullname}
              </p>
              <div style={{
                fontSize: '0.9rem',
                color: '#A0826D',
                lineHeight: 1.6
              }}>
                Putri dari
                <br />
                <strong>{invitation.bride_parents}</strong>
              </div>
            </div>

            {/* Groom */}
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              background: '#FFFFFF',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              border: '1px solid rgba(201,165,87,0.2)'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 1.5rem',
                background: 'linear-gradient(135deg, #D4A843, #C9A557)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
                color: '#FAF6EE'
              }}>
                🤵
              </div>
              <h3 style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: '2.5rem',
                color: '#D4A843',
                marginBottom: '0.5rem'
              }}>
                {invitation.groom_name}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#8B7355',
                marginBottom: '1rem',
                fontWeight: 500
              }}>
                {invitation.groom_fullname}
              </p>
              <div style={{
                fontSize: '0.9rem',
                color: '#A0826D',
                lineHeight: 1.6
              }}>
                Putra dari
                <br />
                <strong>{invitation.groom_parents}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section style={{
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #D4A843, #C9A557)',
        textAlign: 'center',
        color: '#FAF6EE'
      }}>
        <h2 style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: '3rem',
          marginBottom: '2rem',
          fontWeight: 400
        }}>
          Counting Down
        </h2>
        
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {[
            { label: 'Hari', value: countdown.days },
            { label: 'Jam', value: countdown.hours },
            { label: 'Menit', value: countdown.mins },
            { label: 'Detik', value: countdown.secs }
          ].map((item, index) => (
            <div key={index} style={{
              background: 'rgba(250,246,238,0.2)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '1.5rem',
              minWidth: '100px',
              border: '1px solid rgba(250,246,238,0.3)'
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                marginBottom: '0.5rem'
              }}>
                {String(item.value).padStart(2, '0')}
              </div>
              <div style={{
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                opacity: 0.9
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Event Details */}
      <section style={{
        padding: '4rem 2rem',
        background: '#FAF6EE'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: '3rem',
            textAlign: 'center',
            color: '#D4A843',
            marginBottom: '3rem'
          }}>
            Waktu & Tempat
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {/* Akad */}
            <div style={{
              background: '#FFFFFF',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              border: '1px solid rgba(201,165,87,0.2)'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                color: '#D4A843',
                marginBottom: '1.5rem',
                fontWeight: 600,
                textAlign: 'center'
              }}>
                💍 Akad Nikah
              </h3>
              <div style={{ color: '#8B7355', lineHeight: 1.8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Calendar className="w-5 h-5 text-[#C9A557]" style={{ flexShrink: 0 }} />
                  <span>{invitation.akad_date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Clock className="w-5 h-5 text-[#C9A557]" style={{ flexShrink: 0 }} />
                  <span>{invitation.akad_time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                  <MapPin className="w-5 h-5 text-[#C9A557]" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                  <div>
                    <strong>{invitation.akad_venue}</strong>
                    <br />
                    {invitation.akad_address}
                  </div>
                </div>
              </div>
            </div>

            {/* Resepsi */}
            <div style={{
              background: '#FFFFFF',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              border: '1px solid rgba(201,165,87,0.2)'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                color: '#D4A843',
                marginBottom: '1.5rem',
                fontWeight: 600,
                textAlign: 'center'
              }}>
                🎉 Resepsi
              </h3>
              <div style={{ color: '#8B7355', lineHeight: 1.8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Calendar className="w-5 h-5 text-[#C9A557]" style={{ flexShrink: 0 }} />
                  <span>{invitation.resepsi_date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Clock className="w-5 h-5 text-[#C9A557]" style={{ flexShrink: 0 }} />
                  <span>{invitation.resepsi_time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                  <MapPin className="w-5 h-5 text-[#C9A557]" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                  <div>
                    <strong>{invitation.resepsi_venue}</strong>
                    <br />
                    {invitation.resepsi_address}
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
          padding: '4rem 2rem',
          background: '#F5EFE0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: '3rem',
              textAlign: 'center',
              color: '#D4A843',
              marginBottom: '3rem'
            }}>
              Our Moments
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {invitation.photos.map((photo: string, index: number) => (
                <div key={index} style={{
                  position: 'relative',
                  paddingBottom: '100%',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  border: '3px solid #FFFFFF'
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
        padding: '4rem 2rem',
        background: '#FAF6EE'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: '3rem',
            textAlign: 'center',
            color: '#D4A843',
            marginBottom: '1rem'
          }}>
            Konfirmasi Kehadiran
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#8B7355',
            marginBottom: '3rem'
          }}>
            Mohon konfirmasi kehadiran Anda
          </p>

          <form onSubmit={handleRSVPSubmit} style={{
            background: '#FFFFFF',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            border: '1px solid rgba(201,165,87,0.2)'
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#8B7355',
                fontWeight: 500
              }}>
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #E8DCC8',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#C9A557'}
                onBlur={(e) => e.target.style.borderColor = '#E8DCC8'}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#8B7355',
                fontWeight: 500
              }}>
                No. HP (Opsional)
              </label>
              <input
                type="tel"
                name="phone"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #E8DCC8',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#C9A557'}
                onBlur={(e) => e.target.style.borderColor = '#E8DCC8'}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#8B7355',
                fontWeight: 500
              }}>
                Kehadiran
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
                      padding: '0.75rem',
                      border: selectedAttend === option ? '2px solid #C9A557' : '2px solid #E8DCC8',
                      background: selectedAttend === option ? 'rgba(201,165,87,0.1)' : '#FFFFFF',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      color: selectedAttend === option ? '#C9A557' : '#8B7355',
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
                color: '#8B7355',
                fontWeight: 500
              }}>
                Jumlah Tamu
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
                  padding: '0.75rem',
                  border: '2px solid #E8DCC8',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#C9A557'}
                onBlur={(e) => e.target.style.borderColor = '#E8DCC8'}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '1rem',
                background: 'linear-gradient(135deg, #D4A843, #C9A557)',
                color: '#FAF6EE',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'transform 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Kirim Konfirmasi
            </button>
          </form>
        </div>
      </section>

      {/* Wishes */}
      <section style={{
        padding: '4rem 2rem',
        background: '#F5EFE0'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: '3rem',
            textAlign: 'center',
            color: '#D4A843',
            marginBottom: '3rem'
          }}>
            Ucapan & Doa
          </h2>

          {/* Wish Form */}
          <form onSubmit={handleWishSubmit} style={{
            background: '#FFFFFF',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            marginBottom: '3rem',
            border: '1px solid rgba(201,165,87,0.2)'
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#8B7355',
                fontWeight: 500
              }}>
                Nama Anda
              </label>
              <input
                type="text"
                value={wishName}
                onChange={(e) => setWishName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #E8DCC8',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#C9A557'}
                onBlur={(e) => e.target.style.borderColor = '#E8DCC8'}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#8B7355',
                fontWeight: 500
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
                  padding: '0.75rem',
                  border: '2px solid #E8DCC8',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  outline: 'none',
                  resize: 'vertical'
                }}
                onFocus={(e) => e.target.style.borderColor = '#C9A557'}
                onBlur={(e) => e.target.style.borderColor = '#E8DCC8'}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '1rem',
                background: 'linear-gradient(135deg, #D4A843, #C9A557)',
                color: '#FAF6EE',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'transform 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Kirim Ucapan
            </button>
          </form>

          {/* Wishes List */}
          <div style={{
            display: 'grid',
            gap: '1.5rem',
            maxHeight: '600px',
            overflowY: 'auto'
          }}>
            {wishes.map((wish) => (
              <div key={wish.id} style={{
                background: '#FFFFFF',
                padding: '1.5rem',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                borderLeft: '4px solid #C9A557'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem'
                }}>
                  <strong style={{ color: '#D4A843', fontSize: '1.05rem' }}>
                    {wish.name}
                  </strong>
                  <span style={{ fontSize: '0.85rem', color: '#A0826D' }}>
                    {new Date(wish.created_at).toLocaleDateString('id-ID')}
                  </span>
                </div>
                <p style={{
                  color: '#8B7355',
                  lineHeight: 1.6,
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
        background: 'linear-gradient(135deg, #D4A843, #C9A557)',
        textAlign: 'center',
        color: '#FAF6EE'
      }}>
        <p style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: '2rem',
          marginBottom: '1rem'
        }}>
          Thank You
        </p>
        <p style={{ opacity: 0.9, marginBottom: '0.5rem' }}>
          {invitation.bride_name} & {invitation.groom_name}
        </p>
        <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>
          Made with ❤️ by kaundang.id
        </p>
      </footer>
    </div>
  )
}