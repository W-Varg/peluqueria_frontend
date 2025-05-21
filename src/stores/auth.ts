import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';

interface User {
  id: number;
  email: string;
  name: string;
  rol: string;
}

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
        const response = await axios.post('/auth/login', {
          email,
          password,
        });

        const { access_token, user } = response.data;

        this.token = access_token;
        this.user = user;

        // Store token and user data in localStorage
        localStorage.setItem('token', access_token);
        localStorage.setItem('user', JSON.stringify(user));

        // Configure axios default headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

        // Redirect to admin dashboard after successful login
        router.push({ name: 'admin-dashboard' });

        return user;
      } catch (error) {
        console.error('Login error:', error);
        return false;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
      router.push('/');
    },

    initializeAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    },
  },
});
