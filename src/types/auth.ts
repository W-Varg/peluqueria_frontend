export type UserRole = 'ADMIN' | 'CLIENTE';

export interface User {
  id: number;
  email: string;
  name: string;
  rol: UserRole;
  clienteId?: number;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
} 