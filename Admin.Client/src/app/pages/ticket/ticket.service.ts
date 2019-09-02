import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ticket } from './ticket.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginacionRes } from 'src/app/config/pagination';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  baseUrl = environment.apiUrl + 'tickets/';
  ticket: Ticket;

  constructor(public http: HttpClient) { }

  getTicket(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(this.baseUrl + id);
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

}
