export interface Equipo {
    id: number;
    nombreEquipo: string;
    ip: string;
    caracteristicas: string;
    activo: boolean;
    userId?: number;
    // roles?: string[];
  }
