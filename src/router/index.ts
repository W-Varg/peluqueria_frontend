import { createRouter, createWebHistory } from 'vue-router';
import { authGuard } from './guards';
import AppLayout from '@/layout/AppLayout.vue';
import LandingLayout from '@/layout/LandingLayout.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: LandingLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/landing/Home.vue')
        },
        {
          path: 'servicios',
          name: 'servicios-publico',
          component: () => import('@/views/landing/Servicios.vue')
        },
        {
          path: 'contacto',
          name: 'contacto',
          component: () => import('@/views/landing/Contacto.vue')
        },
        {
          path: 'mi-cuenta',
          name: 'mi-cuenta',
          component: () => import('@/views/landing/MiCuenta.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'mis-reservas',
          name: 'mis-reservas',
          component: () => import('@/views/landing/MisReservas.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/admin',
      component: AppLayout,
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/pages/Dashboard.vue')
        },
        {
          path: 'servicios',
          name: 'servicios',
          component: () => import('@/views/pages/servicios/ServiciosList.vue')
        },
        {
          path: 'clientes',
          name: 'clientes',
          component: () => import('@/views/pages/cliente/ClientesList.vue')
        },
        {
          path: 'sucursales',
          name: 'sucursales',
          component: () => import('@/views/pages/sucursales/SucursalesList.vue')
        },
        {
          path: 'empleados',
          name: 'empleados',
          component: () => import('@/views/pages/empleados/EmpleadosList.vue')
        },
        {
          path: 'reservas',
          name: 'reservas',
          component: () => import('@/views/pages/reservations/ReservationsList.vue')
        }
      ]
    },
    {
      path: '/auth',
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/pages/auth/Login.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/pages/auth/Register.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/pages/NotFound.vue')
    }
  ]
});

router.beforeEach(authGuard);

export default router;
