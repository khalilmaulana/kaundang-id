'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function MyInvitations() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [invitations, setInvitations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
    } else {
      setUser(user)
      fetchInvitations(user.id)
    }
  }

  const fetchInvitations = async (userId: string) => {
    setLoading(true)
    
    const { data, error } = await supabase
      .from('invitations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (data) {
      // Fetch RSVP count untuk setiap undangan
      const invitationsWithStats = await Promise.all(
        data.map(async (inv) => {
          const { data: rsvpData } = await supabase
            .from('rsvp')
            .select('*')
            .eq('invitation_id', inv.id)
          
          const { data: wishData } = await supabase
            .from('wishes')
            .select('*')
            .eq('invitation_id', inv.id)
          
          return {
            ...inv,
            rsvp_count: rsvpData?.length || 0,
            wish_count: wishData?.length || 0,
            hadir_count: rsvpData?.filter(r => r.attendance === '✓ Hadir').length || 0
          }
        })
      )
      
      setInvitations(invitationsWithStats)
    }
    
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FAF6EE',
        color: '#C9A557'
      }}>
        Loading...
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FAF6EE',
      padding: '3rem 2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              color: '#1C150A',
              marginBottom: '0.5rem'
            }}>
              Undangan Saya
            </h1>
            <p style={{
              color: '#666',
              fontSize: '1rem'
            }}>
              Kelola undangan pernikahan Anda
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link
              href="/create-invitation"
              style={{
                padding: '0.8rem 1.5rem',
                background: '#C9A557',
                border: 'none',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                display: 'inline-block'
              }}
            >
              + Buat Undangan Baru
            </Link>
            
            <button
              onClick={handleLogout}
              style={{
                padding: '0.8rem 1.5rem',
                background: 'transparent',
                border: '1px solid #ccc',
                color: '#666',
                fontSize: '0.9rem',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Invitations Grid */}
        {invitations.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '5rem 2rem',
            background: '#fff',
            border: '1px solid rgba(201,165,87,0.2)'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              opacity: 0.3
            }}>
              💍
            </div>
            <h2 style={{
              fontSize: '1.5rem',
              color: '#1C150A',
              marginBottom: '0.5rem'
            }}>
              Belum Ada Undangan
            </h2>
            <p style={{
              color: '#666',
              marginBottom: '2rem'
            }}>
              Buat undangan pernikahan digital pertama Anda
            </p>
            <Link
              href="/create-invitation"
              style={{
                padding: '1rem 2rem',
                background: '#C9A557',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 600,
                display: 'inline-block'
              }}
            >
              Buat Undangan Sekarang
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {invitations.map((inv) => (
              <div
                key={inv.id}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(201,165,87,0.2)',
                  overflow: 'hidden',
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}
              >
                {/* Header */}
                <div style={{
                  background: 'linear-gradient(135deg, #1C150A, #2D200E)',
                  padding: '2rem',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: '2.5rem',
                    color: '#C9A557',
                    lineHeight: 1.2
                  }}>
                    {inv.bride_name} & {inv.groom_name}
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: 'rgba(250,246,238,0.6)',
                    marginTop: '0.5rem'
                  }}>
                    {inv.resepsi_date}
                  </div>
                </div>

                {/* Stats */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  borderBottom: '1px solid rgba(201,165,87,0.2)'
                }}>
                  <div style={{
                    padding: '1rem',
                    textAlign: 'center',
                    borderRight: '1px solid rgba(201,165,87,0.2)'
                  }}>
                    <div style={{
                      fontSize: '1.8rem',
                      fontWeight: 700,
                      color: '#C9A557'
                    }}>
                      {inv.hadir_count}
                    </div>
                    <div style={{
                      fontSize: '0.7rem',
                      color: '#666',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em'
                    }}>
                      Hadir
                    </div>
                  </div>

                  <div style={{
                    padding: '1rem',
                    textAlign: 'center',
                    borderRight: '1px solid rgba(201,165,87,0.2)'
                  }}>
                    <div style={{
                      fontSize: '1.8rem',
                      fontWeight: 700,
                      color: '#C9A557'
                    }}>
                      {inv.rsvp_count}
                    </div>
                    <div style={{
                      fontSize: '0.7rem',
                      color: '#666',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em'
                    }}>
                      Total RSVP
                    </div>
                  </div>

                  <div style={{
                    padding: '1rem',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      fontSize: '1.8rem',
                      fontWeight: 700,
                      color: '#C9A557'
                    }}>
                      {inv.wish_count}
                    </div>
                    <div style={{
                      fontSize: '0.7rem',
                      color: '#666',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em'
                    }}>
                      Ucapan
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  <Link
                    href={`/undangan/${inv.slug}`}
                    target="_blank"
                    style={{
                      padding: '0.8rem',
                      background: '#C9A557',
                      color: '#fff',
                      textAlign: 'center',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      letterSpacing: '0.05em'
                    }}
                  >
                    Lihat Undangan →
                  </Link>

                  <Link
                    href={`/my-invitations/${inv.id}`}
                    style={{
                      padding: '0.8rem',
                      background: 'transparent',
                      border: '1px solid rgba(201,165,87,0.3)',
                      color: '#C9A557',
                      textAlign: 'center',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: 500
                    }}
                  >
                    Dashboard & Statistik
                  </Link>

                  <div style={{
                    fontSize: '0.75rem',
                    color: '#999',
                    textAlign: 'center',
                    marginTop: '0.5rem'
                  }}>
                    Link: kaundang-id.vercel.app/undangan/{inv.slug}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}