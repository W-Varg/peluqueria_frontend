import { defineStore } from 'pinia';
import type { User, AuthResponse } from '@/types/auth';
import axios from 'axios';
import router from '@/router';

interface AuthState {
  token: string | null;
  user: User | null;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user') || 'null'),
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.rol === 'ADMIN',
  },

  actions: {
    async register(data: RegisterData) {
      try {
        const response = await axios.post('/auth/register', data);
        return response.data;
      } catch (error: any) {
        if (error.response?.data?.message) {
          throw new Error(error.response.data.message);
        }
        throw new Error('Error durante el registro');
      }
    },

    async login(email: string, password: string) {
      try {
        const { data } = await axios.post<AuthResponse>('/api/auth/login', {
          email,
          password,
        });

        this.setAuthData(data);
        return data;
      } catch (error) {
        this.clearAuth();
        throw error;
      }
    },

    async logout() {
      this.clearAuth();
    },

    setAuthData(authData: AuthResponse) {
      this.token = authData.access_token;
      this.user = authData.user;
      localStorage.setItem('token', authData.access_token);
      localStorage.setItem('user', JSON.stringify(authData.user));
      
      // Set the token in axios headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${authData.access_token}`;
    },

    clearAuth() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
    },

    initializeAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    }
  },
});
