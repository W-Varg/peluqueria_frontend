interface Duracion {
  _minutos: number;
}

interface Precio {
  _monto: number;
  _moneda: string;
}

export interface Servicio {
  _id: number;
  _nombre: string;
  _descripcion: string;
  _duracion: Duracion;
  _precio: Precio;
  _estado: boolean;
}

export interface ServicioDto {
  id?: number;
  nombre: string;
  descripcion: string;
  duracion: number;
  precio: number;
  estado: boolean;
}

export type CreateServicioDto = {
  nombre: string;
  descripcion: string;
  duracion: number;
  precio: number;
  estado: boolean;
};

export type UpdateServicioDto = Partial<CreateServicioDto>;

export interface ServicioFilters {
  global: {
    value: string | null;
    matchMode: string;
  };
} 