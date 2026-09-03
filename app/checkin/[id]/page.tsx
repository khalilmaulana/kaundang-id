'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useParams, useSearchParams } from 'next/navigation'
import { Heart, CheckCircle2, XCircle, Clock } from 'lucide-react'

export default function CheckinPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const invitationId = params.id as string
  const code = searchParams.get('code')

  const [status, setStatus] = useState<'loading' | 'success' | 'already' | 'notfound' | 'error'>('loading')
  const [guestName, setGuestName] = useState('')
  const [checkedInAt, setCheckedInAt] = useState<string | null>(null)

  useEffect(() => {
    processCheckin()
  }, [])

  const processCheckin = async () => {
    if (!code) {
      setStatus('error')
      return
    }

    const { data: guest, error } = await supabase
      .from('guest_list')
      .select('*')
      .eq('invitation_id', invitationId)
      .eq('personalized_code', code)
      .single()

    if (error || !guest) {
      setStatus('notfound')
      return
    }

    setGuestName(guest.name)

    if (guest.checked_in) {
      setStatus('already')
      setCheckedInAt(guest.checked_in_at)
      return
    }

    const { error: updateError } = await supabase
      .from('guest_list')
      .update({
        checked_in: true,
        checked_in_at: new Date().toISOString()
      })
      .eq('id', guest.id)

    if (updateError) {
      setStatus('error')
    } else {
      setStatus('success')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F0] to-[#FFE5D9] flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] via-[#E5C158] to-[#C19B2E] rounded-xl flex items-center justify-center shadow-lg">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">kaundang.id</span>
        </div>

        {status === 'loading' && (
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#C19B2E] rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-600">Memproses check-in...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Check-in Berhasil! 🎉</h1>
            <p className="text-gray-600">
              Selamat datang, <strong className="text-[#D4AF37]">{guestName}</strong>!
            </p>
            <p className="text-sm text-gray-500 mt-2">Terima kasih sudah hadir di acara kami.</p>
          </div>
        )}

        {status === 'already' && (
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-amber-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sudah Check-in</h1>
            <p className="text-gray-600">
              <strong className="text-[#D4AF37]">{guestName}</strong> sudah check-in sebelumnya
            </p>
            {checkedInAt && (
              <p className="text-sm text-gray-500 mt-2">
                pada {new Date(checkedInAt).toLocaleString('id-ID')}
              </p>
            )}
          </div>
        )}

        {status === 'notfound' && (
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Kode Tidak Ditemukan</h1>
            <p className="text-gray-600">QR code ini tidak valid atau sudah tidak berlaku.</p>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Terjadi Kesalahan</h1>
            <p className="text-gray-600">Gagal memproses check-in. Silakan coba lagi.</p>
          </div>
        )}
      </div>
    </div>
  )
}
