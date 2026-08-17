'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Heart, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (loginError) {
      setError(loginError.message)
      setLoading(false)
    } else {
      // Redirect to my-invitations
      router.push('/my-invitations')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#A8C5A9]/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#E5C158]/5 to-[#C19B2E]/5 rounded-full blur-3xl"></div>

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo & Back to Home */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] via-[#E5C158] to-[#C19B2E] rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-[#D4AF37]/30">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">kaundang.id</span>
          </Link>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Selamat Datang!</h1>
          <p className="text-gray-600">Login untuk mengelola undangan pernikahan Anda</p>
        </div>

        {/* Card */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E] rounded-3xl opacity-20 group-hover:opacity-30 blur transition-all duration-500"></div>
          
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl p-8">
            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    required
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all bg-white"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]" />
                  <span className="text-sm text-gray-600">Ingat saya</span>
                </label>
                <Link href="/forgot-password" className="text-sm font-medium text-[#D4AF37] hover:text-[#C19B2E] transition-colors">
                  Lupa password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="group/btn relative w-full px-6 py-4 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E] text-white font-bold rounded-xl shadow-lg shadow-[#D4AF37]/40 hover:shadow-xl hover:shadow-[#D4AF37]/50 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                <div className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <span>Masuk</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">atau</span>
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Belum punya akun?{' '}
                <Link href="/register" className="font-semibold text-[#D4AF37] hover:text-[#C19B2E] transition-colors inline-flex items-center gap-1">
                  Daftar sekarang
                  <Sparkles className="w-4 h-4" />
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors inline-flex items-center gap-1">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}