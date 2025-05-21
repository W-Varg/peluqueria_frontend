import type { ServicioDto } from '@/types/servicio';
import axios from 'axios';

export const CrudService = {
  baseURL: 'http://192.168.100.44:3000/servicios',

  async getServices() {
    const response = await axios.get(this.baseURL);
    return response.data;
  },

  async createServices(sucursal: ServicioDto) {
    const response = await axios.post(this.baseURL, sucursal);
    return response.data;
  },

  async updateServices(id: number, sucursal: ServicioDto) {
    const response = await axios.patch(`${this.baseURL}/${id}`, sucursal);
    return response.data;
  },

  async deleteServices(id: number) {
    const response = await axios.delete(`${this.baseURL}/${id}`);
    return response.data;
  },
};
