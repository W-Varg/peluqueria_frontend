import axios from 'axios';
import { type CreateReservaDto, type Reservation } from '@/types/reservation';

export const ReservationService = {
  baseURL: 'http://192.168.100.44:3000/reservas',
  async getReservations() {
    const response = await axios.get(this.baseURL + '');
    return response.data;
  },

  async getReservation(id: number) {
    const response = await axios.get(this.baseURL + `/${id}`);
    return response.data;
  },

  async createReservation(reservation: Omit<Reservation, 'id'>) {
    const response = await axios.post(this.baseURL, reservation);
    return response.data;
  },

  async updateReservation(id: number, reservation: Partial<Reservation>) {
    const response = await axios.put(this.baseURL + `/${id}`, reservation);
    return response.data;
  },

  async deleteReservation(id: number) {
    const response = await axios.delete(this.baseURL + `/${id}`);
    return response.data;
  },

  async createReservationPublic(reservation: CreateReservaDto) {
    const response = await axios.post(this.baseURL + '/public', reservation);
    return response.data;
  },
};
