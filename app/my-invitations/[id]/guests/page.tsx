'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import * as XLSX from 'xlsx'
import { Heart, ArrowLeft, Upload, Download, Copy, Send, Search, Filter, Users, CheckCircle2, Eye, Clock, ExternalLink, Trash2 } from 'lucide-react'

export default function GuestListPage() {
  const router = useRouter()
  const params = useParams()
  const invitationId = params.id as string
  
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [invitation, setInvitation] = useState<any>(null)
  const [guests, setGuests] = useState<any[]>([])
  const [importing, setImporting] = useState(false)

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filteredGuests, setFilteredGuests] = useState<any[]>([])

  useEffect(() => {
    checkUserAndFetch()
  }, [])

  useEffect(() => {
    let result = [...guests]
    
    if (searchQuery) {
      result = result.filter(guest => 
        guest.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    if (filterStatus !== 'all') {
      result = result.filter(guest => guest.status === filterStatus)
    }
    
    setFilteredGuests(result)
  }, [guests, searchQuery, filterStatus])

  const checkUserAndFetch = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    setUser(user)
    
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

  const handleCopyAllLinks = () => {
    const allLinks = guests.map((guest) => {
      const link = `${window.location.origin}/undangan/${invitation.slug}?guest=${guest.personalized_code}`
      return `${guest.name} - ${link}`
    }).join('\n')
    
    navigator.clipboard.writeText(allLinks).then(() => {
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] via-[#E5C158] to-[#C19B2E] rounded-2xl flex items-center justify-center animate-pulse mx-auto mb-4">
            <Heart className="w-8 h-8 text-white fill-white" />
          </div>
          <p className="text-[#D4AF37] font-semibold">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] via-[#E5C158] to-[#C19B2E] rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-[#D4AF37]/30">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">kaundang.id</span>
            </Link>

            <Link
              href={`/my-invitations/${invitationId}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 hover:border-[#D4AF37] text-gray-700 hover:text-[#D4AF37] font-medium rounded-full transition-all hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Kembali</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Guest List Management</h1>
          <p className="text-lg text-gray-600">{invitation.bride_name} & {invitation.groom_name}</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <label className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <Upload className="w-5 h-5 relative z-10" />
            <span className="relative z-10">{importing ? 'Importing...' : 'Import CSV'}</span>
            <input type="file" accept=".csv,.xlsx,.xls" onChange={handleCSVImport} disabled={importing} className="hidden" />
          </label>

          <button onClick={handleExportCSV} disabled={guests.length === 0} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
            <Download className="w-5 h-5" />
            <span>Export CSV</span>
          </button>

          <button onClick={handleCopyAllLinks} disabled={guests.length === 0} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
            <Copy className="w-5 h-5" />
            <span>Copy All Links</span>
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Tamu', value: guests.length, icon: Users, color: 'from-[#D4AF37] to-[#C19B2E]', bgColor: 'from-[#FFF8F0] to-[#FFE5D9]' },
            { label: 'Belum Buka', value: guests.filter(g => g.status === 'pending').length, icon: Clock, color: 'from-gray-500 to-gray-600', bgColor: 'from-gray-50 to-gray-100' },
            { label: 'Sudah Buka', value: guests.filter(g => g.status === 'opened').length, icon: Eye, color: 'from-blue-500 to-blue-600', bgColor: 'from-blue-50 to-blue-100' },
            { label: 'Sudah RSVP', value: guests.filter(g => g.status === 'rsvp_done').length, icon: CheckCircle2, color: 'from-green-500 to-green-600', bgColor: 'from-green-50 to-green-100' },
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="group relative">
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500`}></div>
                <div className={`relative bg-gradient-to-br ${stat.bgColor} p-6 rounded-2xl border border-gray-100`}>
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium mb-1">{stat.label}</p>
                  <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#A8C5A9] rounded-2xl opacity-20 blur"></div>
          
          <div className="relative bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-5 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Daftar Tamu ({filteredGuests.length})</h2>
            </div>

            <div className="p-6 border-b border-gray-100 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" placeholder="Cari nama tamu..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors" />
                </div>

                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-colors cursor-pointer">
                  <option value="all">📊 Semua Status ({guests.length})</option>
                  <option value="pending">⏳ Belum Buka ({guests.filter(g => g.status === 'pending').length})</option>
                  <option value="opened">👁️ Sudah Buka ({guests.filter(g => g.status === 'opened').length})</option>
                  <option value="rsvp_done">✅ Sudah RSVP ({guests.filter(g => g.status === 'rsvp_done').length})</option>
                </select>
              </div>

              {(searchQuery || filterStatus !== 'all') && (
                <button onClick={() => { setSearchQuery(''); setFilterStatus('all') }} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors">
                  ✕ Clear Filters
                </button>
              )}
            </div>

            {filteredGuests.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">Belum ada tamu</p>
                <p className="text-gray-400 text-sm">Import CSV untuk menambahkan daftar tamu</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">No</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Nama</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">No HP</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase">Jumlah</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredGuests.map((guest, index) => (
                      <tr key={guest.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                        <td className="px-6 py-4 font-semibold text-gray-900">{guest.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{guest.phone || '-'}</td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full font-semibold text-gray-900 text-sm">
                            {guest.guest_count}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold ${
                            guest.status === 'pending' ? 'bg-gray-100 text-gray-700' :
                            guest.status === 'opened' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {guest.status === 'pending' ? 'Belum Buka' :
                             guest.status === 'opened' ? 'Sudah Buka' : 'Sudah RSVP'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button onClick={() => {
                              const link = `${window.location.origin}/undangan/${invitation.slug}?guest=${guest.personalized_code}`
                              navigator.clipboard.writeText(link)
                              alert('Link copied!')
                            }} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Copy Link">
                              <Copy className="w-4 h-4 text-gray-600" />
                            </button>
                            <button onClick={() => handleWhatsAppSingle(guest)} disabled={!guest.phone} className="p-2 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Send WhatsApp">
                              <Send className="w-4 h-4 text-green-600" />
                            </button>
                          </div>
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
    </div>
  )
}