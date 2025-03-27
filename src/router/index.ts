import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListSucursales from '@/modules/ListSucursales.vue'
import CreateSucursal from '@/modules/CreateSucursal.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
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
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
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
