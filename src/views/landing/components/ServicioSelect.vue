<script lang="ts" setup>
import type { Servicio } from '@/types/servicio';
import axios from 'axios';
import { computed, ref, watch } from 'vue';
const props = defineProps({
  modelValue: { type: Number, required: true },
  filter: { type: Boolean, required: false, default: false },
  showClear: { type: Boolean, required: false, default: false },
});

const servicios = ref<Servicio[]>([]);
const loading = ref(true);

const fetchServicios = async () => {
  try {
    const { data } = await axios.get<Servicio[]>('/public/servicios');
    servicios.value = data.filter((servicio) => servicio._estado === true);
  } catch (error) {
    console.error('Error al cargar servicios:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchServicios();
});

const selected = ref(props.modelValue);

const servicesFiltered = computed(() => {
  return servicios.value;
});
// Este watcher escucha cambios en `modelValue` y actualiza `selected` si son diferentes
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== selected.value) {
      selected.value = newValue;
    }
  }
);

// Este watcher escucha cambios en `selected` y emite el evento `update:modelValue` si son diferentes
watch(selected, (newValue) => {
  if (newValue !== props.modelValue) {
    emit('update:modelValue', newValue);
  }
});

const emit = defineEmits(['update:modelValue', 'change']);
</script>

<template>
  <div class="ma-1">
    <Select
      v-model="selected"
      :options="servicesFiltered"
      :filter="filter"
      :loading="loading"
      :show-clear="showClear"
      optionValue="_id"
      optionLabel="_nombre"
      @change="$emit('change', selected)"
      placeholder="Seleccione el servicio"
      empty-message="no hay servicios"
      class="jl2-dropdown w-full md:w-15rem capitalize"
    >
    </Select>
  </div>
</template>
