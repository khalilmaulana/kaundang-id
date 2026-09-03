'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Heart, ArrowLeft, Copy, Upload, X, CheckCircle2, Building2, Clock, AlertCircle } from 'lucide-react'

const PLAN_DETAILS: Record<string, { name: string; price: number }> = {
  basic: { name: 'Basic', price: 99000 },
  premium: { name: 'Premium', price: 199000 },
  exclusive: { name: 'Exclusive', price: 349000 }
}

const BANK_ACCOUNTS = [
  { bank: 'BCA', accountNumber: '1234567890', accountName: 'PT Kaundang Digital Indonesia' },
  { bank: 'Mandiri', accountNumber: '0987654321', accountName: 'PT Kaundang Digital Indonesia' },
]

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const planId = searchParams.get('plan') || 'basic'
  const plan = PLAN_DETAILS[planId] || PLAN_DETAILS.basic

  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [proofImage, setProofImage] = useState<string | null>(null)
  const [senderName, setSenderName] = useState('')
  const [senderBank, setSenderBank] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      const redirectTo = encodeURIComponent(`/payment?plan=${planId}`)
      router.push(`/login?redirect=${redirectTo}`)
    } else {
      setUser(user)
      setLoading(false)
    }
  }

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setProofImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!proofImage) {
      alert('Mohon upload bukti transfer')
      return
    }

    setSubmitting(true)

    const { error } = await supabase
      .from('payments')
      .insert([{
        user_id: user.id,
        plan: planId,
        amount: plan.price,
        sender_name: senderName,
        sender_bank: senderBank,
        proof_image: proofImage,
        notes,
        status: 'pending'
      }])

    if (error) {
      alert('Error: ' + error.message)
      setSubmitting(false)
    } else {
      setSubmitted(true)
      setSubmitting(false)
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

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-lg text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
            <Clock className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Menunggu Verifikasi</h1>
          <p className="text-gray-600 mb-2">
            Bukti transfer Anda untuk paket <strong className="text-[#D4AF37]">{plan.name}</strong> telah kami terima.
          </p>
          <p className="text-gray-600 mb-8">
            Tim kami akan memverifikasi pembayaran dalam <strong>1x24 jam</strong>. Anda akan mendapat notifikasi setelah paket aktif.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/payment/history"
              className="px-8 py-4 bg-white border-2 border-gray-200 hover:border-[#D4AF37] text-gray-700 hover:text-[#D4AF37] font-semibold rounded-xl transition-all"
            >
              Lihat Status Pembayaran
            </Link>
            <Link
              href="/my-invitations"
              className="group relative px-8 py-4 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10">Kembali ke Undangan Saya</span>
            </Link>
          </div>
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

            <Link
              href="/upgrade"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 hover:border-[#D4AF37] text-gray-700 hover:text-[#D4AF37] font-medium rounded-full transition-all hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Ganti Paket</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Pembayaran</h1>
          <p className="text-lg text-gray-600">Selesaikan pembayaran untuk mengaktifkan paket Anda</p>
        </div>

        {/* Order Summary */}
        <div className="relative mb-6">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E] rounded-2xl opacity-20 blur"></div>
          <div className="relative bg-white rounded-2xl border border-gray-100 shadow-xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Paket dipilih</span>
              <span className="font-bold text-gray-900 text-lg">{plan.name}</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-gray-600">Total Pembayaran</span>
              <span className="font-bold text-2xl bg-gradient-to-r from-[#D4AF37] to-[#C19B2E] bg-clip-text text-transparent">
                Rp {plan.price.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        {/* Bank Transfer Info */}
        <div className="relative mb-6">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-2xl opacity-20 blur"></div>
          <div className="relative bg-white rounded-2xl border border-gray-100 shadow-xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Transfer ke Rekening Berikut</h2>
            </div>

            <div className="space-y-4">
              {BANK_ACCOUNTS.map((account, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-gray-900 text-lg">{account.bank}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xl text-gray-900 tracking-wide">{account.accountNumber}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(account.accountNumber, index)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:border-[#D4AF37] rounded-lg text-sm text-gray-600 hover:text-[#D4AF37] transition-all"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedIndex === index ? 'Tersalin!' : 'Salin'}
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">a.n. {account.accountName}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                Transfer sesuai nominal <strong>Rp {plan.price.toLocaleString('id-ID')}</strong> agar verifikasi lebih cepat.
              </p>
            </div>
          </div>
        </div>

        {/* Upload Proof Form */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 rounded-2xl opacity-20 blur"></div>
          <div className="relative bg-white rounded-2xl border border-gray-100 shadow-xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Konfirmasi Pembayaran</h2>
            </div>

            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Pengirim *</label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Nama sesuai rekening pengirim"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Pengirim *</label>
                  <input
                    type="text"
                    value={senderBank}
                    onChange={(e) => setSenderBank(e.target.value)}
                    placeholder="Contoh: BCA, Mandiri, BNI"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bukti Transfer *</label>
                {!proofImage ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#D4AF37] transition-all">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProofUpload}
                      className="hidden"
                      id="proof-upload"
                    />
                    <label htmlFor="proof-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 font-medium mb-1">Click untuk upload bukti transfer</p>
                      <p className="text-sm text-gray-500">PNG, JPG hingga 10MB</p>
                    </label>
                  </div>
                ) : (
                  <div className="relative inline-block">
                    <img src={proofImage} alt="Bukti transfer" className="max-h-64 rounded-xl border-2 border-gray-200" />
                    <button
                      type="button"
                      onClick={() => setProofImage(null)}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Catatan (Opsional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Catatan tambahan untuk admin..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="group/btn relative w-full px-6 py-4 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E] text-white font-bold text-lg rounded-xl shadow-lg shadow-[#D4AF37]/40 hover:shadow-xl hover:shadow-[#D4AF37]/50 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Mengirim...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-6 h-6" />
                      <span>Kirim Konfirmasi Pembayaran</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}