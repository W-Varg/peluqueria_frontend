<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import api from './services/api.ts'
import ListSucursales from './modules/ListSucursales.vue'

const router = useRouter()
const route = useRoute()
const isAuthenticated = ref(false)

const loginForm = ref({
  email: '',
  password: '',
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''
    const response = await api.post('/auth/login', {
      email: loginForm.value.email,
      password: loginForm.value.password,
    })

    localStorage.setItem('token', response.data.access_token)
    localStorage.setItem('user', JSON.stringify(response.data.user))
    isAuthenticated.value = true
    router.push('/')
  } catch (err) {
    error.value = 'Credenciales incorrectas'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  isAuthenticated.value = false
  router.go(0) // Recargar la página
}

// Verificar autenticación al cargar
const token = localStorage.getItem('token')
if (token) {
  isAuthenticated.value = true
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav v-if="isAuthenticated">
        <RouterLink to="/">Inicio</RouterLink>
        <button @click="logout">Cerrar sesión</button>
      </nav>
    </div>
  </header>

  <main>
    <div v-if="!isAuthenticated" class="login-container">
      <form @submit.prevent="handleLogin" class="login-form">
        <h2>Iniciar sesión</h2>
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            v-model="loginForm.email"
            type="email"
            id="email"
            required
            placeholder="tu@email.com"
          />
        </div>
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input
            v-model="loginForm.password"
            type="password"
            id="password"
            required
            placeholder="••••••••"
          />
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Cargando...' : 'Iniciar sesión' }}
        </button>
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
    </div>

    <div v-if="isAuthenticated">
      <ListSucursales />
    </div>
  </main>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a,
nav button {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-left: 1px solid var(--color-border);
  background: none;
  color: var(--color-text);
  cursor: pointer;
  font-size: 1rem;
}

nav a:first-of-type,
nav button:first-of-type {
  border: 0;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.login-form {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button[type='submit'] {
  width: 100%;
  padding: 0.75rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type='submit']:disabled {
  background-color: #cccccc;
}

.error-message {
  color: red;
  margin-top: 1rem;
}

.sucursales-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
