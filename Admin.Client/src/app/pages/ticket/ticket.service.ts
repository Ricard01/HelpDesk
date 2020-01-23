import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ticket } from './ticket.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginacionRes } from 'src/app/config/pagination';
import { TicketRespuesta } from './ticket-resp/ticket-resp.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  baseUrl = environment.apiUrl + 'tickets/';
  ticket: Ticket;

  constructor(public http: HttpClient) { }

  // getTicket(id: number): Observable<Ticket> {
  //   return this.http.get<Ticket>(this.baseUrl + id);
  // } se dio de baja el 5/12/19

  getTicket(Creado: boolean, ticketId) {

    if (Creado) {
      return this.http.get<Ticket>(this.baseUrl + 'GetTicketCreadoById/' + ticketId);
    } else {
      return this.http.get<Ticket>(this.baseUrl + 'TicketAsignadoById/' + ticketId);
    }

  }

  getTicketCreadoById(ticketid: number) {
    return this.http.get<Ticket>(this.baseUrl + 'GetTicketCreadoById/' + ticketid);
  }

  getTicketsCreados() {
    return this.http.get<Ticket[]>(this.baseUrl + 'GetTicketsCreados');
  }
  getTicketAsignadoById(ticketid: number) {
    return this.http.get<Ticket>(this.baseUrl + 'TicketAsignadoById/' + ticketid);
  }

  getTicketsAsignados() {
    return this.http.get<Ticket[]>(this.baseUrl + 'GetTicketsAsignados');
  }

  getTickets(pagina?, itemsxPagina?, userParams?): Observable<PaginacionRes<Ticket[]>> {
    const paginacionRes: PaginacionRes<Ticket[]> = new PaginacionRes<Ticket[]>();
    let params = new HttpParams();
    if (pagina != null && itemsxPagina != null) {
      params = params.append('numPagina', pagina);
      params = params.append('itemsxPagina', itemsxPagina);
    }


    if (userParams != null) {
      params = params.append('fechaIni', userParams.fechaIni);
      params = params.append('fechaFin', userParams.fechaFin);
      params = params.append('estatus', userParams.estatus);
      params = params.append('orderby', userParams.orderBy);
    }
    return this.http.get<Ticket[]>(this.baseUrl, { observe: 'response', params })
      .pipe(
        map(resp => {
          paginacionRes.result = resp.body;

          if (resp.headers.get('Paginacion') != null) {
            paginacionRes.paginacion = JSON.parse(resp.headers.get('Paginacion'));
          }
          return paginacionRes;
        })
      );
  }

  createTicket(ticket: Ticket) {
    return this.http.post(this.baseUrl, ticket);
  }

  createTicketRespuesta(respuesta: TicketRespuesta) {
    return this.http.post(this.baseUrl + 'TicketRespuesta', respuesta);
  }

  getUltimaRespuestaInsertada(respuestaId: number) {
    return this.http.get(this.baseUrl + 'GetUltimaRespuestaInsertada/' + respuestaId);
  }

}
