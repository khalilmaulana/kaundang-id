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
  
  // Photo states
  const [photos, setPhotos] = useState<File[]>([])
  const [existingPhotos, setExistingPhotos] = useState<string[]>([])
  const [uploadingPhotos, setUploadingPhotos] = useState(false)
  
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
    resepsi_address: '',
    music_url: '',
    template: 'gold-cream'  // NEW
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
      resepsi_address: data.resepsi_address || '',
      music_url: data.music_url || '',
      template: data.template || 'gold-cream'  // NEW
    })
    
    setExistingPhotos(data.photos || [])
    setFetching(false)
  }

  const uploadPhotos = async (userId: string) => {
    console.log('=== UPLOAD PHOTOS DEBUG START ===')
    console.log('Number of photos to upload:', photos.length)
    console.log('User ID:', userId)
    
    if (photos.length === 0) {
      console.log('No photos to upload, returning empty array')
      return []
    }

    const uploadedUrls: string[] = []
    
    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i]
      console.log(`\n--- Uploading photo ${i + 1}/${photos.length} ---`)
      console.log('File name:', photo.name)
      console.log('File size:', photo.size, 'bytes')
      console.log('File type:', photo.type)
      
      const fileExt = photo.name.split('.').pop()
      const fileName = `${userId}/${Date.now()}_${i}.${fileExt}`
      console.log('Storage path:', fileName)
      
      try {
        const { data, error } = await supabase.storage
          .from('photos')
          .upload(fileName, photo, {
            cacheControl: '3600',
            upsert: false
          })
        
        if (error) {
          console.error('❌ Upload ERROR:', error)
          console.error('Error message:', error.message)
          continue
        }
        
        if (data) {
          console.log('✅ Upload SUCCESS:', data.path)
          
          const { data: urlData } = supabase.storage
            .from('photos')
            .getPublicUrl(fileName)
          
          const publicUrl = urlData.publicUrl
          console.log('Public URL generated:', publicUrl)
          
          uploadedUrls.push(publicUrl)
          console.log('Added to uploadedUrls array')
        }
      } catch (err) {
        console.error('❌ Unexpected error during upload:', err)
      }
    }
    
    console.log('\n=== UPLOAD PHOTOS DEBUG END ===')
    console.log('Total successfully uploaded:', uploadedUrls.length)
    console.log('Uploaded URLs:', uploadedUrls)
    
    return uploadedUrls
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setUploadingPhotos(true)

    const newPhotoUrls = await uploadPhotos(user.id)
    const allPhotos = [...existingPhotos, ...newPhotoUrls]

    const { data, error } = await supabase
      .from('invitations')
      .update({
        ...formData,
        photos: allPhotos
      })
      .eq('id', invitationId)
      .eq('user_id', user.id)

    setUploadingPhotos(false)

    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('Undangan berhasil diupdate! 🎉')
      router.push('/my-invitations')
    }

    setLoading(false)
  }

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

          {/* Music */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 600,
              color: '#C9A557',
              marginBottom: '1.5rem',
              paddingBottom: '0.5rem',
              borderBottom: '2px solid rgba(201,165,87,0.2)'
            }}>
              🎵 Background Music (Opsional)
            </h2>
            
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>URL Musik</label>
              <input
                type="url"
                name="music_url"
                value={formData.music_url}
                onChange={handleChange}
                placeholder="https://example.com/song.mp3"
                style={inputStyle}
              />
              <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.5rem' }}>
                Kosongkan jika tidak ingin menambahkan musik.
              </p>
            </div>
          </div>

          {/* NEW: Template Selection */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 600,
              color: '#C9A557',
              marginBottom: '1.5rem',
              paddingBottom: '0.5rem',
              borderBottom: '2px solid rgba(201,165,87,0.2)'
            }}>
              🎨 Pilih Template
            </h2>
            
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Template Undangan</label>
              <select
                name="template"
                value={formData.template}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="gold-cream">Gold & Cream (Elegant Classic)</option>
                <option value="modern-minimal">Modern Minimalist (Clean & Simple)</option>
                <option value="floral-romantic">Floral Romantic (Soft & Sweet)</option>
              </select>
              <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.5rem' }}>
                Pilih tema yang sesuai dengan style pernikahan Anda
              </p>
            </div>

            {/* Template Preview Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem',
              marginTop: '1.5rem'
            }}>
              {[
                { id: 'gold-cream', name: 'Gold & Cream', color: '#C9A557', bg: '#FAF6EE' },
                { id: 'modern-minimal', name: 'Modern Minimal', color: '#1a1a1a', bg: '#f5f5f5' },
                { id: 'floral-romantic', name: 'Floral Romantic', color: '#ff9eb7', bg: '#fef8f5' }
              ].map((template) => (
                <div
                  key={template.id}
                  onClick={() => setFormData({ ...formData, template: template.id })}
                  style={{
                    padding: '1.5rem',
                    background: template.bg,
                    border: formData.template === template.id ? `3px solid ${template.color}` : '1px solid #ddd',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.3s',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: template.color,
                    margin: '0 auto 0.8rem'
                  }}></div>
                  <div style={{
                    fontSize: '0.85rem',
                    fontWeight: formData.template === template.id ? 600 : 400,
                    color: template.color
                  }}>
                    {template.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Photo Gallery */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 600,
              color: '#C9A557',
              marginBottom: '1.5rem',
              paddingBottom: '0.5rem',
              borderBottom: '2px solid rgba(201,165,87,0.2)'
            }}>
              📸 Galeri Foto
            </h2>
            
            {existingPhotos.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Foto Saat Ini ({existingPhotos.length})</label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  {existingPhotos.map((photo, i) => (
                    <div key={i} style={{
                      position: 'relative',
                      paddingBottom: '100%',
                      background: '#f5f5f5',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <img
                        src={photo}
                        alt={`Photo ${i + 1}`}
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setExistingPhotos(existingPhotos.filter((_, idx) => idx !== i))
                        }}
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          background: 'rgba(255,0,0,0.8)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          cursor: 'pointer',
                          fontSize: '0.7rem'
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Tambah Foto Baru (Max 10 total)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || [])
                  const total = existingPhotos.length + files.length
                  if (total > 10) {
                    alert(`Maksimal 10 foto (saat ini: ${existingPhotos.length})`)
                    return
                  }
                  setPhotos(files)
                }}
                style={inputStyle}
              />
              <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.5rem' }}>
                Maksimal 10 foto total. Saat ini: {existingPhotos.length} foto.
              </p>
              
              {photos.length > 0 && (
                <div style={{
                  marginTop: '1rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                  gap: '0.5rem'
                }}>
                  {photos.map((photo, i) => (
                    <div key={i} style={{
                      position: 'relative',
                      paddingBottom: '100%',
                      background: '#f5f5f5',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Preview ${i + 1}`}
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

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
              {uploadingPhotos ? 'Uploading photos...' : loading ? 'Menyimpan...' : 'Simpan Perubahan'}
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