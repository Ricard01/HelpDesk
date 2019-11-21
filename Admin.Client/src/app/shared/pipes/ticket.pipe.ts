import { Pipe, PipeTransform } from '@angular/core';
import { Ticket } from '../../pages/ticket/ticket.model';

@Pipe({ name: 'ticket' })
export class TicketPipe implements PipeTransform {


  transform(tickets: Ticket[], searchText: string): any {

    // Regresa todos
    if (!tickets || !searchText) {
      return tickets;
    } else {
      return tickets.filter(ticket =>
        ticket.id.toString().toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
    }

    // return tickets.filter(function (ticket) {
    //   return ticket.usuario.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    // });
  }

}
