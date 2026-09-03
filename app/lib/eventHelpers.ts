// lib/eventHelpers.ts
// Helper untuk fitur check-in QR dan "Simpan ke Kalender"

/**
 * Generate URL check-in untuk 1 tamu, di-encode jadi QR code.
 * Saat dibuka (di-scan), akan langsung menandai tamu tersebut hadir.
 */
export function getCheckinUrl(origin: string, invitationId: string | number, personalizedCode: string): string {
  return `${origin}/checkin/${invitationId}?code=${personalizedCode}`
}

// Mapping nama bulan Indonesia ke angka (untuk parsing tanggal manual seperti "15 Maret 2025")
const INDONESIAN_MONTHS: Record<string, number> = {
  januari: 0, februari: 1, maret: 2, april: 3, mei: 4, juni: 5,
  juli: 6, agustus: 7, september: 8, oktober: 9, november: 10, desember: 11
}

/**
 * Coba parse tanggal format Indonesia seperti "Sabtu, 15 Maret 2025" atau "15 Maret 2025"
 * plus waktu seperti "09:00 - 11:00 WIB" (ambil jam mulai saja).
 * Return null kalau gagal parse (supaya tombol "Simpan Kalender" bisa disembunyikan).
 */
export function parseIndonesianDateTime(dateStr: string, timeStr?: string): Date | null {
  if (!dateStr) return null

  // Buang nama hari (contoh: "Sabtu, ") kalau ada
  const cleaned = dateStr.replace(/^[A-Za-z]+,\s*/, '').trim()
  const match = cleaned.match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/)
  if (!match) return null

  const day = parseInt(match[1], 10)
  const monthName = match[2].toLowerCase()
  const year = parseInt(match[3], 10)
  const month = INDONESIAN_MONTHS[monthName]
  if (month === undefined) return null

  let hour = 0
  let minute = 0
  if (timeStr) {
    const timeMatch = timeStr.match(/(\d{1,2})[:.](\d{2})/)
    if (timeMatch) {
      hour = parseInt(timeMatch[1], 10)
      minute = parseInt(timeMatch[2], 10)
    }
  }

  const date = new Date(year, month, day, hour, minute)
  return isNaN(date.getTime()) ? null : date
}

/**
 * Generate link "Tambah ke Google Calendar" dari data undangan.
 * Return null kalau tanggal tidak berhasil di-parse.
 */
export function getGoogleCalendarUrl(params: {
  title: string
  dateStr: string
  timeStr?: string
  location?: string
  description?: string
}): string | null {
  const start = parseIndonesianDateTime(params.dateStr, params.timeStr)
  if (!start) return null

  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000) // default durasi 2 jam

  const formatGCal = (d: Date) =>
    d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  const url = new URL('https://www.google.com/calendar/render')
  url.searchParams.set('action', 'TEMPLATE')
  url.searchParams.set('text', params.title)
  url.searchParams.set('dates', `${formatGCal(start)}/${formatGCal(end)}`)
  if (params.location) url.searchParams.set('location', params.location)
  if (params.description) url.searchParams.set('details', params.description)

  return url.toString()
}
