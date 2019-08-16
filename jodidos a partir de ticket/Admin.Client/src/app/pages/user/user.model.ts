export interface User {
    id: number;
    username: string;
    email: string;
    phoneNumber: string;
    puesto: string;
    fechaAlta: Date;
    fotoUrl: string;
    activo: boolean;
    roles?: string[];
    // roles?: string[];
  }
