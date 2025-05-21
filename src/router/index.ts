import { createRouter, createWebHistory } from 'vue-router';
// import ClienteView from '../views/ClienteView.vue';
import AppLayout from '../layout/AppLayout.vue';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      component: AppLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          meta: {
            breadcrumb: ['Dashboard'],
            requiresAuth: true,
          },
          component: () => import('../views/pages/Dashboard.vue'),
        },
        {
          path: 'sucursales',
          name: 'admin-sucursales',
          meta: {
            breadcrumb: ['Gestión de Sucursales'],
            requiresAuth: true,
            role: 'ADMIN',
          },
          component: () => import('../views/pages/sucursales/SucursalesList.vue'),
        },
        {
          path: 'empleados',
          name: 'admin-empleados',
          meta: {
            breadcrumb: ['Gestión de Empleados'],
            requiresAuth: true,
            role: 'ADMIN',
          },
          component: () => import('../views/pages/empleados/EmpleadosList.vue'),
        },
        {
          path: 'servicios',
          name: 'admin-servicios',
          meta: {
            breadcrumb: ['Gestión de Servicios'],
            requiresAuth: true,
            role: 'ADMIN',
          },
          component: () => import('../views/pages/servicios/ServiciosList.vue'),
        },
        // {
        //   path: '/sucursales/:id',
        //   name: 'sucursal-detail',
        //   component: () => import('@/modules/sucursal/DetailSucursal.vue'),
        //   meta: { requiresAuth: true },
        // },
        /* ------------------------------------------------------------------------------------------------------------------ */
        {
          path: '/pages/empty',
          name: 'empty',
          meta: { requiresAuth: true },
          component: () => import('../views/pages/Empty.vue'),
        },
        {
          path: '/pages/crud',
          name: 'crud',
          meta: { requiresAuth: true },
          component: () => import('../views/pages/Crud.vue'),
        },
      ],
    },
    /* --------------------------------------------------- start auth --------------------------------------------------- */
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/pages/Landing.vue'),
    },
    {
      path: '/pages/notfound',
      name: 'notfound',
      component: () => import('../views/pages/NotFound.vue'),
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('../views/pages/auth/Login.vue'),
    },
    {
      path: '/auth/access',
      name: 'accessDenied',
      component: () => import('../views/pages/auth/AccessDenied.vue'),
    },
    {
      path: '/auth/error',
      name: 'error',
      component: () => import('../views/pages/auth/Error.vue'),
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import('../views/pages/auth/Register.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;
  const isAdmin = authStore.isAdmin;

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/auth/login', '/auth/register', '/auth/error', '/pages/notfound'];

  if (publicRoutes.includes(to.path)) {
    // If trying to access login/register while already authenticated, redirect to admin dashboard
    if (isAuthenticated && (to.path === '/auth/login' || to.path === '/auth/register')) {
      next('/admin');
      return;
    }
    next();
    return;
  }

  // Check if route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/auth/login');
      return;
    }

    // Check for admin role requirement
    if (to.meta.role === 'ADMIN' && !isAdmin) {
      next('/auth/access');
      return;
    }
  }

  next();
});

export default router;
