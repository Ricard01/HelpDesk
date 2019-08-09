import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Equipo } from './equipo.model';


@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  baseUrl = environment.apiUrl + 'equipos/';
  equpo: Equipo;
  constructor(public http: HttpClient) { }

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

  updateEquipo(equipo: Equipo) {
    return this.http.put(this.baseUrl + 'update', equipo);
  }

  checkNombreEquipo(nombreEquipo: string) {
    return this.http.get(this.baseUrl + 'equipoExist/' + nombreEquipo);
  }

  deleteEquipo(idEquipo: number) {
    return this.http.post(this.baseUrl + 'delete/' + idEquipo, {});
  }




}
