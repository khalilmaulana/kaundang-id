'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function InvitationDetail() {
  const params = useParams()
  const router = useRouter()
  const invitationId = params.id as string
  
  const [user, setUser] = useState<any>(null)
  const [invitation, setInvitation] = useState<any>(null)
  const [rsvps, setRsvps] = useState<any[]>([])
  const [wishes, setWishes] = useState<any[]>([])
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
      fetchData(user.id)
    }
  }

  const fetchData = async (userId: string) => {
    setLoading(true)
    
    // Fetch invitation
    const { data: invData } = await supabase
      .from('invitations')
      .select('*')
      .eq('id', invitationId)
      .eq('user_id', userId) // Pastikan user hanya bisa lihat undangan mereka
      .single()
    
    if (!invData) {
      router.push('/my-invitations')
      return
    }
    
    setInvitation(invData)
    
    // Fetch RSVP
    const { data: rsvpData } = await supabase
      .from('rsvp')
      .select('*')
      .eq('invitation_id', invitationId)
      .order('created_at', { ascending: false })
    
    // Fetch wishes
    const { data: wishData } = await supabase
      .from('wishes')
      .select('*')
      .eq('invitation_id', invitationId)
      .order('created_at', { ascending: false })
    
    if (rsvpData) setRsvps(rsvpData)
    if (wishData) setWishes(wishData)
    
    setLoading(false)
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0D0D0D',
        color: '#D4A843'
      }}>
        Loading...
      </div>
    )
  }

  if (!invitation) {
    return null
  }

  const hadirCount = rsvps.filter(r => r.attendance === '✓ Hadir').length
  const tidakCount = rsvps.filter(r => r.attendance === '✕ Tidak Hadir').length
  const mungkinCount = rsvps.filter(r => r.attendance === '? Mungkin').length
  const totalGuests = rsvps.reduce((sum, r) => sum + (r.guest_count || 1), 0)

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0D0D0D',
      padding: '2rem',
      color: '#F0EDE8'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          marginBottom: '3rem'
        }}>
          <Link
            href="/my-invitations"
            style={{
              color: '#999',
              textDecoration: 'none',
              fontSize: '0.9rem',
              marginBottom: '1rem',
              display: 'inline-block'
            }}
          >
            ← Kembali ke Dashboard
          </Link>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                color: '#D4A843',
                marginBottom: '0.5rem',
                fontFamily: "'Great Vibes', cursive"
              }}>
                {invitation.bride_name} & {invitation.groom_name}
              </h1>
              <p style={{ color: '#666', fontSize: '0.95rem' }}>
                {invitation.resepsi_date} · {invitation.resepsi_venue}
              </p>
            </div>
            
            <Link
              href={`/undangan/${invitation.slug}`}
              target="_blank"
              style={{
                padding: '0.6rem 1.5rem',
                background: '#D4A843',
                color: '#0D0D0D',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500
              }}
            >
              Lihat Undangan →
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: '#161616',
            border: '1px solid #222',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#4ADE80' }}>
              {hadirCount}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
              Hadir
            </div>
          </div>

          <div style={{
            background: '#161616',
            border: '1px solid #222',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#F87171' }}>
              {tidakCount}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
              Tidak Hadir
            </div>
          </div>

          <div style={{
            background: '#161616',
            border: '1px solid #222',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#FB923C' }}>
              {mungkinCount}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
              Mungkin
            </div>
          </div>

          <div style={{
            background: '#161616',
            border: '1px solid #222',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#D4A843' }}>
              {totalGuests}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
              Total Tamu
            </div>
          </div>
        </div>

        {/* RSVP Table */}
        <div style={{
          background: '#161616',
          border: '1px solid #222',
          marginBottom: '2rem'
        }}>
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid #222'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: '#D4A843'
            }}>
              Daftar RSVP ({rsvps.length})
            </h2>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse'
            }}>
              <thead>
                <tr style={{ background: '#0D0D0D' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#666' }}>
                    Nama
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#666' }}>
                    No. HP
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#666' }}>
                    Kehadiran
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.85rem', color: '#666' }}>
                    Jumlah
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.85rem', color: '#666' }}>
                    Tanggal
                  </th>
                </tr>
              </thead>
              <tbody>
                {rsvps.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{
                      padding: '3rem',
                      textAlign: 'center',
                      color: '#666'
                    }}>
                      Belum ada tamu yang konfirmasi
                    </td>
                  </tr>
                ) : (
                  rsvps.map((rsvp) => (
                    <tr key={rsvp.id} style={{ borderBottom: '1px solid #222' }}>
                      <td style={{ padding: '1rem', fontSize: '0.9rem' }}>
                        {rsvp.name}
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#999' }}>
                        {rsvp.phone || '-'}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '999px',
                          fontSize: '0.75rem',
                          background: rsvp.attendance === '✓ Hadir' ? '#10372f' : 
                                     rsvp.attendance === '✕ Tidak Hadir' ? '#3d1a1a' : '#3d2a1a',
                          color: rsvp.attendance === '✓ Hadir' ? '#4ADE80' : 
                                 rsvp.attendance === '✕ Tidak Hadir' ? '#F87171' : '#FB923C'
                        }}>
                          {rsvp.attendance}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                        {rsvp.guest_count || 1}
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#666' }}>
                        {new Date(rsvp.created_at).toLocaleDateString('id-ID')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Wishes */}
        <div style={{
          background: '#161616',
          border: '1px solid #222'
        }}>
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid #222'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: '#D4A843'
            }}>
              Ucapan & Doa ({wishes.length})
            </h2>
          </div>
          
          <div style={{
            padding: '1.5rem',
            display: 'grid',
            gap: '1rem',
            maxHeight: '600px',
            overflowY: 'auto'
          }}>
            {wishes.length === 0 ? (
              <div style={{
                padding: '3rem',
                textAlign: 'center',
                color: '#666'
              }}>
                Belum ada ucapan
              </div>
            ) : (
              wishes.map((wish) => (
                <div key={wish.id} style={{
                  background: '#0D0D0D',
                  border: '1px solid #222',
                  padding: '1.25rem'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{
                      fontWeight: 500,
                      color: '#D4A843',
                      fontSize: '0.95rem'
                    }}>
                      {wish.name}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#666'
                    }}>
                      {new Date(wish.created_at).toLocaleDateString('id-ID')}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#999',
                    lineHeight: 1.6
                  }}>
                    {wish.message}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}