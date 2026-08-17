'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Heart, ArrowLeft, Users, Calendar, MapPin, Clock, Music, Image as ImageIcon, Palette, Save, Sparkles, Upload, X, Eye } from 'lucide-react'

export default function CreateInvitationPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Form states
  const [brideName, setBrideName] = useState('')
  const [brideFullname, setBrideFullname] = useState('')
  const [brideParents, setBrideParents] = useState('')
  const [groomName, setGroomName] = useState('')
  const [groomFullname, setGroomFullname] = useState('')
  const [groomParents, setGroomParents] = useState('')
  
  const [akadDate, setAkadDate] = useState('')
  const [akadTime, setAkadTime] = useState('')
  const [akadVenue, setAkadVenue] = useState('')
  const [akadAddress, setAkadAddress] = useState('')
  
  const [resepsiDate, setResepsiDate] = useState('')
  const [resepsiTime, setResepsiTime] = useState('')
  const [resepsiVenue, setResepsiVenue] = useState('')
  const [resepsiAddress, setResepsiAddress] = useState('')
  
  const [musicUrl, setMusicUrl] = useState('')
  const [photos, setPhotos] = useState<string[]>([])
  const [template, setTemplate] = useState('gold-cream')

  const [showTemplateModal, setShowTemplateModal] = useState(false)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
    } else {
      setUser(user)
      setLoading(false)
    }
  }

  const generateSlug = () => {
    const bride = brideName.toLowerCase().replace(/\s+/g, '-')
    const groom = groomName.toLowerCase().replace(/\s+/g, '-')
    const timestamp = Date.now().toString().slice(-6)
    return `${bride}-${groom}-${timestamp}`
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotos(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const slug = generateSlug()

    const { data, error } = await supabase
      .from('invitations')
      .insert([{
        user_id: user.id,
        slug,
        bride_name: brideName,
        bride_fullname: brideFullname,
        bride_parents: brideParents,
        groom_name: groomName,
        groom_fullname: groomFullname,
        groom_parents: groomParents,
        akad_date: akadDate,
        akad_time: akadTime,
        akad_venue: akadVenue,
        akad_address: akadAddress,
        resepsi_date: resepsiDate,
        resepsi_time: resepsiTime,
        resepsi_venue: resepsiVenue,
        resepsi_address: resepsiAddress,
        music_url: musicUrl,
        photos,
        template
      }])
      .select()
      .single()

    if (error) {
      alert('Error: ' + error.message)
      setSaving(false)
    } else {
      alert('✅ Undangan berhasil dibuat!')
      router.push(`/my-invitations/${data.id}`)
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

  const templates = [
    { id: 'gold-cream', name: 'Gold Cream', colors: ['#D4A843', '#FAF6EE', '#C9A557'], description: 'Elegan & klasik dengan nuansa emas' },
    { id: 'modern-minimal', name: 'Modern Minimal', colors: ['#2C3E50', '#ECF0F1', '#3498DB'], description: 'Simpel & modern untuk pasangan kontemporer' },
    { id: 'floral-romantic', name: 'Floral Romantic', colors: ['#E8B4B8', '#FFF5F7', '#C48B9F'], description: 'Romantis dengan sentuhan bunga-bunga' },
  { id: 'classic-elegant', name: 'Classic Elegant', colors: ['#D4A843', '#F5F0E8', '#2C2C2C'], description: 'Timeless & sophisticated dengan timeline vertikal' }
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D4AF37]/10 to-[#E5C158]/10 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm font-semibold text-[#D4AF37]">Buat Undangan Baru</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Undangan Pernikahan Digital</h1>
          <p className="text-lg text-gray-600">Isi form di bawah untuk membuat undangan Anda</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SECTION 1: Couple Info */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E] rounded-2xl opacity-20 group-hover:opacity-30 blur transition-all duration-500"></div>
            
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#C19B2E] rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Informasi Mempelai</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Bride */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-700 text-lg">Mempelai Wanita</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Panggilan *</label>
                    <input
                      type="text"
                      value={brideName}
                      onChange={(e) => setBrideName(e.target.value)}
                      placeholder="Contoh: Siti"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap *</label>
                    <input
                      type="text"
                      value={brideFullname}
                      onChange={(e) => setBrideFullname(e.target.value)}
                      placeholder="Contoh: Siti Nurhaliza binti Ahmad"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Putri dari *</label>
                    <input
                      type="text"
                      value={brideParents}
                      onChange={(e) => setBrideParents(e.target.value)}
                      placeholder="Bapak Ahmad & Ibu Fatimah"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all"
                    />
                  </div>
                </div>

                {/* Groom */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-700 text-lg">Mempelai Pria</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Panggilan *</label>
                    <input
                      type="text"
                      value={groomName}
                      onChange={(e) => setGroomName(e.target.value)}
                      placeholder="Contoh: Reza"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap *</label>
                    <input
                      type="text"
                      value={groomFullname}
                      onChange={(e) => setGroomFullname(e.target.value)}
                      placeholder="Contoh: Muhammad Reza bin Abdullah"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Putra dari *</label>
                    <input
                      type="text"
                      value={groomParents}
                      onChange={(e) => setGroomParents(e.target.value)}
                      placeholder="Bapak Abdullah & Ibu Aminah"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Event Details - Akad */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition-all duration-500"></div>
            
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Acara Akad Nikah</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal *</label>
                  <input
                    type="text"
                    value={akadDate}
                    onChange={(e) => setAkadDate(e.target.value)}
                    placeholder="Sabtu, 15 Maret 2025"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Waktu *</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={akadTime}
                      onChange={(e) => setAkadTime(e.target.value)}
                      placeholder="09:00 - 11:00 WIB"
                      required
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi *</label>
                  <input
                    type="text"
                    value={akadVenue}
                    onChange={(e) => setAkadVenue(e.target.value)}
                    placeholder="Masjid Al-Ikhlas"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap *</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      value={akadAddress}
                      onChange={(e) => setAkadAddress(e.target.value)}
                      placeholder="Jl. Merdeka No. 123, Jakarta Selatan"
                      required
                      rows={3}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: Event Details - Resepsi */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition-all duration-500"></div>
            
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Acara Resepsi</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal *</label>
                  <input
                    type="text"
                    value={resepsiDate}
                    onChange={(e) => setResepsiDate(e.target.value)}
                    placeholder="Sabtu, 15 Maret 2025"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Waktu *</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={resepsiTime}
                      onChange={(e) => setResepsiTime(e.target.value)}
                      placeholder="18:00 - 21:00 WIB"
                      required
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi *</label>
                  <input
                    type="text"
                    value={resepsiVenue}
                    onChange={(e) => setResepsiVenue(e.target.value)}
                    placeholder="Gedung Graha Wisata"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap *</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      value={resepsiAddress}
                      onChange={(e) => setResepsiAddress(e.target.value)}
                      placeholder="Jl. Sudirman No. 456, Jakarta Pusat"
                      required
                      rows={3}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: Media */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition-all duration-500"></div>
            
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Media & Musik</h2>
              </div>

              <div className="space-y-6">
                {/* Music URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Link Musik Latar (Opsional)</label>
                  <input
                    type="url"
                    value={musicUrl}
                    onChange={(e) => setMusicUrl(e.target.value)}
                    placeholder="https://example.com/music.mp3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-2">Upload file musik ke hosting (Google Drive, Dropbox, dll) dan paste link-nya di sini</p>
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Foto Gallery (Opsional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#D4AF37] transition-all">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 font-medium mb-1">Click untuk upload foto</p>
                      <p className="text-sm text-gray-500">PNG, JPG hingga 10MB (maksimal 10 foto)</p>
                    </label>
                  </div>

                  {/* Photo Preview */}
                  {photos.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-4">
                      {photos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 5: Template */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition-all duration-500"></div>
            
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                    <Palette className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Pilih Template</h2>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTemplate(t.id)}
                    className={`relative p-6 rounded-xl border-2 transition-all ${
                      template === t.id
                        ? 'border-[#D4AF37] bg-gradient-to-br from-[#D4AF37]/10 to-[#E5C158]/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex gap-2 mb-3">
                      {t.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{t.name}</h3>
                    <p className="text-sm text-gray-600">{t.description}</p>
                    
                    {template === t.id && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={saving}
              className="group/btn relative flex-1 px-8 py-4 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E] text-white font-bold text-lg rounded-xl shadow-lg shadow-[#D4AF37]/40 hover:shadow-xl hover:shadow-[#D4AF37]/50 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative z-10 flex items-center justify-center gap-3">
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-6 h-6" />
                    <span>Buat Undangan</span>
                  </>
                )}
              </div>
            </button>

            <Link
              href="/my-invitations"
              className="flex-shrink-0 px-8 py-4 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold text-lg rounded-xl transition-all hover:scale-[1.02] text-center"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}