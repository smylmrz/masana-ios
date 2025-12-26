export type HabitType = {
  id: number
  name: string
  description: string | null
  schedule: string[]
  type: 'count' | 'inverse'
  target_count: number | null
  streak: number
  today_status: 'pending' | 'partial' | 'completed' | 'skipped' | 'missed'
  today_log: {
    current_count: number | null
  } | null
}
