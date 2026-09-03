'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Heart, ArrowLeft, Check, Crown, Sparkles, Star } from 'lucide-react'

export default function UpgradePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login?redirect=%2Fupgrade')
    } else {
      setUser(user)
      setLoading(false)
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

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 99000,
      icon: Sparkles,
      color: 'from-blue-500 to-blue-600',
      features: [
        '1 Undangan Digital',
        'Template Standard',
        'RSVP Online',
        'Ucapan & Doa',
        'Bagikan via Link & WhatsApp',
        'Berlaku 3 Bulan'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 199000,
      icon: Star,
      color: 'from-[#D4AF37] to-[#C19B2E]',
      popular: true,
      features: [
        'Semua fitur Basic',
        'Semua Template Premium',
        'Guest List & Personalized Link',
        'Import/Export Excel',
        'Musik Latar Custom',
        'Galeri Foto (10 foto)',
        'Berlaku 6 Bulan'
      ]
    },
    {
      id: 'exclusive',
      name: 'Exclusive',
      price: 349000,
      icon: Crown,
      color: 'from-purple-500 to-purple-600',
      features: [
        'Semua fitur Premium',
        'Galeri Foto Unlimited',
        'QR Code Check-in',
        'WhatsApp Blast ke Semua Tamu',
        'Custom Domain',
        'Prioritas Support',
        'Berlaku Selamanya'
      ]
    }
  ]

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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D4AF37]/10 to-[#E5C158]/10 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm font-semibold text-[#D4AF37]">Pilih Paket</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">Upgrade Paket Anda</h1>
          <p className="text-lg text-gray-600">Pilih paket yang sesuai untuk undangan pernikahan digital Anda</p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon
            return (
              <div
                key={plan.id}
                className={`relative group ${plan.popular ? 'md:-translate-y-4' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="px-4 py-1.5 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E] text-white text-xs font-bold rounded-full shadow-lg">
                      PALING POPULER
                    </div>
                  </div>
                )}

                <div className={`absolute -inset-0.5 bg-gradient-to-r ${plan.color} rounded-2xl opacity-0 group-hover:opacity-30 blur transition-all duration-500 ${plan.popular ? 'opacity-20' : ''}`}></div>

                <div className={`relative bg-white rounded-2xl border-2 ${plan.popular ? 'border-[#D4AF37]' : 'border-gray-100'} shadow-xl overflow-hidden h-full flex flex-col`}>
                  {/* Header */}
                  <div className="p-8 text-center border-b border-gray-100">
                    <div className={`w-14 h-14 bg-gradient-to-br ${plan.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-sm text-gray-500">Rp</span>
                      <span className="text-4xl font-bold text-gray-900">{plan.price.toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-8 flex-1 flex flex-col">
                    <ul className="space-y-4 mb-8 flex-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className={`w-5 h-5 bg-gradient-to-br ${plan.color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/payment?plan=${plan.id}`}
                      className={`group/btn relative block w-full px-6 py-4 text-center font-semibold rounded-xl transition-all hover:scale-105 overflow-hidden ${
                        plan.popular
                          ? 'bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E] text-white shadow-lg shadow-[#D4AF37]/40'
                          : 'bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                      )}
                      <span className="relative z-10">Pilih {plan.name}</span>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Info Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Pembayaran melalui transfer bank manual. Verifikasi dilakukan dalam 1x24 jam setelah bukti transfer diupload.
          </p>
        </div>
      </div>
    </div>
  )
}
