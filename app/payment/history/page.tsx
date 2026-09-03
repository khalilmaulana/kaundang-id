'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Heart, ArrowLeft, Clock, CheckCircle2, XCircle, Calendar } from 'lucide-react'

const PLAN_NAMES: Record<string, string> = {
  basic: 'Basic',
  premium: 'Premium',
  exclusive: 'Exclusive'
}

export default function PaymentHistoryPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUserAndFetch()
  }, [])

  const checkUserAndFetch = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }
    setUser(user)

    const { data } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (data) setPayments(data)
    setLoading(false)
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
    pending: { label: 'Menunggu Verifikasi', icon: Clock, color: 'text-amber-700', bg: 'bg-amber-100' },
    approved: { label: 'Disetujui', icon: CheckCircle2, color: 'text-green-700', bg: 'bg-green-100' },
    rejected: { label: 'Ditolak', icon: XCircle, color: 'text-red-700', bg: 'bg-red-100' }
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Riwayat Pembayaran</h1>
          <p className="text-lg text-gray-600">Status konfirmasi pembayaran paket Anda</p>
        </div>

        {payments.length === 0 ? (
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E] rounded-3xl opacity-20 blur-lg"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-white/40 shadow-xl p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#D4AF37]/10 to-[#C19B2E]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-[#D4AF37]" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Riwayat Pembayaran</h2>
              <p className="text-gray-600 mb-6">Anda belum pernah melakukan pembayaran paket</p>
              <Link
                href="/upgrade"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Lihat Paket
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {payments.map((payment) => {
              const status = statusConfig[payment.status] || statusConfig.pending
              const StatusIcon = status.icon

              return (
                <div key={payment.id} className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#A8C5A9] rounded-2xl opacity-10 blur"></div>
                  <div className="relative bg-white rounded-2xl border border-gray-100 shadow-lg p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          Paket {PLAN_NAMES[payment.plan] || payment.plan}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(payment.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                      </div>

                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${status.bg} ${status.color}`}>
                        <StatusIcon className="w-4 h-4" />
                        {status.label}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-gray-600 text-sm">Jumlah Transfer</span>
                      <span className="font-bold text-lg text-gray-900">
                        Rp {payment.amount.toLocaleString('id-ID')}
                      </span>
                    </div>

                    {payment.status === 'rejected' && payment.admin_note && (
                      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-sm text-red-700">
                          <strong>Catatan Admin:</strong> {payment.admin_note}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
