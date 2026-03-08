'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useParams } from 'next/navigation'
import GoldCreamTemplate from '../../templates/GoldCreamTemplate'
import ModernMinimalTemplate from '../../templates/ModernMinimalTemplate'
import FloralRomanticTemplate from '../../templates/FloralRomanticTemplate'

export default function InvitationPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [invitation, setInvitation] = useState<any>(null)
  const [rsvps, setRsvps] = useState<any[]>([])
  const [wishes, setWishes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })
  const [selectedAttend, setSelectedAttend] = useState('✓ Hadir')
  const [wishName, setWishName] = useState('')
  const [wishMessage, setWishMessage] = useState('')

  const [isPlaying, setIsPlaying] = useState(false)
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null)

  const [guestCode, setGuestCode] = useState<string | null>(null)
  const [guestName, setGuestName] = useState<string | null>(null)

  useEffect(() => {
    fetchInvitation()
  }, [slug])

  useEffect(() => {
    if (invitation) {
      const timer = setInterval(() => {
        const target = new Date(invitation.resepsi_date)
        const now = new Date()
        const diff = target.getTime() - now.getTime()
        
        if (diff <= 0) {
          setCountdown({ days: 0, hours: 0, mins: 0, secs: 0 })
          return
        }
        
        const d = Math.floor(diff / 86400000)
        const h = Math.floor((diff % 86400000) / 3600000)
        const m = Math.floor((diff % 3600000) / 60000)
        const s = Math.floor((diff % 60000) / 1000)
        
        setCountdown({ days: d, hours: h, mins: m, secs: s })
      }, 1000)
      
      return () => clearInterval(timer)
    }
  }, [invitation])

  useEffect(() => {
    if (invitation && invitation.music_url && envelopeOpen) {
      const audio = new Audio(invitation.music_url)
      audio.loop = true
      audio.volume = 0.5
      
      audio.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {
        setIsPlaying(false)
      })
      
      setAudioRef(audio)
      
      return () => {
        audio.pause()
        audio.src = ''
      }
    }
  }, [invitation, envelopeOpen])

  const toggleMusic = () => {
    if (audioRef) {
      if (isPlaying) {
        audioRef.pause()
        setIsPlaying(false)
      } else {
        audioRef.play()
        setIsPlaying(true)
      }
    }
  }

  // KEEP ONLY THIS fetchInvitation (with try-catch)
  const fetchInvitation = async () => {
    setLoading(true)
    
    try {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('guest')
      
      if (code) {
        setGuestCode(code)
        
        const { data: guestData } = await supabase
          .from('guest_list')
          .select('*')
          .eq('personalized_code', code)
          .single()
        
        if (guestData) {
          setGuestName(guestData.name)
          
          if (guestData.status === 'pending') {
            await supabase
              .from('guest_list')
              .update({
                status: 'opened',
                last_opened_at: new Date().toISOString()
              })
              .eq('personalized_code', code)
          }
        }
      }
      
      const { data: invData, error: invError } = await supabase
        .from('invitations')
        .select('*')
        .eq('slug', slug)
        .single()
      
      if (invError) {
        console.error('Invitation fetch error:', invError)
        setLoading(false)
        return
      }
      
      console.log('=== DEBUG INVITATION DATA ===')
      console.log('Full invitation data:', invData)
      console.log('Invitation ID:', invData?.id)
      console.log('ID Type:', typeof invData?.id)
        
      if (invData) {
        setInvitation(invData)
        
        const { data: rsvpData } = await supabase
          .from('rsvp')
          .select('*')
          .eq('invitation_id', invData.id)
        
        const { data: wishData } = await supabase
          .from('wishes')
          .select('*')
          .eq('invitation_id', invData.id)
          .order('created_at', { ascending: false })
        
        if (rsvpData) setRsvps(rsvpData)
        if (wishData) setWishes(wishData)
      }
    } catch (err) {
      console.error('Fetch error:', err)
    }
    
    setLoading(false)
  }

  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!invitation || !invitation.id) {
      alert('Error: Invitation data not loaded')
      return
    }
    
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    
    const rsvpData = {
      invitation_id: Number(invitation.id),
      name: String(formData.get('name') || ''),
      phone: String(formData.get('phone') || ''),
      attendance: String(selectedAttend),
      guest_count: Number(formData.get('guest_count') || 1)
    }
    
    console.log('=== RSVP SUBMIT ===')
    console.log('Data to insert:', rsvpData)
    
    const { data, error } = await supabase
      .from('rsvp')
      .insert([rsvpData])
      .select()
    
    if (error) {
      console.error('RSVP Error:', error)
      alert('Error: ' + error.message)
      return
    }
    
    console.log('RSVP Success:', data)
    
    if (guestCode) {
      await supabase
        .from('guest_list')
        .update({ status: 'rsvp_done' })
        .eq('personalized_code', guestCode)
    }
    
    alert('Terima kasih sudah konfirmasi! 🎉')
    form.reset()
    fetchInvitation()
  }

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!invitation || !invitation.id) {
      alert('Error: Invitation data not loaded')
      return
    }
    
    if (!wishName.trim() || !wishMessage.trim()) {
      alert('Nama dan pesan harus diisi')
      return
    }
    
    const wishData = {
      invitation_id: Number(invitation.id),
      name: String(wishName).trim(),
      message: String(wishMessage).trim()
    }
    
    console.log('=== WISH SUBMIT ===')
    console.log('Data to insert:', wishData)
    
    const { data, error } = await supabase
      .from('wishes')
      .insert([wishData])
      .select()
    
    if (error) {
      console.error('Wish Error:', error)
      alert('Error: ' + error.message)
      return
    }
    
    console.log('Wish Success:', data)
    
    if (guestCode) {
      await supabase
        .from('guest_list')
        .update({ status: 'rsvp_done' })
        .eq('personalized_code', guestCode)
    }
    
    alert('Ucapan berhasil dikirim! 🎉')
    setWishName('')
    setWishMessage('')
    fetchInvitation()
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1C150A',
        color: '#C9A557'
      }}>
        Loading undangan...
      </div>
    )
  }

  if (!invitation) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1C150A',
        color: '#C9A557',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
        <p style={{ fontSize: '1.2rem' }}>Undangan tidak ditemukan</p>
      </div>
    )
  }

  if (!envelopeOpen) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--dark)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        zIndex: 1000
      }}>
        <div style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: '1.8rem',
          color: 'var(--gold2)',
          opacity: 0.7
        }}>
          {guestName ? `Kepada Yth. ${guestName}` : 'Kepada Yth. Nama Tamu'}
        </div>
        
        <div 
          onClick={() => setEnvelopeOpen(true)}
          style={{
            position: 'relative',
            width: '300px',
            height: '200px',
            cursor: 'pointer'
          }}
        >
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '160px',
            background: 'linear-gradient(135deg, #2a1f0a, #1a1305)',
            border: '1px solid rgba(201,165,87,0.3)'
          }}></div>
          
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--gold), var(--gold3))',
            border: '2px solid var(--gold2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
            zIndex: 3,
            boxShadow: '0 0 20px rgba(201,165,87,0.4)'
          }}>
            ❦
          </div>
        </div>
        
        <div style={{
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(201,165,87,0.6)'
        }}>
          Klik untuk membuka undangan
        </div>
      </div>
    )
  }

  const renderTemplate = () => {
    const templateProps = {
      invitation,
      rsvps,
      wishes,
      countdown,
      selectedAttend,
      setSelectedAttend,
      wishName,
      setWishName,
      wishMessage,
      setWishMessage,
      handleRSVPSubmit,
      handleWishSubmit,
      isPlaying,
      toggleMusic
    }

    switch (invitation.template) {
      case 'modern-minimal':
        return <ModernMinimalTemplate {...templateProps} />
      case 'floral-romantic':
        return <FloralRomanticTemplate {...templateProps} />
      case 'gold-cream':
      default:
        return <GoldCreamTemplate {...templateProps} />
    }
  }

  return renderTemplate()
}