import { User } from '../user/user.model';

export interface Ticket {
    id: number;
    userId: number;
    fechaAlta: Date;
    titulo: string;
    mensajes: string;
    prioridad: number;
    estatus: number;
    user: User;
    ticketsAsignados?: string[];
    adjuntos?: string[];
    ticketRespuestas?: TicketRespuestas[];
}

export interface TicketRespuestas {
    id: number;
    userName: string;
    fecha: Date;
    respuesta: string;
    cerroTicket: number;
    fotoUrl?: string[];
    adjuntosRespuesta?: AdjuntosRespuesta[];
}

export interface AdjuntosRespuesta {
    id: number;
    userName: string;
    fecha: Date;
    respuesta: string;
    cerroTicket: number;
    fotoUrl?: string[];
}


