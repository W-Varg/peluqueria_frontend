<template>
    <div class="p-fluid">
        <div class="field">
            <label class="font-bold">Nombre</label>
            <div class="text-900">{{ empleado.nombre }}</div>
        </div>

        <div class="field">
            <label class="font-bold">Apellido</label>
            <div class="text-900">{{ empleado.apellido }}</div>
        </div>

        <div class="field">
            <label class="font-bold">Teléfono</label>
            <div class="text-900">{{ empleado.telefono }}</div>
        </div>

        <div class="field">
            <label class="font-bold">Email</label>
            <div class="text-900">{{ empleado.email }}</div>
        </div>

        <div class="field">
            <label class="font-bold">Estado</label>
            <div class="text-900">
                <Tag :value="empleado.estado ? 'Activo' : 'Inactivo'" :severity="getSeverity(empleado.estado)" />
            </div>
        </div>

        <div class="flex justify-content-end mt-4">
            <Button label="Cerrar" icon="pi pi-times" class="p-button-text" @click="$emit('close')" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    empleado: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['close']);

const getSeverity = (estado) => {
    return estado ? 'success' : 'danger';
};
</script> 