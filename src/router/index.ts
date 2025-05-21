import { createRouter, createWebHistory } from 'vue-router'
import ListSucursales from '@/modules/sucursal/ListSucursales.vue'
import CreateSucursal from '@/modules/sucursal/CreateSucursal.vue'
import ClienteView from '../views/ClienteView.vue'
import AppLayout from '../layout/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'e-commerce',
          meta: {
            breadcrumb: ['E-Commerce Dashboard'],
          },
          component: () => import('../views/pages/Empty.vue'),
        },
        {
          path: '/pages/empty',
          name: 'empty',
          component: () => import('../views/pages/Empty.vue'),
        },
        {
          path: '/pages/crud',
          name: 'crud',
          component: () => import('../views/pages/Crud.vue'),
        },
      ],
    },
    /* --------------------------------------------------- start auth --------------------------------------------------- */
    {
      path: '/landing',
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
    /* ---------------------------------------------------- end auth ---------------------------------------------------- */
    {
      path: '/',
      redirect: '/clientes',
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: ClienteView,
    },
    {
      path: '/sucursales',
      name: 'sucursales',
      component: ListSucursales,
      meta: { requiresAuth: true },
    },
    {
      path: '/sucursales/create',
      name: 'create-sucursal',
      component: CreateSucursal,
      meta: { requiresAuth: true, role: 'ADMIN' },
    },
    {
      path: '/sucursales/:id',
      name: 'sucursal-detail',
      component: () => import('@/modules/sucursal/DetailSucursal.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/')
  } else if (to.meta.role && user.rol !== to.meta.role) {
    next('/sucursales') // Redirige si no tiene el rol necesario
  } else {
    next()
  }
})

export default router
