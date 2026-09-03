'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Heart, Plus, LogOut, Eye, BarChart3, Copy, Share2, Edit, Files, Trash2, Calendar, Users, MessageSquare, ExternalLink, Crown, AlertTriangle, History, X } from 'lucide-react'
import { getUserPlanStatus, PLAN_LABELS, type UserPlanStatus } from '../lib/planLimits'

export default function MyInvitations() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [invitations, setInvitations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [planStatus, setPlanStatus] = useState<UserPlanStatus | null>(null)
  const [latestRejected, setLatestRejected] = useState<any>(null)

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
      const status = await getUserPlanStatus(supabase, user.id)
      setPlanStatus(status)

      // Cek kalau ada payment yang baru ditolak (belum di-dismiss)
      const { data: rejectedPayments } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'rejected')
        .order('verified_at', { ascending: false })
        .limit(1)

      if (rejectedPayments && rejectedPayments.length > 0) {
        const dismissedId = localStorage.getItem('dismissed_rejected_payment')
        if (dismissedId !== String(rejectedPayments[0].id)) {
          setLatestRejected(rejectedPayments[0])
        }
      }
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

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus undangan ini?')) return
    
    const { error } = await supabase
      .from('invitations')
      .delete()
      .eq('id', id)
    
    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('Undangan berhasil dihapus!')
      fetchInvitations(user.id)
    }
  }

  const handleDuplicate = async (invitation: any) => {
    if (!confirm(`Duplicate undangan "${invitation.bride_name} & ${invitation.groom_name}"?`)) return
    
    setLoading(true)
    
    const timestamp = Date.now()
    const newSlug = `${invitation.slug}-copy-${timestamp}`
    
    const duplicateData = {
      user_id: invitation.user_id,
      slug: newSlug,
      bride_name: invitation.bride_name,
      groom_name: invitation.groom_name,
      bride_fullname: invitation.bride_fullname,
      groom_fullname: invitation.groom_fullname,
      bride_parents: invitation.bride_parents,
      groom_parents: invitation.groom_parents,
      akad_date: invitation.akad_date,
      akad_time: invitation.akad_time,
      akad_venue: invitation.akad_venue,
      akad_address: invitation.akad_address,
      resepsi_date: invitation.resepsi_date,
      resepsi_time: invitation.resepsi_time,
      resepsi_venue: invitation.resepsi_venue,
      resepsi_address: invitation.resepsi_address,
      music_url: invitation.music_url || '',
      photos: [],
      template: invitation.template || 'gold-cream'
    }
    
    const { data, error } = await supabase
      .from('invitations')
      .insert([duplicateData])
      .select()
      .single()
    
    if (error) {
      alert('Error duplicating: ' + error.message)
      setLoading(false)
    } else {
      alert('✅ Undangan berhasil di-duplicate!\n\nSlug baru: ' + newSlug)
      setLoading(false)
      router.push(`/my-invitations/${data.id}/edit`)
    }
  }

  const handleDismissRejected = () => {
    if (latestRejected) {
      localStorage.setItem('dismissed_rejected_payment', String(latestRejected.id))
      setLatestRejected(null)
    }
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

            <div className="flex items-center gap-3">
              <Link
                href="/payment/history"
                className="hidden md:inline-flex items-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 hover:border-[#D4AF37] text-gray-700 hover:text-[#D4AF37] font-medium rounded-full transition-all hover:scale-105"
              >
                <History className="w-5 h-5" />
                <span className="hidden lg:inline">Riwayat Pembayaran</span>
              </Link>

              <Link
                href="/upgrade"
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-full shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all hover:scale-105"
              >
                <Crown className="w-5 h-5" />
                <span className="hidden sm:inline">Upgrade</span>
              </Link>

              <Link
                href={planStatus && invitations.length >= planStatus.invitationLimit ? '/upgrade' : '/create-invitation'}
                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E] text-white font-semibold rounded-full shadow-lg shadow-[#D4AF37]/40 hover:shadow-xl hover:shadow-[#D4AF37]/50 transition-all hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <Plus className="w-5 h-5 relative z-10" />
                <span className="relative z-10 hidden sm:inline">
                  {planStatus && invitations.length >= planStatus.invitationLimit ? 'Upgrade untuk Buat Undangan' : 'Buat Undangan Baru'}
                </span>
                <span className="relative z-10 sm:hidden">Buat</span>
              </Link>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-3 bg-white border-2 border-gray-200 hover:border-red-500 text-gray-700 hover:text-red-600 font-medium rounded-full transition-all hover:scale-105"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 tracking-tight">
            Undangan Saya
          </h1>
          <p className="text-lg text-gray-600">
            Kelola undangan pernikahan Anda
          </p>
        </div>

        {/* Payment Rejected Alert */}
        {latestRejected && (
          <div className="mb-6 relative">
            <div className="flex flex-col sm:flex-row items-start gap-4 p-5 bg-red-50 border-2 border-red-200 rounded-2xl">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-1">Pembayaran Anda Ditolak</p>
                <p className="text-sm text-gray-600">
                  Konfirmasi pembayaran paket {latestRejected.plan} tidak dapat diverifikasi.
                  {latestRejected.admin_note && (
                    <> <strong>Alasan:</strong> {latestRejected.admin_note}</>
                  )}
                </p>
                <Link
                  href="/upgrade"
                  className="inline-block mt-3 text-sm font-semibold text-red-600 hover:text-red-700 underline"
                >
                  Coba lagi →
                </Link>
              </div>
              <button
                onClick={handleDismissRejected}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Plan Status Banner */}
        {planStatus && (
          <div className="mb-8">
            {planStatus.plan === 'free' ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Anda belum berlangganan paket</p>
                  <p className="text-sm text-gray-600">Upgrade untuk mulai membuat undangan pernikahan digital</p>
                </div>
                <Link
                  href="/upgrade"
                  className="flex-shrink-0 px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#C19B2E] text-white font-semibold rounded-full text-sm shadow-md hover:shadow-lg transition-all"
                >
                  Upgrade Sekarang
                </Link>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Crown className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    Paket {PLAN_LABELS[planStatus.plan]} Aktif
                  </p>
                  <p className="text-sm text-gray-600">
                    {invitations.length} / {planStatus.invitationLimit === Infinity ? '∞' : planStatus.invitationLimit} undangan digunakan
                    {planStatus.expiresAt && ` · Berlaku sampai ${new Date(planStatus.expiresAt).toLocaleDateString('id-ID')}`}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {invitations.length === 0 ? (
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E] rounded-3xl opacity-20 blur-lg"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-white/40 shadow-xl p-12 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-[#D4AF37]/10 to-[#C19B2E]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-[#D4AF37]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Belum Ada Undangan
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Buat undangan pernikahan digital pertama Anda dengan template elegan yang tersedia
              </p>
              <Link
                href="/create-invitation"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E] text-white font-semibold text-lg rounded-full shadow-xl shadow-[#D4AF37]/40 hover:shadow-2xl hover:shadow-[#D4AF37]/50 transition-all hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <Plus className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Buat Undangan Sekarang</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {invitations.map((inv) => (
              <div
                key={inv.id}
                className="group relative"
              >
                {/* Gradient Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#A8C5A9] rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>
                
                <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-transparent shadow-lg hover:shadow-2xl transition-all duration-300">
                  {/* Header Card */}
                  <div className="relative bg-gradient-to-br from-[#D4AF37] via-[#E5C158] to-[#C19B2E] p-8 text-center overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                    
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold text-white mb-2 font-serif drop-shadow-lg">
                        {inv.bride_name} & {inv.groom_name}
                      </h3>
                      <div className="flex items-center justify-center gap-2 text-white/90 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{inv.resepsi_date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 border-b border-gray-100">
                    <div className="p-4 text-center border-r border-gray-100">
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600">
                        {inv.hadir_count}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                        Hadir
                      </div>
                    </div>

                    <div className="p-4 text-center border-r border-gray-100">
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#C19B2E]">
                        {inv.rsvp_count}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                        Total RSVP
                      </div>
                    </div>

                    <div className="p-4 text-center">
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-600">
                        {inv.wish_count}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                        Ucapan
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-6 space-y-3">
                    {/* Primary Action */}
                    <Link
                      href={`/undangan/${inv.slug}`}
                      target="_blank"
                      className="group/btn relative block w-full px-4 py-3 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E] text-white font-semibold text-center rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                      <div className="relative z-10 flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span>Lihat Undangan</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </Link>

                    {/* Dashboard Link */}
                    <Link
                      href={`/my-invitations/${inv.id}`}
                      className="block w-full px-4 py-3 bg-white border-2 border-gray-200 hover:border-[#D4AF37] text-gray-700 hover:text-[#D4AF37] font-medium text-center rounded-xl transition-all"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        <span>Dashboard & Statistik</span>
                      </div>
                    </Link>

                    {/* Copy Link */}
                    <button
                      onClick={() => {
                        const link = `${window.location.origin}/undangan/${inv.slug}`
                        navigator.clipboard.writeText(link)
                        alert('Link berhasil disalin! 📋')
                      }}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-medium text-center rounded-xl transition-all"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Copy className="w-4 h-4" />
                        <span>Salin Link</span>
                      </div>
                    </button>

                    {/* WhatsApp Share */}
                    <a 
                      href={`https://wa.me/?text=Hai! Kami mengundang kamu ke pernikahan kami. Lihat undangannya di: ${window.location.origin}/undangan/${inv.slug}`}
                      target="_blank"
                      className="block w-full px-4 py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-medium text-center rounded-xl transition-all shadow-md hover:shadow-lg"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Share2 className="w-4 h-4" />
                        <span>Share via WhatsApp</span>
                      </div>
                    </a>

                    {/* Edit, Duplicate, Delete Grid */}
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <Link
                        href={`/my-invitations/${inv.id}/edit`}
                        className="px-3 py-2.5 bg-white border-2 border-blue-500 hover:bg-blue-500 text-blue-600 hover:text-white font-medium text-center rounded-lg transition-all text-sm"
                      >
                        <Edit className="w-4 h-4 mx-auto mb-1" />
                        <span className="text-xs">Edit</span>
                      </Link>

                      <button
                        onClick={() => handleDuplicate(inv)}
                        className="px-3 py-2.5 bg-white border-2 border-green-500 hover:bg-green-500 text-green-600 hover:text-white font-medium text-center rounded-lg transition-all text-sm"
                      >
                        <Files className="w-4 h-4 mx-auto mb-1" />
                        <span className="text-xs">Duplikat</span>
                      </button>
                      
                      <button
                        onClick={() => handleDelete(inv.id)}
                        className="px-3 py-2.5 bg-white border-2 border-red-500 hover:bg-red-500 text-red-600 hover:text-white font-medium text-center rounded-lg transition-all text-sm"
                      >
                        <Trash2 className="w-4 h-4 mx-auto mb-1" />
                        <span className="text-xs">Hapus</span>
                      </button>
                    </div>
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