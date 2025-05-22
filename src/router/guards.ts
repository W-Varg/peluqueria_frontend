import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

export const authGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAdminRoute = to.matched.some((record) => record.meta.requiresAdmin);

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
    return;
  }

  if (isAdminRoute && authStore.user?.rol !== 'ADMIN') {
    next('/');
    return;
  }

  next();
};
