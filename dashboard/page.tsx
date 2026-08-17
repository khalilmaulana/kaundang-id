'use client'
import Link from 'next/link'
import { Heart, Plus, Eye, Users, MessageSquare, BarChart3, Settings, LogOut, Menu, X, FileText, Calendar, Share2, Edit, ExternalLink, Crown, ArrowRight, TrendingUp, Clock, CheckCircle2, Sparkles } from 'lucide-react'
import { useState } from 'react'

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Dummy user data (nanti dari auth/database)
  const user = {
    name: 'Khalil Maulana',
    email: 'khalil@example.com',
    plan: 'Premium', // 'Basic', 'Premium', 'Exclusive'
    avatar: 'https://ui-avatars.com/api/?name=Khalil+Maulana&background=D4AF37&color=fff',
  }

  const stats = [
    {
      label: 'Total Undangan',
      value: '3',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      change: '+1 bulan ini',
    },
    {
      label: 'Total Views',
      value: '1,247',
      icon: Eye,
      color: 'from-[#D4AF37] to-[#C19B2E]',
      bgColor: 'from-[#FFF8F0] to-[#FFE5D9]',
      change: '+342 minggu ini',
    },
    {
      label: 'RSVP Diterima',
      value: '89',
      icon: CheckCircle2,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      change: '12 hari ini',
    },
    {
      label: 'Ucapan Tamu',
      value: '156',
      icon: MessageSquare,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      change: '+23 hari ini',
    },
  ]

  const recentInvitations = [
    {
      id: 1,
      title: 'Sarah & Alex Wedding',
      slug: 'sarah-alex',
      template: 'Gold Cream',
      status: 'active',
      views: 847,
      rsvp: 64,
      date: '25 Des 2025',
      createdAt: '2 hari lalu',
    },
    {
      id: 2,
      title: 'Dina & Budi Engagement',
      slug: 'dina-budi',
      template: 'Modern Minimal',
      status: 'active',
      views: 312,
      rsvp: 18,
      date: '15 Jan 2026',
      createdAt: '1 minggu lalu',
    },
    {
      id: 3,
      title: 'Test Invitation',
      slug: 'test-123',
      template: 'Floral Romantic',
      status: 'draft',
      views: 5,
      rsvp: 0,
      date: '-',
      createdAt: '3 minggu lalu',
    },
  ]

  const quickActions = [
    { label: 'Buat Undangan Baru', icon: Plus, href: '/dashboard/create', color: 'from-[#D4AF37] to-[#C19B2E]' },
    { label: 'Lihat Semua Template', icon: FileText, href: '/templates', color: 'from-blue-500 to-blue-600' },
    { label: 'Kelola Guest List', icon: Users, href: '/dashboard/guests', color: 'from-purple-500 to-purple-600' },
    { label: 'Lihat Statistik', icon: BarChart3, href: '/dashboard/analytics', color: 'from-green-500 to-green-600' },
  ]

  const sidebarLinks = [
    { label: 'Dashboard', icon: BarChart3, href: '/dashboard', active: true },
    { label: 'Undangan Saya', icon: FileText, href: '/dashboard/invitations' },
    { label: 'Guest List', icon: Users, href: '/dashboard/guests' },
    { label: 'RSVP & Ucapan', icon: MessageSquare, href: '/dashboard/rsvp' },
    { label: 'Statistik', icon: TrendingUp, href: '/dashboard/analytics' },
    { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* TOP NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Mobile Menu */}
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-xl transition-colors"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] via-[#E5C158] to-[#C19B2E] rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-[#D4AF37]/30">
                  <Heart className="w-5 h-5 text-white fill-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">kaundang.id</span>
              </Link>
            </div>

            {/* User Profile Dropdown */}
            <div className="flex items-center gap-4">
              {/* Plan Badge */}
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D4AF37]/10 to-[#C19B2E]/10 rounded-full border border-[#D4AF37]/20">
                <Crown className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm font-semibold text-[#D4AF37]">{user.plan} Plan</span>
              </div>

              {/* User Avatar */}
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full ring-2 ring-[#D4AF37]/30 group-hover:ring-[#D4AF37]/60 transition-all" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* SIDEBAR - Desktop */}
        <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Quick Create Button */}
            <Link href="/dashboard/create" className="group relative block w-full px-4 py-3 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E] text-white font-semibold rounded-xl shadow-lg shadow-[#D4AF37]/40 hover:shadow-xl hover:shadow-[#D4AF37]/50 transition-all hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative z-10 flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                <span>Buat Undangan</span>
              </div>
            </Link>

            {/* Navigation Links */}
            <nav className="space-y-1">
              {sidebarLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <Link
                    key={index}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                      link.active
                        ? 'bg-gradient-to-r from-[#FFF8F0] to-[#FFE5D9] text-[#D4AF37] shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Logout */}
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all w-full">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* SIDEBAR - Mobile */}
        {isSidebarOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsSidebarOpen(false)}>
            <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">Menu</h2>
                  <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <Link href="/dashboard/create" className="block w-full px-4 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C19B2E] text-white font-semibold rounded-xl text-center shadow-lg">
                  <Plus className="w-5 h-5 inline mr-2" />
                  Buat Undangan
                </Link>

                <nav className="space-y-1">
                  {sidebarLinks.map((link, index) => {
                    const Icon = link.icon
                    return (
                      <Link
                        key={index}
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                          link.active ? 'bg-gradient-to-r from-[#FFF8F0] to-[#FFE5D9] text-[#D4AF37]' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{link.label}</span>
                      </Link>
                    )
                  })}
                </nav>

                <button className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all w-full">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* MAIN CONTENT */}
        <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#D4AF37] via-[#E5C158] to-[#C19B2E] rounded-3xl p-8 shadow-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  Selamat Datang, {user.name.split(' ')[0]}! 👋
                </h1>
                <p className="text-white/90 text-lg">
                  Kelola undangan pernikahan digitalmu dengan mudah
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
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
                      <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {stat.change}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <Link
                      key={index}
                      href={action.href}
                      className="group relative bg-white p-6 rounded-2xl border border-gray-200 hover:border-transparent transition-all hover:shadow-xl"
                    >
                      <div className={`absolute -inset-0.5 bg-gradient-to-r ${action.color} rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500`}></div>
                      
                      <div className="relative flex flex-col items-center text-center gap-3">
                        <div className={`w-14 h-14 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <span className="font-semibold text-gray-900">{action.label}</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Recent Invitations */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Undangan Terbaru</h2>
                <Link href="/dashboard/invitations" className="text-[#D4AF37] font-semibold hover:text-[#C19B2E] transition-colors flex items-center gap-2">
                  Lihat Semua
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Undangan</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Template</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Views</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">RSVP</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentInvitations.map((invitation) => (
                        <tr key={invitation.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-semibold text-gray-900">{invitation.title}</p>
                              <p className="text-sm text-gray-500">{invitation.date}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">{invitation.template}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                              invitation.status === 'active'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {invitation.status === 'active' ? 'Active' : 'Draft'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">{invitation.views}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{invitation.rsvp}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Link href={`/${invitation.slug}`} target="_blank" className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Preview">
                                <ExternalLink className="w-4 h-4 text-gray-600" />
                              </Link>
                              <Link href={`/dashboard/edit/${invitation.id}`} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Edit">
                                <Edit className="w-4 h-4 text-gray-600" />
                              </Link>
                              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Share">
                                <Share2 className="w-4 h-4 text-gray-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden divide-y divide-gray-200">
                  {recentInvitations.map((invitation) => (
                    <div key={invitation.id} className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{invitation.title}</p>
                          <p className="text-sm text-gray-500">{invitation.template}</p>
                        </div>
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          invitation.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {invitation.status === 'active' ? 'Active' : 'Draft'}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {invitation.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {invitation.rsvp}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {invitation.date}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <Link href={`/${invitation.slug}`} target="_blank" className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-center text-sm font-medium transition-colors">
                          Preview
                        </Link>
                        <Link href={`/dashboard/edit/${invitation.id}`} className="flex-1 px-4 py-2 bg-[#D4AF37] hover:bg-[#C19B2E] text-white rounded-lg text-center text-sm font-medium transition-colors">
                          Edit
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upgrade CTA (if Basic plan) */}
            {user.plan === 'Basic' && (
              <div className="relative overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-3xl p-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
                
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Crown className="w-6 h-6 text-yellow-300" />
                      <span className="text-yellow-300 font-semibold">Upgrade Plan</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Unlock Premium Features</h3>
                    <p className="text-white/90">Dapatkan unlimited RSVP, custom domain, dan fitur eksklusif lainnya!</p>
                  </div>
                  <Link href="/pricing" className="group px-8 py-4 bg-white text-purple-600 font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 whitespace-nowrap">
                    Upgrade Sekarang
                    <ArrowRight className="w-5 h-5 inline ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
