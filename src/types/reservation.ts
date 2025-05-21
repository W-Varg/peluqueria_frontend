export enum EstadoReserva {
  PENDIENTE = 'PENDIENTE',
  CONFIRMADA = 'CONFIRMADA',
  CANCELADA = 'CANCELADA',
  COMPLETADA = 'COMPLETADA',
}

export interface Reservation {
  id: number;
  fecha: Date;
  hora: Date;
  clienteId: number;
  empleadoId?: number;
  servicioId: number;
  estado: EstadoReserva;
  // Relaciones
  cliente?: {
    id: number;
    nombre: string;
  };
  empleado?: {
    id: number;
    nombre: string;
  };
  servicio?: {
    id: number;
    nombre: string;
    duracion: number;
    precio: number;
  };
} 