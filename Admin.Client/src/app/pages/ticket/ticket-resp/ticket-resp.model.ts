import { User } from '../../user/user.model';

export interface TicketRespuesta {
    id: number;
    ticketId: number;
    userId: number;
    respuesta: string;
    estatus: number;
    fecha: Date;
    user: User;
}
