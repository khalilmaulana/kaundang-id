'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Heart, ArrowLeft, Clock, CheckCircle2, XCircle, Calendar, X, ShieldAlert, Filter } from 'lucide-react'

// Ganti dengan email akun admin kamu sendiri
const ADMIN_EMAILS = ['khalilmaulanaid@gmail.com']

const PLAN_NAMES: Record<string, string> = {
  basic: 'Basic',
  premium: 'Premium',
  exclusive: 'Exclusive'
}

export default function AdminPaymentsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')
  const [selectedProof, setSelectedProof] = useState<string | null>(null)
  const [processingId, setProcessingId] = useState<number | null>(null)

  useEffect(() => {
    checkAdminAndFetch()
  }, [])

  const checkAdminAndFetch = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push('/login')
      return
    }

    if (!ADMIN_EMAILS.includes(user.email || '')) {
      router.push('/my-invitations')
      return
    }

    setUser(user)
    await fetchPayments()
    setLoading(false)
  }

  const fetchPayments = async () => {
    const { data } = await supabase
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setPayments(data)
  }

  // Plan duration in months (null = never expires)
  const PLAN_DURATION_MONTHS: Record<string, number | null> = {
    basic: 3,
    premium: 6,
    exclusive: null
  }

  const handleApprove = async (payment: any) => {
    if (!confirm('Setujui pembayaran ini? Paket user akan diaktifkan.')) return

    setProcessingId(payment.id)

    // 1. Update payment status
    const { error: paymentError } = await supabase
      .from('payments')
      .update({
        status: 'approved',
        verified_at: new Date().toISOString()
      })
      .eq('id', payment.id)

    if (paymentError) {
      alert('Error: ' + paymentError.message)
      setProcessingId(null)
      return
    }

    // 2. Activate user's plan
    const durationMonths = PLAN_DURATION_MONTHS[payment.plan] ?? null
    const now = new Date()
    const expiresAt = durationMonths
      ? new Date(now.setMonth(now.getMonth() + durationMonths)).toISOString()
      : null // exclusive = never expires

    const { error: planError } = await supabase
      .from('user_plans')
      .upsert({
        user_id: payment.user_id,
        plan: payment.plan,
        activated_at: new Date().toISOString(),
        expires_at: expiresAt,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' })

    if (planError) {
      alert('Payment disetujui, tapi gagal mengaktifkan paket: ' + planError.message)
    } else {
      alert('✅ Pembayaran disetujui & paket berhasil diaktifkan!')
    }

    await fetchPayments()
    setProcessingId(null)
  }

  const handleReject = async (paymentId: number) => {
    const reason = prompt('Alasan penolakan (akan ditampilkan ke user):')
    if (reason === null) return

    setProcessingId(paymentId)

    const { error } = await supabase
      .from('payments')
      .update({
        status: 'rejected',
        admin_note: reason,
        verified_at: new Date().toISOString()
      })
      .eq('id', paymentId)

    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('Pembayaran ditolak.')
      await fetchPayments()
    }
    setProcessingId(null)
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

  const statusConfig: Record<string, { label: string; icon: any; color: string; bg: string }> = {
    pending: { label: 'Menunggu', icon: Clock, color: 'text-amber-700', bg: 'bg-amber-100' },
    approved: { label: 'Disetujui', icon: CheckCircle2, color: 'text-green-700', bg: 'bg-green-100' },
    rejected: { label: 'Ditolak', icon: XCircle, color: 'text-red-700', bg: 'bg-red-100' }
  }

  const filteredPayments = filter === 'all' ? payments : payments.filter(p => p.status === filter)
  const pendingCount = payments.filter(p => p.status === 'pending').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* TOP NAVBAR */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-lg">
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Admin Panel</span>
            </div>

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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Verifikasi Pembayaran</h1>
          <p className="text-lg text-gray-600">
            {pendingCount > 0 ? (
              <span className="text-amber-600 font-semibold">{pendingCount} pembayaran menunggu verifikasi</span>
            ) : (
              'Semua pembayaran sudah diverifikasi'
            )}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {(['pending', 'approved', 'rejected', 'all'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                filter === f
                  ? 'bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E] text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {f === 'all' ? 'Semua' : statusConfig[f].label}
              {f === 'pending' && pendingCount > 0 && (
                <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${filter === f ? 'bg-white/25' : 'bg-amber-100 text-amber-700'}`}>
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Payments List */}
        {filteredPayments.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-12 text-center">
            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Tidak ada pembayaran di kategori ini</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPayments.map((payment) => {
              const status = statusConfig[payment.status] || statusConfig.pending
              const StatusIcon = status.icon

              return (
                <div key={payment.id} className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-900">
                            Paket {PLAN_NAMES[payment.plan] || payment.plan}
                          </h3>
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.color}`}>
                            <StatusIcon className="w-3.5 h-3.5" />
                            {status.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(payment.created_at).toLocaleString('id-ID')}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          Rp {payment.amount.toLocaleString('id-ID')}
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Nama Pengirim</p>
                        <p className="font-semibold text-gray-900">{payment.sender_name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Bank Pengirim</p>
                        <p className="font-semibold text-gray-900">{payment.sender_bank}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">User ID</p>
                        <p className="font-mono text-xs text-gray-600 truncate">{payment.user_id}</p>
                      </div>
                      {payment.notes && (
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Catatan User</p>
                          <p className="text-sm text-gray-700">{payment.notes}</p>
                        </div>
                      )}
                    </div>

                    {payment.admin_note && payment.status === 'rejected' && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-sm text-red-700">
                          <strong>Alasan penolakan:</strong> {payment.admin_note}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setSelectedProof(payment.proof_image)}
                        className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg text-sm transition-all"
                      >
                        Lihat Bukti Transfer
                      </button>

                      {payment.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(payment)}
                            disabled={processingId === payment.id}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg text-sm hover:shadow-lg transition-all disabled:opacity-50"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Setujui
                          </button>
                          <button
                            onClick={() => handleReject(payment.id)}
                            disabled={processingId === payment.id}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-red-500 text-red-600 font-semibold rounded-lg text-sm hover:bg-red-50 transition-all disabled:opacity-50"
                          >
                            <XCircle className="w-4 h-4" />
                            Tolak
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Proof Image Modal */}
      {selectedProof && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setSelectedProof(null)}
        >
          <div className="relative max-w-2xl w-full">
            <button
              onClick={() => setSelectedProof(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedProof}
              alt="Bukti transfer"
              className="w-full rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )
}