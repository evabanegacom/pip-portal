export interface LoginResponse {
  token: string
  user: {
    id: string
    username: string
  }
}

export interface LoginRequest {
  username: string
  password: string
}

export const UserRole = {
  ADMIN: 'Admin',
  USER: 'User',
  SUPERVISOR: 'Supervisor',
  SECONDSUPERVISOR: 'SecondSupervisor',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
