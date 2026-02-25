'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

export default function EditInvitation() {
  const router = useRouter()
  const params = useParams()
  const invitationId = params.id as string
  
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [fetching, setFetching] = useState(true)
  
  // Form data
  const [formData, setFormData] = useState({
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
    checkUserAndFetch()
  }, [])

  const checkUserAndFetch = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }
    
    setUser(user)
    
    // Fetch invitation data
    const { data, error } = await supabase
      .from('invitations')
      .select('*')
      .eq('id', invitationId)
      .eq('user_id', user.id)
      .single()
    
    if (!data) {
      router.push('/my-invitations')
      return
    }
    
    setFormData({
      groom_name: data.groom_name || '',
      groom_fullname: data.groom_fullname || '',
      groom_parents: data.groom_parents || '',
      bride_name: data.bride_name || '',
      bride_fullname: data.bride_fullname || '',
      bride_parents: data.bride_parents || '',
      akad_date: data.akad_date || '',
      akad_time: data.akad_time || '',
      akad_venue: data.akad_venue || '',
      akad_address: data.akad_address || '',
      resepsi_date: data.resepsi_date || '',
      resepsi_time: data.resepsi_time || '',
      resepsi_venue: data.resepsi_venue || '',
      resepsi_address: data.resepsi_address || ''
    })
    
    setFetching(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase
      .from('invitations')
      .update(formData)
      .eq('id', invitationId)
      .eq('user_id', user.id)

    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('Undangan berhasil diupdate! 🎉')
      router.push('/my-invitations')
    }

    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (fetching) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FAF6EE',
        color: '#C9A557'
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
            Edit Undangan
          </h1>
          <p style={{
            color: '#666',
            fontSize: '1rem'
          }}>
            Update informasi undangan pernikahan Anda
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          background: '#fff',
          padding: '2.5rem',
          border: '1px solid rgba(201,165,87,0.2)'
        }}>
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
              👰 Mempelai Wanita
            </h2>
            
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Nama Panggilan</label>
              <input
                type="text"
                name="bride_name"
                value={formData.bride_name}
                onChange={handleChange}
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
                required
                rows={2}
                style={{...inputStyle, resize: 'vertical' as const}}
              />
            </div>
          </div>

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
              🤵 Mempelai Pria
            </h2>
            
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Nama Panggilan</label>
              <input
                type="text"
                name="groom_name"
                value={formData.groom_name}
                onChange={handleChange}
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
                required
                rows={2}
                style={{...inputStyle, resize: 'vertical' as const}}
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
                required
                rows={2}
                style={{...inputStyle, resize: 'vertical' as const}}
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
                required
                rows={2}
                style={{...inputStyle, resize: 'vertical' as const}}
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
              href="/my-invitations"
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
              {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
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