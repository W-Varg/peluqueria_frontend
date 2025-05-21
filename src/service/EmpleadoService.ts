import type { Empleado } from '@/types/empleado';
import axios from 'axios';

export const EmpleadoService = {
  baseURL: 'http://192.168.100.44:3000/empleados',

  async getEmpleados() {
    const response = await axios.get(this.baseURL);
    return response.data;
  },

  async createEmpleado(empleado: Empleado) {
    const response = await axios.post(this.baseURL, empleado);
    return response.data;
  },

  async updateEmpleado(id: number, empleado: Empleado) {
    const response = await axios.patch(`${this.baseURL}/${id}`, empleado);
    return response.data;
  },

  async deleteEmpleado(id: number) {
    const response = await axios.delete(`${this.baseURL}/${id}`);
    return response.data;
  },
};
