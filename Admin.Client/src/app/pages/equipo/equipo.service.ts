import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Equipo } from './equipo.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  baseUrl = environment.apiUrl + 'equipos/';
  equpo: Equipo;
  constructor(public http: HttpClient) { }

  getEquipo(id: number): Observable<Equipo> {
    return this.http.get<Equipo>(this.baseUrl + id);
  }

  getAllEquipos() {
    return this.http.get<Equipo[]>(this.baseUrl);
  }

  getEquipoDefault(iduser: number) {
    return this.http.get<Equipo>(this.baseUrl + 'default/' + iduser);
  }

  getEquiposDisponibles(iduser: number) {
    return this.http.get<Equipo[]>(this.baseUrl + 'equiposDisponibles/' + iduser);
  }

  createEquipo(equipo: Equipo) {
    return this.http.post(this.baseUrl, equipo);
  }

  updateEquipoUser(equipo: Equipo) {
    return this.http.put(this.baseUrl + 'updateEquipoUser', equipo);
  }

  updateEquipo(equipoId: number, equipo: Equipo) {
    return this.http.put(this.baseUrl + 'update/' + equipoId, equipo);
  }
  checkNombreEquipo(nombreEquipo: string) {
    return this.http.get(this.baseUrl + 'equipoExist/' + nombreEquipo);
  }

  deleteEquipo(idEquipo: number) {
    return this.http.post(this.baseUrl + 'delete/' + idEquipo, {});
  }




}
