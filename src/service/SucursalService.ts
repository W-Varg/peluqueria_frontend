import axios from 'axios';

export const SucursalService = {
  baseURL: 'http://192.168.100.44:3000/sucursales',

  async getSucursales() {
    const response = await axios.get(this.baseURL);
    return response.data;
  },

  async createSucursal(sucursal: any) {
    const response = await axios.post(this.baseURL, sucursal);
    return response.data;
  },

  async updateSucursal(id: number, sucursal: any) {
    const response = await axios.patch(`${this.baseURL}/${id}`, sucursal);
    return response.data;
  },

  async deleteSucursal(id: number) {
    const response = await axios.delete(`${this.baseURL}/${id}`);
    return response.data;
  },
};
