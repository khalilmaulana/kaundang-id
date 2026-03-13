'use client'
import Link from 'next/link'
import { Heart, ArrowRight, Play, Palette, UserCheck, Image as ImageIcon, MapPin, MessageSquare, Music, Check, Sparkles, Menu, X, FileEdit, Share2, Star, Quote, Mail, Phone, Facebook, Instagram, Twitter, Eye, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#fitur', label: 'Fitur' },
    { href: '#template', label: 'Template' },
    { href: '#harga', label: 'Harga' },
    { href: '#kontak', label: 'Kontak' },
  ]

  const features = [
    {
      icon: Palette,
      title: 'Desain Elegan & Modern',
      description: 'Template undangan dengan desain premium yang menarik dan mudah dikustomisasi sesuai tema pernikahanmu.',
    },
    {
      icon: UserCheck,
      title: 'RSVP Tamu',
      description: 'Fitur konfirmasi kehadiran tamu yang memudahkan kamu mengelola daftar undangan dengan praktis.',
    },
    {
      icon: ImageIcon,
      title: 'Galeri Foto & Video',
      description: 'Tampilkan momen-momen indah kalian dalam galeri yang elegan dengan dukungan foto dan video.',
    },
    {
      icon: MapPin,
      title: 'Peta Lokasi Google Maps',
      description: 'Integrasi langsung dengan Google Maps agar tamu mudah menemukan lokasi acara pernikahanmu.',
    },
    {
      icon: MessageSquare,
      title: 'Buku Tamu & Ucapan',
      description: 'Terima ucapan dan doa dari tamu undangan yang tersimpan rapi dalam buku tamu digital.',
    },
    {
      icon: Music,
      title: 'Musik Latar',
      description: 'Tambahkan musik favorit kalian untuk menciptakan suasana romantis saat tamu membuka undangan.',
    },
  ]

  const stats = [
    { value: '500+', label: 'Pasangan Bahagia' },
    { value: '50+', label: 'Template Elegan' },
    { value: '4.9', label: 'Rating Pengguna' },
  ]

  const templates = [
    {
      id: 1,
      name: 'Classic Elegance',
      category: 'Modern',
      image: 'https://images.unsplash.com/photo-1581720848085-1b499512804f?w=400&q=80',
      likes: 234,
    },
    {
      id: 2,
      name: 'Garden Romance',
      category: 'Natural',
      image: 'https://images.unsplash.com/photo-1721747994983-96d23e197487?w=400&q=80',
      likes: 189,
    },
    {
      id: 3,
      name: 'Golden Luxury',
      category: 'Premium',
      image: 'https://images.unsplash.com/photo-1738694242379-ef21044985bb?w=400&q=80',
      likes: 312,
    },
    {
      id: 4,
      name: 'Minimalist Love',
      category: 'Simple',
      image: 'https://images.unsplash.com/photo-1619010539735-92149716db70?w=400&q=80',
      likes: 267,
    },
  ]

  const steps = [
    {
      number: '01',
      icon: Palette,
      title: 'Pilih Template',
      description: 'Pilih template favorit dari koleksi desain kami yang elegan dan modern.',
    },
    {
      number: '02',
      icon: FileEdit,
      title: 'Isi Data Acara',
      description: 'Lengkapi informasi pernikahan, foto, dan detail acara dengan mudah.',
    },
    {
      number: '03',
      icon: Share2,
      title: 'Bagikan ke Tamu',
      description: 'Bagikan undangan digital melalui WhatsApp, email, atau media sosial.',
    },
  ]

  const plans = [
    {
      name: 'Basic',
      price: '99.000',
      period: 'sekali bayar',
      description: 'Cocok untuk acara sederhana',
      features: [
        '1 Template Undangan',
        'RSVP Tamu (maks 100)',
        'Galeri Foto (10 foto)',
        'Google Maps',
        'Buku Tamu Digital',
        'Musik Latar',
      ],
      highlighted: false,
    },
    {
      name: 'Premium',
      price: '199.000',
      period: 'sekali bayar',
      description: 'Paling populer untuk pernikahan',
      features: [
        'Semua fitur Basic',
        'Pilihan 10+ Template Premium',
        'RSVP Unlimited',
        'Galeri Foto & Video Unlimited',
        'Custom Domain',
        'Love Story Timeline',
        'Countdown Timer',
        'Support Prioritas',
      ],
      highlighted: true,
    },
    {
      name: 'Exclusive',
      price: '349.000',
      period: 'sekali bayar',
      description: 'Solusi premium & eksklusif',
      features: [
        'Semua fitur Premium',
        'Custom Design Eksklusif',
        'Video Background',
        'Filter Instagram',
        'Live Streaming Integration',
        'Gift Registry',
        'Analytics Dashboard',
        'Free Revisi 3x',
      ],
      highlighted: false,
    },
  ]

  const testimonials = [
    {
      name: 'Rina & Budi',
      location: 'Jakarta',
      photo: 'https://images.unsplash.com/photo-1768900044120-650653953a6a?w=200&q=80',
      rating: 5,
      review: 'Undangan digitalnya sangat elegan dan mudah digunakan! Tamu-tamu kami terkesan dengan desainnya yang modern. Terima kasih kaundang.id!',
    },
    {
      name: 'Dina & Arif',
      location: 'Bandung',
      photo: 'https://images.unsplash.com/photo-1619010539735-92149716db70?w=200&q=80',
      rating: 5,
      review: 'Fitur RSVP dan buku tamu digital sangat membantu. Kami bisa track semua tamu dengan mudah. Harganya juga sangat terjangkau!',
    },
    {
      name: 'Siti & Yoga',
      location: 'Surabaya',
      photo: 'https://images.unsplash.com/photo-1721747994983-96d23e197487?w=200&q=80',
      rating: 5,
      review: 'Template-nya banyak pilihan dan semuanya cantik! Customer service-nya juga responsif. Recommended banget untuk yang mau bikin undangan digital!',
    },
  ]

  const trustBadges = [
    { icon: CheckCircle, text: 'Setup dalam 5 menit' },
    { icon: CheckCircle, text: 'Tanpa biaya tersembunyi' },
    { icon: CheckCircle, text: 'Support 24/7' },
  ]

  const footerLinks = {
    navigasi: [
      { label: 'Home', href: '#home' },
      { label: 'Fitur', href: '#fitur' },
      { label: 'Template', href: '#template' },
      { label: 'Harga', href: '#harga' },
    ],
    bantuan: [
      { label: 'Tutorial', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Syarat & Ketentuan', href: '#' },
      { label: 'Kebijakan Privasi', href: '#' },
    ],
  }

  const contactInfo = [
    { icon: Mail, text: 'info@kaundang.id' },
    { icon: Phone, text: '+62 812-3456-7890' },
    { icon: MapPin, text: 'Jakarta, Indonesia' },
  ]

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* NAVIGATION - Glassmorphism Enhanced */}
      <nav className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="#home" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] via-[#E5C158] to-[#C19B2E] rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-[#D4AF37]/30">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">kaundang.id</span>
            </a>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="px-4 py-2 text-gray-700 hover:text-[#D4AF37] font-medium transition-all rounded-xl hover:bg-gradient-to-r hover:from-[#FFF8F0] hover:to-transparent relative group">
                  <span className="relative z-10">{link.label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
                </a>
              ))}
            </div>

            <div className="hidden lg:block">
              <Link href="/login" className="relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E] text-white font-semibold rounded-full shadow-lg shadow-[#D4AF37]/40 hover:shadow-xl hover:shadow-[#D4AF37]/50 transition-all hover:scale-105 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative z-10">Buat Undangan</span>
              </Link>
            </div>

            <button className="lg:hidden text-gray-700 p-2 hover:bg-gray-50 rounded-xl transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-white/20 backdrop-blur-xl">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className="px-4 py-3 text-gray-700 hover:text-[#D4AF37] hover:bg-gradient-to-r hover:from-[#FFF8F0] hover:to-transparent rounded-xl font-medium transition-all" onClick={() => setIsMenuOpen(false)}>
                    {link.label}
                  </a>
                ))}
                <div className="pt-2">
                  <Link href="/login" className="block px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C19B2E] text-white font-semibold rounded-full text-center shadow-lg shadow-[#D4AF37]/30">
                    Buat Undangan
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* HERO - With Floating Elements */}
      <section id="home" className="relative pt-20 pb-0 min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80" 
            alt="Wedding Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-white/90"></div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/20 to-[#A8C5A9]/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-[#A8C5A9]/20 to-[#D4AF37]/20 rounded-full blur-2xl animate-pulse delay-75"></div>

        {/* Content - Centered */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center py-20">
          <div className="space-y-10">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
                Buat Undangan Pernikahan Digital yang{' '}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E]">
                    Elegan
                  </span>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E] rounded-full opacity-30"></div>
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-medium">
                Bagikan momen bahagiamu dengan undangan digital yang modern, praktis, dan berkesan.
              </p>
            </div>
            
            {/* CTA Buttons - Enhanced */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/register" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E] text-white font-semibold text-lg rounded-full shadow-xl shadow-[#D4AF37]/40 hover:shadow-2xl hover:shadow-[#D4AF37]/50 transition-all hover:scale-105 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative z-10">Buat Undangan Sekarang</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#demo" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/90 backdrop-blur-sm text-gray-700 font-semibold text-lg border-2 border-gray-200 hover:border-[#D4AF37] hover:text-[#D4AF37] rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Lihat Demo
              </a>
            </div>

            {/* Stats - With Glassmorphism */}
            <div className="grid grid-cols-3 gap-8 pt-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-[#A8C5A9]/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                  <div className="relative bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white/40 shadow-lg">
                    <div className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E]">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-700 mt-2 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES - Gradient Borders */}
      <section id="fitur" className="py-16 lg:py-24 bg-gradient-to-b from-white to-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Fitur Lengkap untuk Undangan Digital</h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">Semua yang kamu butuhkan untuk membuat undangan pernikahan digital yang sempurna</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="group relative">
                  {/* Gradient Border Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#A8C5A9] rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>
                  
                  <div className="relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-transparent transition-all duration-300 h-full">
                    <div className="mb-6">
                      <div className="inline-flex w-14 h-14 bg-gradient-to-br from-[#D4AF37] via-[#E5C158] to-[#C19B2E] rounded-xl items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-[#D4AF37]/30">
                        <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* TEMPLATES - Enhanced Cards */}
      <section id="template" className="py-16 lg:py-24 bg-gradient-to-b from-[#FAFAFA] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Template Undangan Premium</h2>
            <p className="text-lg lg:text-xl text-gray-600">Pilih dari koleksi template yang dirancang khusus untuk pernikahan impianmu</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {templates.map((template) => (
              <div key={template.id} className="group relative">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/50 via-[#E5C158]/50 to-[#A8C5A9]/50 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500"></div>
                
                <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-transparent shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <img src={template.image} alt={template.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                      <button className="bg-white/95 backdrop-blur-sm text-gray-900 px-6 py-2.5 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-white transition-colors mb-3 shadow-xl">
                        <Eye className="w-4 h-4" /> Lihat Detail
                      </button>
                      <div className="flex items-center justify-between text-white">
                        <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">{template.category}</span>
                        <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          <Heart className="w-4 h-4 fill-white" />
                          <span className="text-sm font-medium">{template.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 bg-gradient-to-b from-white to-gray-50/50">
                    <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                    <span className="inline-block bg-gradient-to-r from-[#A8C5A9]/20 to-[#A8C5A9]/10 text-[#4A6F4D] text-xs px-3 py-1 rounded-full font-medium">{template.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/templates" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E] text-white font-semibold text-lg rounded-full shadow-xl shadow-[#D4AF37]/40 hover:shadow-2xl hover:shadow-[#D4AF37]/50 transition-all hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10">Lihat Semua Template</span>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - 3D Effect */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Cara Kerjanya Sangat Mudah</h2>
            <p className="text-lg lg:text-xl text-gray-600">Buat undangan pernikahan digital hanya dalam 3 langkah sederhana</p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" style={{ width: 'calc(100% - 240px)', left: '120px' }}></div>

            <div className="grid md:grid-cols-3 gap-12 lg:gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={index} className="relative text-center group">
                    {/* Number Badge - Enhanced */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-14 bg-gradient-to-br from-[#D4AF37] via-[#E5C158] to-[#C19B2E] rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-xl shadow-[#D4AF37]/40 z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      {step.number}
                    </div>

                    <div className="relative pt-12 pb-6">
                      {/* Glow Background */}
                      <div className="absolute inset-0 flex justify-center items-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-[#D4AF37]/20 to-[#A8C5A9]/20 rounded-full blur-2xl group-hover:blur-3xl transition-all"></div>
                      </div>
                      
                      <div className="relative inline-flex w-32 h-32 bg-gradient-to-br from-[#FFF8F0] to-white rounded-3xl items-center justify-center border border-gray-100 shadow-xl group-hover:shadow-2xl transition-all">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#D4AF37] via-[#E5C158] to-[#C19B2E] rounded-2xl flex items-center justify-center shadow-lg shadow-[#D4AF37]/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING - Glassmorphism Cards */}
      <section id="harga" className="py-16 lg:py-24 bg-gradient-to-b from-[#FAFAFA] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Harga Terjangkau untuk Semua</h2>
            <p className="text-lg lg:text-xl text-gray-600">Pilih paket yang sesuai dengan kebutuhan dan budget pernikahanmu</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan, index) => (
              <div key={index} className="group relative">
                {/* Gradient Glow */}
                {plan.highlighted && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E] rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-all"></div>
                )}
                
                <div className={`relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border transition-all duration-300 h-full ${plan.highlighted ? 'border-[#D4AF37]/50 shadow-2xl shadow-[#D4AF37]/20 md:scale-105' : 'border-gray-200 hover:border-[#D4AF37]/30 hover:shadow-xl'}`}>
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E] text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-xl shadow-[#D4AF37]/40 whitespace-nowrap">
                        <Sparkles className="w-4 h-4" /> Paling Populer
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8 mt-2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-sm text-gray-600 mb-6">{plan.description}</p>
                    <div className="flex items-end justify-center gap-1 mb-2">
                      <span className="text-2xl font-bold text-gray-900">Rp</span>
                      <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E]">
                        {plan.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{plan.period}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 shadow-md ${plan.highlighted ? 'bg-gradient-to-br from-[#D4AF37] to-[#C19B2E]' : 'bg-gradient-to-br from-[#A8C5A9] to-[#8BB08D]'}`}>
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-gray-700 leading-tight text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/register" className={`group/btn relative block w-full px-6 py-3 font-semibold rounded-full text-center transition-all overflow-hidden ${plan.highlighted ? 'bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E] text-white shadow-lg shadow-[#D4AF37]/40 hover:shadow-xl hover:shadow-[#D4AF37]/50' : 'bg-white text-gray-700 border-2 border-[#D4AF37] hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#C19B2E] hover:text-white hover:border-transparent'}`}>
                    {plan.highlighted && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                    )}
                    <span className="relative z-10">Pilih Paket {plan.name}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40 max-w-2xl mx-auto shadow-lg">
            <p className="text-gray-700">
              <span className="text-2xl mr-2">💯</span>
              <span className="font-semibold">Garansi uang kembali 100%</span> jika tidak puas dalam 7 hari
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - Enhanced */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Apa Kata Mereka?</h2>
            <p className="text-lg lg:text-xl text-gray-600">Testimoni dari pasangan bahagia yang telah menggunakan layanan kami</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group relative">
                {/* Gradient Background */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#D4AF37]/30 to-[#A8C5A9]/30 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>
                
                <div className="relative bg-gradient-to-br from-[#FFF8F0]/80 to-white/80 backdrop-blur-sm p-8 rounded-2xl border border-white/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <div className="absolute top-6 right-6 opacity-10">
                    <Quote className="w-16 h-16 text-[#D4AF37]" />
                  </div>

                  <div className="relative z-10 space-y-6">
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37] drop-shadow-sm" />
                      ))}
                    </div>

                    <p className="text-gray-700 leading-relaxed font-medium">"{testimonial.review}"</p>

                    <div className="flex items-center gap-4 pt-4 border-t border-gray-200/50">
                      <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#D4AF37]/30 shadow-lg">
                        <img src={testimonial.photo} alt={testimonial.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Enhanced Gradient */}
      <section id="demo" className="relative py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#D4AF37] via-[#E5C158] to-[#C19B2E] overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl animate-pulse delay-75"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl shadow-black/20">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>

          <div className="space-y-6 mb-10">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight drop-shadow-lg">Siap Membuat Undangan Digitalmu?</h2>
            <p className="text-lg sm:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed drop-shadow">Mulai buat undangan pernikahan digital yang elegan dan berkesan hanya dalam hitungan menit</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/register" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#D4AF37] font-semibold text-lg rounded-full shadow-2xl hover:shadow-white/50 transition-all hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10">Buat Undangan Sekarang</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#template" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold text-lg border-2 border-white/30 hover:bg-white/20 hover:border-white/50 rounded-full transition-all shadow-xl hover:scale-105">
              Lihat Demo Gratis
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon
              return (
                <div key={index} className="flex items-center gap-2.5 text-white/95 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{badge.text}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="kontak" className="bg-gradient-to-b from-gray-900 to-black text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <a href="#home" className="flex items-center gap-2.5 mb-6 group">
                <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] via-[#E5C158] to-[#C19B2E] rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg shadow-[#D4AF37]/30">
                  <Heart className="w-5 h-5 text-white fill-white" />
                </div>
                <span className="text-xl font-bold text-white">kaundang.id</span>
              </a>
              <p className="text-gray-400 leading-relaxed mb-6 text-sm">Buat undangan pernikahan digital yang elegan, modern, dan berkesan untuk hari spesialmu.</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <a key={index} href={social.href} aria-label={social.label} className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-[#D4AF37] hover:to-[#C19B2E] transition-all hover:scale-110 hover:rotate-3">
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Navigasi</h3>
              <ul className="space-y-3">
                {footerLinks.navigasi.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm hover:translate-x-1 inline-block">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Bantuan</h3>
              <ul className="space-y-3">
                {footerLinks.bantuan.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm hover:translate-x-1 inline-block">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Kontak Kami</h3>
              <ul className="space-y-4">
                {contactInfo.map((contact, index) => {
                  const Icon = contact.icon
                  return (
                    <li key={index} className="flex items-start gap-3 group">
                      <Icon className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-gray-400 text-sm">{contact.text}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm text-center sm:text-left">© 2025 kaundang.id. Semua hak cipta dilindungi.</p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Kebijakan Privasi</a>
                <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">Syarat Layanan</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}