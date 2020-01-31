import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificacionServicie {
  baseUrl = environment.apiUrl + 'tickets/';
  notificaciones: any[];

  constructor(public http: HttpClient) { }

  getNotificaciones() {
    return this.http.get<any[]>(this.baseUrl + 'MostrarNotificaciones');
  }

  hideNotificacion(ticketId: number) {

    return this.http.put(this.baseUrl + 'OcultarNotificacion/' + ticketId, {});
  }

  // updateUser(id: number, user: User ) {
  //   return this.http.put( this.baseUrl + 'update/' + id , user );
  // }

  //   deleteUser(id: number ) {
  //     return this.http.post(this.baseUrl + 'delete/' + id , {});
  // }

}
