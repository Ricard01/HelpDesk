import { User } from '../user/user.model';
export interface Ticket {
    id: number;
    userId: number;
    fechaAlta: Date;
    titulo: string;
    mensaje: string;
    prioridad: number;
    estatus: number;
    user: User;
    ticketsAsignados?: string[];
}
