'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import * as XLSX from 'xlsx'
import QRCode from 'qrcode'
import { Heart, ArrowLeft, Download, QrCode, FileSpreadsheet, Users, Eye, MessageSquare, CheckCircle2, XCircle, HelpCircle, Calendar, Phone, Clock, ExternalLink } from 'lucide-react'

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
    
    const { data: invData } = await supabase
      .from('invitations')
      .select('*')
      .eq('id', invitationId)
      .eq('user_id', userId)
      .single()
    
    if (!invData) {
      router.push('/my-invitations')
      return
    }

    setInvitation(invData)
    
    const { data: rsvpData } = await supabase
      .from('rsvp')
      .select('*')
      .eq('invitation_id', invitationId)
      .order('created_at', { ascending: false })
    
    const { data: wishData } = await supabase
      .from('wishes')
      .select('*')
      .eq('invitation_id', invitationId)
      .order('created_at', { ascending: false })
    
    if (rsvpData) setRsvps(rsvpData)
    if (wishData) setWishes(wishData)
    
    setLoading(false)
  }

  const handleDownloadQR = async () => {
    try {
      const url = `${window.location.origin}/undangan/${invitation.slug}`
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: 500,
        margin: 2,
        color: {
          dark: '#1C150A',
          light: '#FAF6EE'
        }
      })
      
      const link = document.createElement('a')
      link.href = qrDataUrl
      link.download = `QR_${invitation.bride_name}_${invitation.groom_name}.png`
      link.click()
    } catch (error) {
      alert('Error generating QR Code')
    }
  }

  const handleExportExcel = () => {
    const excelData = rsvps.map((rsvp, index) => ({
      'No': index + 1,
      'Nama': rsvp.name,
      'No HP': rsvp.phone || '-',
      'Kehadiran': rsvp.attendance,
      'Jumlah Tamu': rsvp.guest_count || 1,
      'Tanggal': new Date(rsvp.created_at).toLocaleDateString('id-ID')
    }))

    const ws = XLSX.utils.json_to_sheet(excelData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'RSVP')
    XLSX.writeFile(wb, `RSVP_${invitation.bride_name}_${invitation.groom_name}.xlsx`)
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

  if (!invitation) {
    return null
  }

  const hadirCount = rsvps.filter(r => r.attendance === '✓ Hadir').length
  const tidakCount = rsvps.filter(r => r.attendance === '✕ Tidak Hadir').length
  const mungkinCount = rsvps.filter(r => r.attendance === '? Mungkin').length
  const totalGuests = rsvps.reduce((sum, r) => sum + (r.guest_count || 1), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* TOP NAVBAR */}
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
              href="/my-invitations"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 hover:border-[#D4AF37] text-gray-700 hover:text-[#D4AF37] font-medium rounded-full transition-all hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Kembali</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <div className="relative mb-8 overflow-hidden bg-gradient-to-br from-[#D4AF37] via-[#E5C158] to-[#C19B2E] rounded-3xl p-8 shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 font-serif drop-shadow-lg">
              {invitation.bride_name} & {invitation.groom_name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span className="font-medium">{invitation.resepsi_date}</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span className="font-medium">{invitation.resepsi_venue}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={handleExportExcel}
            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <FileSpreadsheet className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Export Excel</span>
          </button>
          
          <button
            onClick={handleDownloadQR}
            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <QrCode className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Download QR</span>
          </button>

          <Link
            href={`/my-invitations/${invitationId}/guests`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Users className="w-5 h-5" />
            <span>Guest List</span>
          </Link>
          
          <Link
            href={`/undangan/${invitation.slug}`}
            target="_blank"
            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <Eye className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Lihat Undangan</span>
            <ExternalLink className="w-4 h-4 relative z-10" />
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Hadir', value: hadirCount, icon: CheckCircle2, color: 'from-green-500 to-green-600', bgColor: 'from-green-50 to-green-100' },
            { label: 'Tidak Hadir', value: tidakCount, icon: XCircle, color: 'from-red-500 to-red-600', bgColor: 'from-red-50 to-red-100' },
            { label: 'Mungkin', value: mungkinCount, icon: HelpCircle, color: 'from-orange-500 to-orange-600', bgColor: 'from-orange-50 to-orange-100' },
            { label: 'Total Tamu', value: totalGuests, icon: Users, color: 'from-[#D4AF37] to-[#C19B2E]', bgColor: 'from-[#FFF8F0] to-[#FFE5D9]' },
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="group relative">
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500`}></div>
                
                <div className={`relative bg-gradient-to-br ${stat.bgColor} p-6 rounded-2xl border border-gray-100 hover:border-transparent transition-all`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
                  <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* RSVP Table */}
        <div className="relative mb-8">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#A8C5A9] rounded-2xl opacity-20 blur"></div>
          
          <div className="relative bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-5 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#C19B2E] rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                Daftar RSVP
                <span className="text-lg font-normal text-gray-500">({rsvps.length})</span>
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nama</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">No. HP</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Kehadiran</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Jumlah</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Tanggal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {rsvps.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <Users className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-gray-500">Belum ada tamu yang konfirmasi</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    rsvps.map((rsvp) => (
                      <tr key={rsvp.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">{rsvp.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            {rsvp.phone ? (
                              <>
                                <Phone className="w-4 h-4" />
                                <span>{rsvp.phone}</span>
                              </>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
                            rsvp.attendance === '✓ Hadir' 
                              ? 'bg-green-100 text-green-700' 
                              : rsvp.attendance === '✕ Tidak Hadir' 
                              ? 'bg-red-100 text-red-700' 
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                            {rsvp.attendance === '✓ Hadir' && <CheckCircle2 className="w-4 h-4" />}
                            {rsvp.attendance === '✕ Tidak Hadir' && <XCircle className="w-4 h-4" />}
                            {rsvp.attendance === '? Mungkin' && <HelpCircle className="w-4 h-4" />}
                            {rsvp.attendance}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full font-semibold text-gray-900">
                            {rsvp.guest_count || 1}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(rsvp.created_at).toLocaleDateString('id-ID')}</span>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Wishes Section */}
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-2xl opacity-20 blur"></div>
          
          <div className="relative bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-5 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                Ucapan & Doa
                <span className="text-lg font-normal text-gray-500">({wishes.length})</span>
              </h2>
            </div>
            
            <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
              {wishes.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">Belum ada ucapan</p>
                </div>
              ) : (
                wishes.map((wish) => (
                  <div key={wish.id} className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition-all"></div>
                    
                    <div className="relative bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100 hover:border-purple-200 transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                            {wish.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{wish.name}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>{new Date(wish.created_at).toLocaleDateString('id-ID')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed pl-13">
                        {wish.message}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}