import './wedding.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ background: '#FAF6EE' }}>
      {/* HERO */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #1C150A 0%, #2D200E 100%)',
        textAlign: 'center',
        padding: '4rem 2rem',
        position: 'relative'
      }}>
        <div style={{
          fontSize: '0.7rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(201,165,87,0.6)',
          marginBottom: '1.5rem'
        }}>
          Platform Undangan Digital
        </div>
        
        <h1 style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(3.5rem, 10vw, 7rem)',
          lineHeight: 1.1,
          color: '#C9A557',
          textShadow: '0 0 60px rgba(201,165,87,0.3)',
          marginBottom: '1rem',
          maxWidth: '900px'
        }}>
          Sampaikan Momen Sakral dengan Anggun
        </h1>
        
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: 'rgba(250,246,238,0.7)',
          maxWidth: '600px',
          lineHeight: 1.8,
          marginBottom: '3rem'
        }}>
          Buat undangan pernikahan digital yang elegan dan mudah dikelola. 
          Tanpa coding, tanpa ribet, langsung jadi.
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <Link
            href="/register"
            style={{
              padding: '1.2rem 2.5rem',
              background: '#C9A557',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              transition: 'transform 0.3s'
            }}
          >
            Buat Undangan Gratis →
          </Link>
          
          <Link
            href="/preview"
            style={{
              padding: '1.2rem 2.5rem',
              background: 'transparent',
              border: '1px solid rgba(201,165,87,0.5)',
              color: 'rgba(250,246,238,0.8)',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              letterSpacing: '0.05em'
            }}
          >
            Lihat Contoh
          </Link>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '2rem',
          fontSize: '0.75rem',
          color: 'rgba(201,165,87,0.4)',
          letterSpacing: '0.15em'
        }}>
          ↓ Scroll untuk fitur
        </div>
      </section>

      {/* FEATURES */}
      <section style={{
        padding: '8rem 2rem',
        background: '#FAF6EE'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '5rem'
          }}>
            <span style={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#C9A557',
              display: 'block',
              marginBottom: '1rem'
            }}>
              ✦ Fitur Lengkap
            </span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 400,
              color: '#1C150A',
              marginBottom: '1rem'
            }}>
              Semua yang Anda Butuhkan
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Platform lengkap untuk mengelola undangan pernikahan digital Anda
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem'
          }}>
            {[
              {
                icon: '💍',
                title: 'Desain Elegan',
                desc: 'Template undangan yang indah dan profesional dengan tema gold & cream yang mewah'
              },
              {
                icon: '📱',
                title: 'Mobile Friendly',
                desc: 'Tampilan sempurna di semua perangkat - desktop, tablet, dan smartphone'
              },
              {
                icon: '✉️',
                title: 'RSVP Online',
                desc: 'Tamu dapat konfirmasi kehadiran langsung melalui form yang mudah digunakan'
              },
              {
                icon: '💬',
                title: 'Buku Ucapan',
                desc: 'Kumpulkan ucapan dan doa dari tamu undangan dalam satu tempat'
              },
              {
                icon: '📊',
                title: 'Dashboard Lengkap',
                desc: 'Pantau statistik tamu, lihat siapa yang hadir, dan kelola data dengan mudah'
              },
              {
                icon: '⚡',
                title: 'Instan & Cepat',
                desc: 'Buat undangan dalam hitungan menit, langsung bisa dibagikan ke tamu'
              }
            ].map((feature, i) => (
              <div key={i} style={{
                background: '#fff',
                padding: '2.5rem',
                border: '1px solid rgba(201,165,87,0.15)',
                textAlign: 'center',
                transition: 'transform 0.3s, box-shadow 0.3s'
              }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  color: '#1C150A',
                  marginBottom: '0.8rem'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#666',
                  lineHeight: 1.7
                }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{
        padding: '8rem 2rem',
        background: 'linear-gradient(135deg, #1C150A, #2D200E)'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <span style={{
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(201,165,87,0.7)',
            display: 'block',
            marginBottom: '1rem'
          }}>
            ✦ Cara Kerja
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 400,
            color: '#C9A557',
            marginBottom: '4rem'
          }}>
            Mudah & Cepat
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            textAlign: 'center'
          }}>
            {[
              { num: '1', title: 'Daftar Gratis', desc: 'Buat akun dalam 30 detik' },
              { num: '2', title: 'Isi Data', desc: 'Input informasi pernikahan Anda' },
              { num: '3', title: 'Bagikan', desc: 'Kirim link undangan ke tamu' },
              { num: '4', title: 'Kelola', desc: 'Pantau RSVP & ucapan di dashboard' }
            ].map((step) => (
              <div key={step.num}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'rgba(201,165,87,0.1)',
                  border: '2px solid rgba(201,165,87,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#C9A557',
                  margin: '0 auto 1.5rem'
                }}>
                  {step.num}
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  color: '#C9A557',
                  marginBottom: '0.5rem',
                  fontWeight: 600
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: 'rgba(250,246,238,0.6)'
                }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{
        padding: '8rem 2rem',
        background: '#FAF6EE'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <span style={{
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#C9A557',
            display: 'block',
            marginBottom: '1rem'
          }}>
            ✦ Harga
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 400,
            color: '#1C150A',
            marginBottom: '1rem'
          }}>
            Mulai Gratis
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            marginBottom: '4rem'
          }}>
            Tidak ada biaya tersembunyi. Semua fitur dapat diakses.
          </p>

          <div style={{
            background: '#fff',
            border: '2px solid #C9A557',
            padding: '3rem',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <div style={{
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#C9A557',
              marginBottom: '1rem'
            }}>
              Paket Gratis
            </div>
            <div style={{
              fontSize: '4rem',
              fontWeight: 700,
              color: '#1C150A',
              marginBottom: '0.5rem'
            }}>
              Rp 0
            </div>
            <div style={{
              fontSize: '0.9rem',
              color: '#666',
              marginBottom: '2rem'
            }}>
              Selamanya
            </div>

            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 2.5rem 0',
              textAlign: 'left'
            }}>
              {[
                'Undangan digital unlimited',
                'RSVP & buku ucapan',
                'Dashboard statistik',
                'Mobile responsive',
                'Support email'
              ].map((item, i) => (
                <li key={i} style={{
                  padding: '0.8rem 0',
                  borderBottom: '1px solid #eee',
                  fontSize: '0.95rem',
                  color: '#333'
                }}>
                  ✓ {item}
                </li>
              ))}
            </ul>

            <Link
              href="/register"
              style={{
                display: 'block',
                padding: '1.2rem',
                background: '#C9A557',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                letterSpacing: '0.05em'
              }}
            >
              Mulai Sekarang →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '8rem 2rem',
        background: 'linear-gradient(135deg, #1C150A, #2D200E)',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          color: '#C9A557',
          marginBottom: '1.5rem',
          textShadow: '0 0 60px rgba(201,165,87,0.3)'
        }}>
          Siap Membuat Undangan?
        </h2>
        <p style={{
          fontSize: '1.2rem',
          color: 'rgba(250,246,238,0.7)',
          marginBottom: '3rem',
          maxWidth: '600px',
          margin: '0 auto 3rem'
        }}>
          Bergabung dengan ratusan pasangan yang telah mempercayai platform kami
        </p>
        <Link
          href="/register"
          style={{
            padding: '1.4rem 3rem',
            background: '#C9A557',
            color: '#fff',
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            display: 'inline-block'
          }}
        >
          Buat Undangan Gratis →
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: '#0D0D0D',
        padding: '3rem 2rem',
        textAlign: 'center',
        borderTop: '1px solid #222'
      }}>
        <div style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: '2rem',
          color: '#C9A557',
          marginBottom: '1rem'
        }}>
          Kaundang.id
        </div>
        <p style={{
          color: '#666',
          fontSize: '0.9rem',
          marginBottom: '2rem'
        }}>
          Platform undangan digital untuk momen spesial Anda
        </p>
        <div style={{
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '2rem'
        }}>
          <Link href="/preview" style={{ color: '#999', textDecoration: 'none', fontSize: '0.9rem' }}>
            Contoh
          </Link>
          <Link href="/register" style={{ color: '#999', textDecoration: 'none', fontSize: '0.9rem' }}>
            Daftar
          </Link>
          <Link href="/login" style={{ color: '#999', textDecoration: 'none', fontSize: '0.9rem' }}>
            Masuk
          </Link>
        </div>
        <div style={{
          color: '#555',
          fontSize: '0.8rem'
        }}>
          © 2026 Kaundang.id. Made with 💍 in Indonesia.
        </div>
      </footer>
    </main>
  )
}