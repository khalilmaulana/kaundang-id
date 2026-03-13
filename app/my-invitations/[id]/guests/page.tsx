'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import * as XLSX from 'xlsx'

export default function GuestListPage() {
  const router = useRouter()
  const params = useParams()
  const invitationId = params.id as string
  
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [invitation, setInvitation] = useState<any>(null)
  const [guests, setGuests] = useState<any[]>([])
  const [importing, setImporting] = useState(false)

  // NEW: Search & Filter states
const [searchQuery, setSearchQuery] = useState('')
const [filterStatus, setFilterStatus] = useState('all')
const [filteredGuests, setFilteredGuests] = useState<any[]>([])

  useEffect(() => {
    checkUserAndFetch()
  }, [])

  const checkUserAndFetch = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }
    
  // NEW: Filter logic
useEffect(() => {
  let result = [...guests]
  
  // Search by name
  if (searchQuery) {
    result = result.filter(guest => 
      guest.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }
  
  // Filter by status
  if (filterStatus !== 'all') {
    result = result.filter(guest => guest.status === filterStatus)
  }
  
  setFilteredGuests(result)
}, [guests, searchQuery, filterStatus])

    setUser(user)
    
    // Fetch invitation
    const { data: invData } = await supabase
      .from('invitations')
      .select('*')
      .eq('id', invitationId)
      .eq('user_id', user.id)
      .single()
    
    if (!invData) {
      router.push('/my-invitations')
      return
    }
    
    setInvitation(invData)
    
    // Fetch guest list
    const { data: guestData } = await supabase
      .from('guest_list')
      .select('*')
      .eq('invitation_id', invitationId)
      .order('created_at', { ascending: false })
    
    if (guestData) setGuests(guestData)
    
    setLoading(false)
  }

  const generateCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase()
  }

  const handleCSVImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setImporting(true)
    
    const reader = new FileReader()
    reader.onload = async (event) => {
      const data = event.target?.result
      const workbook = XLSX.read(data, { type: 'binary' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const rows = XLSX.utils.sheet_to_json(sheet) as any[]
      
      // Import guests
      const guestsToInsert = rows.map((row: any) => ({
        invitation_id: invitationId,
        name: row.name || row.nama || row.Name || row.Nama,
        phone: row.phone || row.hp || row.Phone || row.HP || '',
        guest_count: parseInt(row.guest_count || row.jumlah_tamu || '1'),
        personalized_code: generateCode(),
        status: 'pending'
      }))
      
      const { error } = await supabase
        .from('guest_list')
        .insert(guestsToInsert)
      
      if (error) {
        alert('Error importing: ' + error.message)
      } else {
        alert(`Berhasil import ${guestsToInsert.length} tamu!`)
        checkUserAndFetch()
      }
      
      setImporting(false)
    }
    
    reader.readAsBinaryString(file)
  }

  const handleExportCSV = () => {
    const exportData = guests.map((guest, index) => ({
      'No': index + 1,
      'Nama': guest.name,
      'No HP': guest.phone || '-',
      'Jumlah Tamu': guest.guest_count,
      'Status': guest.status === 'pending' ? 'Belum Buka' : 
                guest.status === 'opened' ? 'Sudah Buka' : 'Sudah RSVP',
      'Link': `${window.location.origin}/undangan/${invitation.slug}?guest=${guest.personalized_code}`,
      'Terakhir Dibuka': guest.last_opened_at ? new Date(guest.last_opened_at).toLocaleString('id-ID') : '-'
    }))
    
    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Guest List')
    XLSX.writeFile(wb, `GuestList_${invitation.bride_name}_${invitation.groom_name}.xlsx`)
  }

// NEW: Copy All Links Function
  const handleCopyAllLinks = () => {
    const allLinks = guests.map((guest) => {
      const link = `${window.location.origin}/undangan/${invitation.slug}?guest=${guest.personalized_code}`
      return `${guest.name} - ${link}`
    }).join('\n')
    
    navigator.clipboard.writeText(allLinks).then(() => {
      alert(`✅ ${guests.length} links berhasil di-copy!\n\nFormat:\nNama - Link\n\nPaste di Notes/Excel untuk kirim via WhatsApp!`)
    }).catch(() => {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = allLinks
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      alert(`✅ ${guests.length} links berhasil di-copy!`)
    })
  }

  const generateWhatsAppMessage = (guest: any) => {
    const link = `${window.location.origin}/undangan/${invitation.slug}?guest=${guest.personalized_code}`
    const message = `Assalamualaikum ${guest.name},

Dengan penuh sukacita, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di pernikahan kami:

${invitation.bride_name} & ${invitation.groom_name}

📅 ${invitation.resepsi_date}
⏰ ${invitation.resepsi_time}
📍 ${invitation.resepsi_venue}

Klik link berikut untuk melihat undangan digital:
${link}

Atas kehadiran dan doa restunya, kami ucapkan terima kasih.

Wassalamualaikum Wr. Wb.`
    
    return encodeURIComponent(message)
  }

  const handleWhatsAppSingle = (guest: any) => {
    const phone = guest.phone?.replace(/[^0-9]/g, '')
    if (!phone) {
      alert('Nomor HP tidak tersedia untuk tamu ini')
      return
    }
    
    const message = generateWhatsAppMessage(guest)
    const waLink = `https://wa.me/62${phone}?text=${message}`
    window.open(waLink, '_blank')
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
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <Link href={`/my-invitations/${invitationId}`} style={{
              color: '#C9A557',
              textDecoration: 'none',
              fontSize: '0.9rem',
              marginBottom: '0.5rem',
              display: 'block'
            }}>
              ← Kembali ke Dashboard
            </Link>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#1C150A',
              marginBottom: '0.5rem'
            }}>
              Guest List Management
            </h1>
            <p style={{ color: '#666', fontSize: '0.95rem' }}>
              {invitation.bride_name} & {invitation.groom_name}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <label style={{
              padding: '0.8rem 1.5rem',
              background: '#10B981',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 500,
              border: 'none',
              borderRadius: '4px'
            }}>
              {importing ? 'Importing...' : '📥 Import CSV'}
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleCSVImport}
                disabled={importing}
                style={{ display: 'none' }}
              />
            </label>

            <button
              onClick={handleExportCSV}
              disabled={guests.length === 0}
              style={{
                padding: '0.8rem 1.5rem',
                background: guests.length === 0 ? '#ccc' : '#3B82F6',
                color: '#fff',
                cursor: guests.length === 0 ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem',
                fontWeight: 500,
                border: 'none',
                borderRadius: '4px'
              }}
            >
              📤 Export CSV
            </button>
          </div>
        </div>
        
         {/* NEW: Copy All Links Button */}
            <button
              onClick={handleCopyAllLinks}
              disabled={guests.length === 0}
              style={{
                padding: '0.8rem 1.5rem',
                background: guests.length === 0 ? '#ccc' : '#F59E0B',
                color: '#fff',
                cursor: guests.length === 0 ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem',
                fontWeight: 500,
                border: 'none',
                borderRadius: '4px'
              }}
            >
              📋 Copy All Links
            </button>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: '#fff',
            padding: '1.5rem',
            border: '1px solid rgba(201,165,87,0.2)',
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>
              Total Tamu
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#C9A557' }}>
              {guests.length}
            </div>
          </div>

          <div style={{
            background: '#fff',
            padding: '1.5rem',
            border: '1px solid rgba(201,165,87,0.2)',
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>
              Belum Buka
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#666' }}>
              {guests.filter(g => g.status === 'pending').length}
            </div>
          </div>

          <div style={{
            background: '#fff',
            padding: '1.5rem',
            border: '1px solid rgba(201,165,87,0.2)',
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>
              Sudah Buka
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#3B82F6' }}>
              {guests.filter(g => g.status === 'opened').length}
            </div>
          </div>

          <div style={{
            background: '#fff',
            padding: '1.5rem',
            border: '1px solid rgba(201,165,87,0.2)',
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>
              Sudah RSVP
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#10B981' }}>
              {guests.filter(g => g.status === 'rsvp_done').length}
            </div>
          </div>
        </div>

        {/* Guest Table */}
        <div style={{
          background: '#fff',
          border: '1px solid rgba(201,165,87,0.2)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid rgba(201,165,87,0.2)',
            background: '#faf6ee'
          }}>
            <h2 style={{
              fontSize: '1.2rem',
              fontWeight: 600,
              color: '#1C150A'
            }}>
              Daftar Tamu ({guests.length})
            </h2>
          </div>

                      {/* NEW: Search & Filter Bar */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '1rem',
              marginTop: '1rem'
            }}>
              {/* Search Input */}
              <input
                type="text"
                placeholder="🔍 Cari nama tamu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '0.7rem 1rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />

              {/* Filter Dropdown */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{
                  padding: '0.7rem 1rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  outline: 'none',
                  cursor: 'pointer',
                  minWidth: '200px'
                }}
              >
                <option value="all">📊 Semua Status ({guests.length})</option>
                <option value="pending">⏳ Belum Buka ({guests.filter(g => g.status === 'pending').length})</option>
                <option value="opened">👁️ Sudah Buka ({guests.filter(g => g.status === 'opened').length})</option>
                <option value="rsvp_done">✅ Sudah RSVP ({guests.filter(g => g.status === 'rsvp_done').length})</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            {(searchQuery || filterStatus !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setFilterStatus('all')
                }}
                style={{
                  marginTop: '0.8rem',
                  padding: '0.5rem 1rem',
                  background: '#f3f4f6',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                ✕ Clear Filters
              </button>
            )} 

          {filteredGuests.length === 0 ? (
            <div style={{
              padding: '3rem',
              textAlign: 'center',
              color: '#666'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
              <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                Belum ada tamu
              </p>
              <p style={{ fontSize: '0.9rem', color: '#999' }}>
                Import CSV untuk menambahkan daftar tamu
              </p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse'
              }}>
                <thead>
                  <tr style={{
                    background: '#f5f5f5',
                    borderBottom: '2px solid rgba(201,165,87,0.2)'
                  }}>
                    <th style={thStyle}>No</th>
                    <th style={thStyle}>Nama</th>
                    <th style={thStyle}>No HP</th>
                    <th style={thStyle}>Jumlah</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Link</th>
                    <th style={thStyle}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGuests.map((guest, index) => (
                    <tr key={guest.id} style={{
                      borderBottom: '1px solid #f0f0f0'
                    }}>
                      <td style={tdStyle}>{index + 1}</td>
                      <td style={tdStyle}>{guest.name}</td>
                      <td style={tdStyle}>{guest.phone || '-'}</td>
                      <td style={tdStyle}>{guest.guest_count}</td>
                      <td style={tdStyle}>
                        <span style={{
                          padding: '0.3rem 0.8rem',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          background: guest.status === 'pending' ? '#f3f4f6' :
                                     guest.status === 'opened' ? '#dbeafe' : '#d1fae5',
                          color: guest.status === 'pending' ? '#6b7280' :
                                guest.status === 'opened' ? '#1e40af' : '#065f46'
                        }}>
                          {guest.status === 'pending' ? 'Belum Buka' :
                           guest.status === 'opened' ? 'Sudah Buka' : 'Sudah RSVP'}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <button
                          onClick={() => {
                            const link = `${window.location.origin}/undangan/${invitation.slug}?guest=${guest.personalized_code}`
                            navigator.clipboard.writeText(link)
                            alert('Link copied!')
                          }}
                          style={{
                            padding: '0.4rem 0.8rem',
                            background: '#f3f4f6',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                          }}
                        >
                          📋 Copy
                        </button>
                      </td>
                      <td style={tdStyle}>
                        <button
                          onClick={() => handleWhatsAppSingle(guest)}
                          disabled={!guest.phone}
                          style={{
                            padding: '0.4rem 0.8rem',
                            background: guest.phone ? '#25D366' : '#ccc',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: guest.phone ? 'pointer' : 'not-allowed',
                            fontSize: '0.8rem'
                          }}
                        >
                          💬 WA
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const thStyle = {
  padding: '1rem',
  textAlign: 'left' as const,
  fontSize: '0.85rem',
  fontWeight: 600,
  color: '#1C150A'
}

const tdStyle = {
  padding: '1rem',
  fontSize: '0.9rem',
  color: '#333'
}