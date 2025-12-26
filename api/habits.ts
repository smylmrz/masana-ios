import { apiRequest } from './client';
import { HabitType } from '@/types/habit';

type HabitsResponse = {
  date: string;
  habits: HabitType[];
};

export async function getTodayHabits(): Promise<HabitType[]> {
  const response = await apiRequest<HabitsResponse>('/habits/today');
  return response.data.habits;
}
