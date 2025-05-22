<script setup lang="ts">
import { useRouter } from 'vue-router';
import AppConfig from '../../../layout/AppConfig.vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'primevue/usetoast';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const schema = yup.object({
  email: yup.string().required('Email is required').email('Must be a valid email'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
});

const { handleSubmit, errors, values } = useForm({
  validationSchema: schema,
  initialValues: {
    email: 'cliente@gmail.com',
    password: 'Cliente123@',
  },
});

const navigateToRegister = () => {
  router.push({ name: 'register' });
};

const onSubmit = handleSubmit(async (values) => {
  try {
    const success = await authStore.login(values.email, values.password);
    if (success) {
      toast.add({ severity: 'success', summary: 'Success', detail: 'Login successful', life: 3000 });
      if (success.rol === 'ADMIN') router.push({ name: 'admin-dashboard' });
      else router.push('/');
    } else {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Invalid credentials', life: 3000 });
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'An error occurred', life: 3000 });
  }
});

function navigateToDashboard() {
  router.push('/');
}
</script>

<template>
  <div class="bg-surface-0 dark:bg-surface-900">
    <div class="flex items-center justify-between flex-col h-screen">
      <div class="flex flex-col items-center justify-center w-full md:w-4/12 h-full text-center py-12 px-6">
        <a @click="navigateToDashboard" class="mb-12" style="cursor: pointer">
          <svg height="56" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 0H6.00019V3.82345L17 1.66667V6.66667L6.00019 8.82345V10.4901L17 8.33333V13.3333L6.00019 15.4901V20H0V0Z"
              fill="url(#paint0_linear)"
            />
            <defs>
              <linearGradient id="paint0_linear" x1="3.33335" y1="3.08442e-08" x2="8.49995" y2="20" gradientUnits="userSpaceOnUse">
                <stop stop-color="var(--p-primary-400)" />
                <stop offset="1" stop-color="var(--p-primary-700)" />
              </linearGradient>
            </defs>
          </svg>
        </a>
        <form @submit="onSubmit" class="flex flex-col">
          <IconField class="w-full mb-6">
            <InputIcon class="pi pi-envelope" />
            <InputText
              v-model="values.email"
              id="email"
              type="text"
              class="w-full md:w-[25rem] text-surface-500 dark:text-surface-400 bg-surface-50 dark:bg-surface-800 border-surface-200 dark:border-surface-600"
              :class="{ 'p-invalid': errors.email }"
              placeholder="Email"
            />
          </IconField>
          <small class="p-error" v-if="errors.email">{{ errors.email }}</small>

          <IconField class="w-full mb-6">
            <InputIcon class="pi pi-lock" />
            <InputText
              v-model="values.password"
              id="password"
              type="password"
              class="w-full md:w-[25rem] text-surface-500 dark:text-surface-400 bg-surface-50 dark:bg-surface-800 border-surface-200 dark:border-surface-600"
              :class="{ 'p-invalid': errors.password }"
              placeholder="Password"
            />
          </IconField>
          <small class="p-error" v-if="errors.password">{{ errors.password }}</small>

          <Button type="submit" label="Sign In" class="w-full mb-6"></Button>
          <a href="#" class="font-medium text-sm text-surface-300 dark:text-surface-500">forget password?</a>
          <p class="font-medium text-surface-400 dark:text-surface-400 m-0 mt-12">
            Don't you have an account, <a class="text-primary cursor-pointer" @click="navigateToRegister">Registrarse</a>
          </p>
        </form>
      </div>
      <div class="flex flex-wrap items-center pb-20 px-6">
        <h4 class="m-0 mr-8" style="line-height: 22px">peluqueria</h4>
        <h6 class="m-0 font-medium text-surface-300 dark:text-surface-500" style="line-height: 17px">Copyright Ⓒ PrimeTek Informatics</h6>
      </div>
    </div>
  </div>

  <AppConfig simple />
</template>
