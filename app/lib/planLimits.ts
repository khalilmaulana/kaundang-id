// lib/planLimits.ts
// Konfigurasi terpusat untuk aturan paket — dipakai di create-invitation,
// my-invitations, dan halaman lain yang perlu tahu batasan/plan user.

export const PLAN_INVITATION_LIMIT: Record<string, number> = {
  free: 0,        // belum pernah bayar / paket expired
  basic: 1,
  premium: 5,
  exclusive: Infinity
}

export const PLAN_LABELS: Record<string, string> = {
  free: 'Belum Berlangganan',
  basic: 'Basic',
  premium: 'Premium',
  exclusive: 'Exclusive'
}

export interface UserPlanStatus {
  plan: string           // 'free' | 'basic' | 'premium' | 'exclusive'
  isActive: boolean      // false kalau expired
  expiresAt: string | null
  invitationLimit: number
}

/**
 * Ambil status paket aktif milik user.
 * Return plan 'free' kalau user belum pernah punya paket, atau paketnya sudah expired.
 */
export async function getUserPlanStatus(supabase: any, userId: string): Promise<UserPlanStatus> {
  const { data } = await supabase
    .from('user_plans')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (!data) {
    return {
      plan: 'free',
      isActive: false,
      expiresAt: null,
      invitationLimit: PLAN_INVITATION_LIMIT.free
    }
  }

  const isExpired = data.expires_at ? new Date(data.expires_at) < new Date() : false
  const effectivePlan = isExpired ? 'free' : data.plan

  return {
    plan: effectivePlan,
    isActive: !isExpired,
    expiresAt: data.expires_at,
    invitationLimit: PLAN_INVITATION_LIMIT[effectivePlan] ?? 0
  }
}

/**
 * Hitung berapa undangan yang sudah dibuat user, lalu cek apakah masih
 * boleh membuat undangan baru sesuai limit paketnya.
 */
export async function canCreateInvitation(supabase: any, userId: string): Promise<{
  allowed: boolean
  currentCount: number
  limit: number
  plan: string
}> {
  const status = await getUserPlanStatus(supabase, userId)

  const { count } = await supabase
    .from('invitations')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)

  const currentCount = count || 0

  return {
    allowed: currentCount < status.invitationLimit,
    currentCount,
    limit: status.invitationLimit,
    plan: status.plan
  }
}
