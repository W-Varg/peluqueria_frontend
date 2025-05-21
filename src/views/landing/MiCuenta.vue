<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';

const authStore = useAuthStore();
const toast = useToast();
const loading = ref(false);

interface UserProfile {
  _id: number;
  _nombre: string;
  _email: string;
  _telefono: string;
  _direccion: string;
}

const profile = ref<UserProfile | null>(null);
const editMode = ref(false);
const editForm = ref({
  _nombre: '',
  _email: '',
  _telefono: '',
  _direccion: ''
});

const fetchProfile = async () => {
  loading.value = true;
  try {
    const { data } = await axios.get<UserProfile>(`/api/clientes/${authStore.user?.clienteId}`);
    profile.value = data;
    editForm.value = { ...data };
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo cargar la información del perfil',
      life: 3000
    });
  } finally {
    loading.value = false;
  }
};

const updateProfile = async () => {
  loading.value = true;
  try {
    const { data } = await axios.put<UserProfile>(
      `/api/clientes/${authStore.user?.clienteId}`,
      editForm.value
    );
    profile.value = data;
    editMode.value = false;
    toast.add({
      severity: 'success',
      summary: 'Perfil actualizado',
      detail: 'Los cambios han sido guardados exitosamente',
      life: 3000
    });
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo actualizar el perfil',
      life: 3000
    });
  } finally {
    loading.value = false;
  }
};

const toggleEditMode = () => {
  if (editMode.value) {
    editForm.value = { ...profile.value! };
  }
  editMode.value = !editMode.value;
};

onMounted(() => {
  fetchProfile();
});
</script>

<template>
  <div class="mi-cuenta">
    <div class="text-center mb-6">
      <h1 class="text-4xl font-bold text-900 mb-3">Mi Cuenta</h1>
      <p class="text-700 text-xl line-height-3">
        Gestiona tu información personal y preferencias
      </p>
    </div>

    <div class="surface-card p-4 border-round shadow-2">
      <div class="flex justify-content-between align-items-center mb-4">
        <h2 class="text-2xl font-semibold text-900 m-0">Información Personal</h2>
        <Button
          :label="editMode ? 'Cancelar' : 'Editar'"
          :icon="editMode ? 'pi pi-times' : 'pi pi-pencil'"
          :severity="editMode ? 'secondary' : 'primary'"
          text
          @click="toggleEditMode"
          :disabled="loading"
        />
      </div>

      <div v-if="loading" class="flex justify-content-center">
        <ProgressSpinner />
      </div>

      <div v-else-if="profile" class="grid">
        <template v-if="!editMode">
          <div class="col-12 md:col-6">
            <div class="mb-4">
              <h3 class="text-lg font-medium text-900 mb-2">Nombre</h3>
              <p class="text-700 m-0">{{ profile._nombre }}</p>
            </div>
            <div class="mb-4">
              <h3 class="text-lg font-medium text-900 mb-2">Email</h3>
              <p class="text-700 m-0">{{ profile._email }}</p>
            </div>
          </div>
          <div class="col-12 md:col-6">
            <div class="mb-4">
              <h3 class="text-lg font-medium text-900 mb-2">Teléfono</h3>
              <p class="text-700 m-0">{{ profile._telefono || 'No especificado' }}</p>
            </div>
            <div class="mb-4">
              <h3 class="text-lg font-medium text-900 mb-2">Dirección</h3>
              <p class="text-700 m-0">{{ profile._direccion || 'No especificada' }}</p>
            </div>
          </div>
        </template>

        <template v-else>
          <form @submit.prevent="updateProfile" class="col-12">
            <div class="grid">
              <div class="col-12 md:col-6 field">
                <label for="nombre" class="block text-900 font-medium mb-2">Nombre</label>
                <InputText
                  id="nombre"
                  v-model="editForm._nombre"
                  type="text"
                  class="w-full"
                  required
                />
              </div>

              <div class="col-12 md:col-6 field">
                <label for="email" class="block text-900 font-medium mb-2">Email</label>
                <InputText
                  id="email"
                  v-model="editForm._email"
                  type="email"
                  class="w-full"
                  required
                />
              </div>

              <div class="col-12 md:col-6 field">
                <label for="telefono" class="block text-900 font-medium mb-2">Teléfono</label>
                <InputText
                  id="telefono"
                  v-model="editForm._telefono"
                  type="tel"
                  class="w-full"
                />
              </div>

              <div class="col-12 md:col-6 field">
                <label for="direccion" class="block text-900 font-medium mb-2">Dirección</label>
                <InputText
                  id="direccion"
                  v-model="editForm._direccion"
                  type="text"
                  class="w-full"
                />
              </div>

              <div class="col-12 flex justify-content-end">
                <Button
                  type="submit"
                  label="Guardar Cambios"
                  icon="pi pi-check"
                  :loading="loading"
                />
              </div>
            </div>
          </form>
        </template>
      </div>
    </div>
  </div>
</template> 