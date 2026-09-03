'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Heart, ArrowLeft, Users, Calendar, MapPin, Clock, Music, Palette, Save, Sparkles, Upload, X, Eye, Instagram, BookOpen, Video, Gift, Plus, Trash2 } from 'lucide-react'

export default function EditInvitationPage() {
  const router = useRouter()
  const params = useParams()
  const invitationId = params.id as string

  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [notFound, setNotFound] = useState(false)

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
  const [slug, setSlug] = useState('')

  // Fitur tambahan (Grand Celebration template)
  const [brideInstagram, setBrideInstagram] = useState('')
  const [groomInstagram, setGroomInstagram] = useState('')
  const [bridePhoto, setBridePhoto] = useState('')
  const [groomPhoto, setGroomPhoto] = useState('')
  const [verse1Text, setVerse1Text] = useState('')
  const [verse1Source, setVerse1Source] = useState('')
  const [verse2Text, setVerse2Text] = useState('')
  const [verse2Source, setVerse2Source] = useState('')
  const [mapsAkadUrl, setMapsAkadUrl] = useState('')
  const [mapsResepsiUrl, setMapsResepsiUrl] = useState('')
  const [liveStreamingUrl, setLiveStreamingUrl] = useState('')
  const [instagramFilterUrl, setInstagramFilterUrl] = useState('')
  const [giftBankAccounts, setGiftBankAccounts] = useState<Array<{ bank: string; account_number: string; account_name: string }>>([])
  const [giftRecipientName, setGiftRecipientName] = useState('')
  const [giftAddress, setGiftAddress] = useState('')

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

    const { data: invData, error } = await supabase
      .from('invitations')
      .select('*')
      .eq('id', invitationId)
      .eq('user_id', user.id)
      .single()

    if (error || !invData) {
      setNotFound(true)
      setLoading(false)
      return
    }

    // Populate form with existing data
    setSlug(invData.slug || '')
    setBrideName(invData.bride_name || '')
    setBrideFullname(invData.bride_fullname || '')
    setBrideParents(invData.bride_parents || '')
    setGroomName(invData.groom_name || '')
    setGroomFullname(invData.groom_fullname || '')
    setGroomParents(invData.groom_parents || '')

    setAkadDate(invData.akad_date || '')
    setAkadTime(invData.akad_time || '')
    setAkadVenue(invData.akad_venue || '')
    setAkadAddress(invData.akad_address || '')

    setResepsiDate(invData.resepsi_date || '')
    setResepsiTime(invData.resepsi_time || '')
    setResepsiVenue(invData.resepsi_venue || '')
    setResepsiAddress(invData.resepsi_address || '')

    setMusicUrl(invData.music_url || '')
    setPhotos(invData.photos || [])
    setTemplate(invData.template || 'gold-cream')

    // Fitur tambahan
    setBrideInstagram(invData.bride_instagram || '')
    setGroomInstagram(invData.groom_instagram || '')
    setBridePhoto(invData.bride_photo || '')
    setGroomPhoto(invData.groom_photo || '')
    setVerse1Text(invData.verse_1_text || '')
    setVerse1Source(invData.verse_1_source || '')
    setVerse2Text(invData.verse_2_text || '')
    setVerse2Source(invData.verse_2_source || '')
    setMapsAkadUrl(invData.maps_akad_url || '')
    setMapsResepsiUrl(invData.maps_resepsi_url || '')
    setLiveStreamingUrl(invData.live_streaming_url || '')
    setInstagramFilterUrl(invData.instagram_filter_url || '')
    setGiftBankAccounts(invData.gift_bank_accounts || [])
    setGiftRecipientName(invData.gift_recipient_name || '')
    setGiftAddress(invData.gift_address || '')

    setLoading(false)
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

  const handleSinglePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setter(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const addGiftBankAccount = () => {
    setGiftBankAccounts(prev => [...prev, { bank: '', account_number: '', account_name: '' }])
  }

  const updateGiftBankAccount = (index: number, field: 'bank' | 'account_number' | 'account_name', value: string) => {
    setGiftBankAccounts(prev => prev.map((acc, i) => i === index ? { ...acc, [field]: value } : acc))
  }

  const removeGiftBankAccount = (index: number) => {
    setGiftBankAccounts(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const { error } = await supabase
      .from('invitations')
      .update({
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
        template,
        bride_instagram: brideInstagram,
        groom_instagram: groomInstagram,
        bride_photo: bridePhoto,
        groom_photo: groomPhoto,
        verse_1_text: verse1Text,
        verse_1_source: verse1Source,
        verse_2_text: verse2Text,
        verse_2_source: verse2Source,
        maps_akad_url: mapsAkadUrl,
        maps_resepsi_url: mapsResepsiUrl,
        live_streaming_url: liveStreamingUrl,
        instagram_filter_url: instagramFilterUrl,
        gift_bank_accounts: giftBankAccounts,
        gift_recipient_name: giftRecipientName,
        gift_address: giftAddress
      })
      .eq('id', invitationId)
      .eq('user_id', user.id)

    if (error) {
      alert('Error: ' + error.message)
      setSaving(false)
    } else {
      alert('✅ Undangan berhasil diperbarui!')
      router.push(`/my-invitations/${invitationId}`)
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

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Undangan tidak ditemukan</h1>
          <p className="text-gray-600 mb-6">Undangan ini mungkin sudah dihapus atau Anda tidak memiliki akses.</p>
          <Link
            href="/my-invitations"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C19B2E] text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Undangan Saya
          </Link>
        </div>
      </div>
    )
  }

  const templates = [
    { id: 'gold-cream', name: 'Gold Cream', colors: ['#D4A843', '#FAF6EE', '#C9A557'], description: 'Elegan & klasik dengan nuansa emas' },
    { id: 'modern-minimal', name: 'Modern Minimal', colors: ['#2C3E50', '#ECF0F1', '#3498DB'], description: 'Simpel & modern untuk pasangan kontemporer' },
    { id: 'floral-romantic', name: 'Floral Romantic', colors: ['#E8B4B8', '#FFF5F7', '#C48B9F'], description: 'Romantis dengan sentuhan bunga-bunga' },
    { id: 'classic-elegant', name: 'Classic Elegant', colors: ['#D4A843', '#F5F0E8', '#2C2C2C'], description: 'Timeless & sophisticated dengan timeline vertikal' },
    { id: 'grand-celebration', name: 'Grand Celebration', colors: ['#B8935F', '#FBF8F3', '#2A2A2A'], description: 'Fitur lengkap: gift registry, live streaming, QR check-in' }
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

            <div className="flex items-center gap-3">
              <Link
                href={`/undangan/${slug}`}
                target="_blank"
                className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 hover:border-[#D4AF37] text-gray-700 hover:text-[#D4AF37] font-medium rounded-full transition-all hover:scale-105"
              >
                <Eye className="w-5 h-5" />
                <span>Preview</span>
              </Link>

              <Link
                href={`/my-invitations/${invitationId}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 hover:border-[#D4AF37] text-gray-700 hover:text-[#D4AF37] font-medium rounded-full transition-all hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Kembali</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D4AF37]/10 to-[#E5C158]/10 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm font-semibold text-[#D4AF37]">Edit Undangan</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {brideName} & {groomName}
          </h1>
          <p className="text-lg text-gray-600">Perbarui detail undangan Anda</p>
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
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Akad */}
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
                      required
                      rows={3}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: Resepsi */}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Link Musik Latar (Opsional)</label>
                  <input
                    type="url"
                    value={musicUrl}
                    onChange={(e) => setMusicUrl(e.target.value)}
                    placeholder="https://example.com/music.mp3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>

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
                      <p className="text-gray-600 font-medium mb-1">Click untuk upload foto tambahan</p>
                      <p className="text-sm text-gray-500">PNG, JPG hingga 10MB</p>
                    </label>
                  </div>

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

          {/* SECTION 5B: Fitur Tambahan (Grand Celebration) */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#B8935F] via-[#8A6D42] to-[#B8935F] rounded-2xl opacity-20 group-hover:opacity-30 blur transition-all duration-500"></div>

            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 p-6 sm:p-8 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#B8935F] to-[#8A6D42] rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Fitur Tambahan</h2>
                  <p className="text-sm text-gray-500">Opsional — hanya dipakai template Grand Celebration, kosongkan kalau tidak perlu</p>
                </div>
              </div>

              {/* Instagram */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2"><Instagram className="w-4 h-4" /> Instagram Mempelai</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" value={brideInstagram} onChange={(e) => setBrideInstagram(e.target.value)} placeholder="@username_mempelai_wanita"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all" />
                  <input type="text" value={groomInstagram} onChange={(e) => setGroomInstagram(e.target.value)} placeholder="@username_mempelai_pria"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all" />
                </div>
              </div>

              {/* Foto Bulat Bride & Groom */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">Foto Bulat Mempelai</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    {bridePhoto && (
                      <img src={bridePhoto} alt="Preview" className="w-14 h-14 rounded-full object-cover border-2 border-gray-200" />
                    )}
                    <label className="flex-1 cursor-pointer">
                      <input type="file" accept="image/*" onChange={(e) => handleSinglePhotoUpload(e, setBridePhoto)} className="hidden" />
                      <span className="block px-4 py-2.5 border-2 border-dashed border-gray-300 hover:border-[#D4AF37] rounded-xl text-center text-sm text-gray-500 transition-all">
                        {bridePhoto ? 'Ganti Foto Wanita' : 'Upload Foto Wanita'}
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    {groomPhoto && (
                      <img src={groomPhoto} alt="Preview" className="w-14 h-14 rounded-full object-cover border-2 border-gray-200" />
                    )}
                    <label className="flex-1 cursor-pointer">
                      <input type="file" accept="image/*" onChange={(e) => handleSinglePhotoUpload(e, setGroomPhoto)} className="hidden" />
                      <span className="block px-4 py-2.5 border-2 border-dashed border-gray-300 hover:border-[#D4AF37] rounded-xl text-center text-sm text-gray-500 transition-all">
                        {groomPhoto ? 'Ganti Foto Pria' : 'Upload Foto Pria'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Ayat Suci */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2"><BookOpen className="w-4 h-4" /> Ayat Suci (bisa isi 1 atau 2 agama)</h3>
                <div className="space-y-3 mb-4">
                  <input type="text" value={verse1Source} onChange={(e) => setVerse1Source(e.target.value)} placeholder="Sumber ayat 1 (contoh: QS. Ar-Rum: 21)"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all" />
                  <textarea value={verse1Text} onChange={(e) => setVerse1Text(e.target.value)} placeholder="Isi ayat 1" rows={2}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all resize-none" />
                </div>
                <div className="space-y-3">
                  <input type="text" value={verse2Source} onChange={(e) => setVerse2Source(e.target.value)} placeholder="Sumber ayat 2 (contoh: Matius 19:6)"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all" />
                  <textarea value={verse2Text} onChange={(e) => setVerse2Text(e.target.value)} placeholder="Isi ayat 2" rows={2}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all resize-none" />
                </div>
              </div>

              {/* Google Maps */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2"><MapPin className="w-4 h-4" /> Link Google Maps</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="url" value={mapsAkadUrl} onChange={(e) => setMapsAkadUrl(e.target.value)} placeholder="Link Maps lokasi Akad"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all" />
                  <input type="url" value={mapsResepsiUrl} onChange={(e) => setMapsResepsiUrl(e.target.value)} placeholder="Link Maps lokasi Resepsi"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all" />
                </div>
              </div>

              {/* Live Streaming & Filter IG */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2"><Video className="w-4 h-4" /> Live Streaming & Filter Instagram</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="url" value={liveStreamingUrl} onChange={(e) => setLiveStreamingUrl(e.target.value)} placeholder="Link Live Streaming (Instagram/YouTube)"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all" />
                  <input type="url" value={instagramFilterUrl} onChange={(e) => setInstagramFilterUrl(e.target.value)} placeholder="Link Filter Instagram"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all" />
                </div>
              </div>

              {/* Wedding Gift */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2"><Gift className="w-4 h-4" /> Wedding Gift</h3>

                <div className="space-y-3 mb-4">
                  {giftBankAccounts.map((acc, index) => (
                    <div key={index} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center">
                      <input type="text" value={acc.bank} onChange={(e) => updateGiftBankAccount(index, 'bank', e.target.value)} placeholder="Nama Bank"
                        className="px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4AF37]" />
                      <input type="text" value={acc.account_number} onChange={(e) => updateGiftBankAccount(index, 'account_number', e.target.value)} placeholder="No. Rekening"
                        className="px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4AF37]" />
                      <input type="text" value={acc.account_name} onChange={(e) => updateGiftBankAccount(index, 'account_name', e.target.value)} placeholder="Atas Nama"
                        className="px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4AF37]" />
                      <button type="button" onClick={() => removeGiftBankAccount(index)}
                        className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <button type="button" onClick={addGiftBankAccount}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors mb-6">
                  <Plus className="w-4 h-4" /> Tambah Rekening
                </button>

                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" value={giftRecipientName} onChange={(e) => setGiftRecipientName(e.target.value)} placeholder="Nama Penerima Kado (Fisik)"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all" />
                  <input type="text" value={giftAddress} onChange={(e) => setGiftAddress(e.target.value)} placeholder="Alamat Kirim Kado"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] transition-all" />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 5: Template */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition-all duration-500"></div>

            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Pilih Template</h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTemplate(t.id)}
                    className={`relative p-6 rounded-xl border-2 transition-all text-left ${
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
                    <span>Simpan Perubahan</span>
                  </>
                )}
              </div>
            </button>

            <Link
              href={`/my-invitations/${invitationId}`}
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