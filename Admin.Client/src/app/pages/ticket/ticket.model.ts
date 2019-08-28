import { User } from '../user/user.model';
export interface Ticket {
    id: number;
    userId: number;
    fechaAlta: Date;
    titulo: string;
    mensaje: string;
    prioridad: number;
    status: number;
    user: User;
}
