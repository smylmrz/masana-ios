import { apiRequest, setToken, removeToken } from './client';

export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  is_pro: boolean;
  is_admin: boolean;
  streak: number;
  remaining_habits: number;
  available_freezes: number;
  created_at: string;
};

type LoginResponse = {
  message: string;
  user: User;
  token: string;
};

export async function login(email: string, password: string): Promise<User> {
  const { data } = await apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: { email, password },
    authenticated: false,
  });

  await setToken(data.token);
  return data.user;
}

export async function logout(): Promise<void> {
  await removeToken();
}
