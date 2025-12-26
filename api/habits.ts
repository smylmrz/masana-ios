import { apiRequest } from './client';
import { HabitType } from '@/components/Habit';

type ApiHabit = {
  id: number;
  name: string;
  description: string | null;
  schedule: string[];
  type: 'count' | 'inverse';
  target_count: number | null;
  streak: number;
  today_status: 'pending' | 'partial' | 'completed' | 'skipped' | 'missed';
  today_log: {
    current_count: number | null;
  } | null;
};

type HabitsResponse = {
  date: string;
  habits: ApiHabit[];
};

export async function getTodayHabits(): Promise<HabitType[]> {
  const response = await apiRequest<HabitsResponse>('/habits/today');

  return response.data.habits.map(habit => ({
    id: habit.id,
    title: habit.name,
    description: habit.description,
    schedule: habit.schedule,
    type: habit.type,
    target: habit.target_count,
    current_streak: habit.streak,
    current: habit.today_log?.current_count ?? 0,
    today_completed: habit.today_status === 'completed',
  }));
}
