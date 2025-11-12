export interface User {
  id: string;
  name: string;
  email: string;
  householdMembers: number;
  isAdmin: boolean;
}

export const AUTH_KEY = 'energy_app_user';

export const getStoredUser = (): User | null => {
  const stored = localStorage.getItem(AUTH_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const setStoredUser = (user: User) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
};

export const clearStoredUser = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = (): boolean => {
  return getStoredUser() !== null;
};
