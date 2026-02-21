'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CreateInvitation() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  
  // Form data
  const [formData, setFormData] = useState({
    slug: '',
    groom_name: '',
    groom_fullname: '',
    groom_parents: '',
    bride_name: '',
    bride_fullname: '',
    bride_parents: '',
    akad_date: '',
    akad_time: '',
    akad_venue: '',
    akad_address: '',
    resepsi_date: '',
    resepsi_time: '',
    resepsi_venue: '',
    resepsi_address: ''
  })

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
    } else {
      setUser(user)
    }
  }

  const generateSlug = () => {
    const groomSlug = formData.groom_name.toLowerCase().replace(/\s+/g, '-')
    const brideSlug = formData.bride_name.toLowerCase().replace(/\s+/g, '-')
    return `${groomSlug}-${brideSlug}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const slug = generateSlug()

    const { data, error } = await supabase
      .from('invitations')
      .insert([
        {
          ...formData,
          slug,
          user_id: user.id
        }
      ])
      .select()

    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('Undangan berhasil dibuat! 🎉')
      router.push(`/undangan/${slug}`)
    }

    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0D0D0D',
        color: '#D4A843'
      }}>
        Loading...
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FAF6EE',
      padding: '3rem 2rem'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#1C150A',
            marginBottom: '0.5rem'
          }}>
            Buat Undangan Baru
          </h1>
          <p style={{
            color: '#666',
            fontSize: '1rem'
          }}>
            Isi data undangan pernikahan Anda
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          background: '#fff',
          padding: '2.5rem',
          border: '1px solid rgba(201,165,87,0.2)'
        }}>
          {/* Mempelai Pria */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 600,
              color: '#C9A557',
              marginBottom: '1.5rem',
              paddingBottom: '0.5rem',
              borderBottom: '2px solid rgba(201,165,87,0.2)'
            }}>
              👰 Mempelai Wanita
            </h2>
            
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Nama Panggilan</label>
              <input
                type="text"
                name="bride_name"
                value={formData.bride_name}
                onChange={handleChange}
                placeholder="Contoh: Siti"
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Nama Lengkap</label>
              <input
                type="text"
                name="bride_fullname"
                value={formData.bride_fullname}
                onChange={handleChange}
                placeholder="Contoh: Siti Nurhaliza Putri, S.Pd"
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Nama Orang Tua</label>
              <textarea
                name="bride_parents"
                value={formData.bride_parents}
                onChange={handleChange}
                placeholder="Bapak H. Ahmad Fauzi & Ibu Hj. Rahmawati"
                required
                rows={2}
                style={{...inputStyle, resize: 'vertical'}}
              />
            </div>
          </div>

          {/* Mempelai Wanita */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 600,
              color: '#C9A557',
              marginBottom: '1.5rem',
              paddingBottom: '0.5rem',
              borderBottom: '2px solid rgba(201,165,87,0.2)'
            }}>
              🤵 Mempelai Pria
            </h2>
            
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Nama Panggilan</label>
              <input
                type="text"
                name="groom_name"
                value={formData.groom_name}
                onChange={handleChange}
                placeholder="Contoh: Reza"
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Nama Lengkap</label>
              <input
                type="text"
                name="groom_fullname"
                value={formData.groom_fullname}
                onChange={handleChange}
                placeholder="Contoh: Muhammad Reza Pratama, S.T"
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Nama Orang Tua</label>
              <textarea
                name="groom_parents"
                value={formData.groom_parents}
                onChange={handleChange}
                placeholder="Bapak H. Bambang Susilo & Ibu Hj. Sri Wahyuni"
                required
                rows={2}
                style={{...inputStyle, resize: 'vertical'}}
              />
            </div>
          </div>

          {/* Akad Nikah */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 600,
              color: '#C9A557',
              marginBottom: '1.5rem',
              paddingBottom: '0.5rem',
              borderBottom: '2px solid rgba(201,165,87,0.2)'
            }}>
              🕌 Akad Nikah
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
              <div>
                <label style={labelStyle}>Tanggal</label>
                <input
                  type="text"
                  name="akad_date"
                  value={formData.akad_date}
                  onChange={handleChange}
                  placeholder="Sabtu, 15 Maret 2025"
                  required
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Waktu</label>
                <input
                  type="text"
                  name="akad_time"
                  value={formData.akad_time}
                  onChange={handleChange}
                  placeholder="08.00 - 10.00 WIB"
                  required
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Nama Lokasi</label>
              <input
                type="text"
                name="akad_venue"
                value={formData.akad_venue}
                onChange={handleChange}
                placeholder="Masjid Al-Ikhlas"
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Alamat Lengkap</label>
              <textarea
                name="akad_address"
                value={formData.akad_address}
                onChange={handleChange}
                placeholder="Jl. Sudirman No. 12, Jakarta Pusat"
                required
                rows={2}
                style={{...inputStyle, resize: 'vertical'}}
              />
            </div>
          </div>

          {/* Resepsi */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 600,
              color: '#C9A557',
              marginBottom: '1.5rem',
              paddingBottom: '0.5rem',
              borderBottom: '2px solid rgba(201,165,87,0.2)'
            }}>
              🌸 Resepsi
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
              <div>
                <label style={labelStyle}>Tanggal</label>
                <input
                  type="text"
                  name="resepsi_date"
                  value={formData.resepsi_date}
                  onChange={handleChange}
                  placeholder="Sabtu, 15 Maret 2025"
                  required
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Waktu</label>
                <input
                  type="text"
                  name="resepsi_time"
                  value={formData.resepsi_time}
                  onChange={handleChange}
                  placeholder="11.00 - 15.00 WIB"
                  required
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Nama Lokasi</label>
              <input
                type="text"
                name="resepsi_venue"
                value={formData.resepsi_venue}
                onChange={handleChange}
                placeholder="Gedung Sasana Budaya"
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Alamat Lengkap</label>
              <textarea
                name="resepsi_address"
                value={formData.resepsi_address}
                onChange={handleChange}
                placeholder="Jl. Gatot Subroto Kav. 5, Jakarta"
                required
                rows={2}
                style={{...inputStyle, resize: 'vertical'}}
              />
            </div>
          </div>

          {/* Submit */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end'
          }}>
            <Link
              href="/"
              style={{
                padding: '1rem 2rem',
                background: 'transparent',
                border: '1px solid #ccc',
                color: '#666',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 500
              }}
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '1rem 2rem',
                background: '#C9A557',
                border: 'none',
                color: '#fff',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1
              }}
            >
              {loading ? 'Menyimpan...' : 'Buat Undangan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const labelStyle = {
  display: 'block',
  fontSize: '0.85rem',
  color: '#3D2E0F',
  marginBottom: '0.5rem',
  fontWeight: 500
}

const inputStyle = {
  width: '100%',
  padding: '0.9rem 1rem',
  border: '1px solid rgba(201,165,87,0.3)',
  fontSize: '0.95rem',
  outline: 'none'
}