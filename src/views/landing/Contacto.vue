<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';

const form = ref({
  nombre: '',
  email: '',
  telefono: '',
  mensaje: ''
});

const loading = ref(false);
const toast = useToast();

const enviarMensaje = async () => {
  loading.value = true;
  try {
    await axios.post('/api/contacto', form.value);
    toast.add({
      severity: 'success',
      summary: '¡Mensaje enviado!',
      detail: 'Nos pondremos en contacto contigo pronto.',
      life: 3000
    });
    form.value = {
      nombre: '',
      email: '',
      telefono: '',
      mensaje: ''
    };
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo enviar el mensaje. Por favor, intenta nuevamente.',
      life: 3000
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="contacto">
    <div class="text-center mb-6">
      <h1 class="text-4xl font-bold text-900 mb-3">Contáctanos</h1>
      <p class="text-700 text-xl line-height-3">
        Estamos aquí para responder tus preguntas y atender tus necesidades
      </p>
    </div>

    <div class="grid">
      <!-- Formulario de contacto -->
      <div class="col-12 md:col-6 p-4">
        <div class="surface-card p-4 border-round shadow-2">
          <h2 class="text-2xl font-semibold text-900 mb-4">Envíanos un mensaje</h2>
          <form @submit.prevent="enviarMensaje" class="flex flex-column gap-3">
            <div class="field">
              <label for="nombre" class="block text-900 font-medium mb-2">Nombre</label>
              <InputText
                id="nombre"
                v-model="form.nombre"
                type="text"
                class="w-full"
                required
              />
            </div>

            <div class="field">
              <label for="email" class="block text-900 font-medium mb-2">Email</label>
              <InputText
                id="email"
                v-model="form.email"
                type="email"
                class="w-full"
                required
              />
            </div>

            <div class="field">
              <label for="telefono" class="block text-900 font-medium mb-2">Teléfono</label>
              <InputText
                id="telefono"
                v-model="form.telefono"
                type="tel"
                class="w-full"
              />
            </div>

            <div class="field">
              <label for="mensaje" class="block text-900 font-medium mb-2">Mensaje</label>
              <Textarea
                id="mensaje"
                v-model="form.mensaje"
                rows="5"
                class="w-full"
                required
              />
            </div>

            <Button
              type="submit"
              label="Enviar Mensaje"
              :loading="loading"
              class="w-full"
            />
          </form>
        </div>
      </div>

      <!-- Información de contacto -->
      <div class="col-12 md:col-6 p-4">
        <div class="surface-card p-4 border-round shadow-2">
          <h2 class="text-2xl font-semibold text-900 mb-4">Información de Contacto</h2>
          
          <div class="flex flex-column gap-4">
            <div class="flex align-items-center">
              <i class="pi pi-map-marker text-2xl text-primary mr-3"></i>
              <div>
                <h3 class="text-900 font-medium mb-1">Dirección</h3>
                <p class="text-700 m-0">Av. Principal #123, La Paz, Bolivia</p>
              </div>
            </div>

            <div class="flex align-items-center">
              <i class="pi pi-phone text-2xl text-primary mr-3"></i>
              <div>
                <h3 class="text-900 font-medium mb-1">Teléfono</h3>
                <p class="text-700 m-0">+591 2 1234567</p>
              </div>
            </div>

            <div class="flex align-items-center">
              <i class="pi pi-envelope text-2xl text-primary mr-3"></i>
              <div>
                <h3 class="text-900 font-medium mb-1">Email</h3>
                <p class="text-700 m-0">contacto@peluqueria.com</p>
              </div>
            </div>

            <div class="flex align-items-center">
              <i class="pi pi-clock text-2xl text-primary mr-3"></i>
              <div>
                <h3 class="text-900 font-medium mb-1">Horario de Atención</h3>
                <p class="text-700 m-0">Lunes a Sábado: 9:00 AM - 8:00 PM</p>
                <p class="text-700 m-0">Domingo: Cerrado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 