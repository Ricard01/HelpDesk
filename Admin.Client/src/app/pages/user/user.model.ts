export interface User {
    id: number;
    userName: string;
    email: string;
    phoneNumber: string;
    puesto: string;
    fechaAlta: Date;
    fotoUrl: string;
    activo: boolean;
    roles?: string[];
    // roles?: string[];
  }
