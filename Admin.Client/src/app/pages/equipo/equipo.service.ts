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

  updateEquipo(equipo: Equipo) {
    return this.http.put(this.baseUrl + 'update', equipo);
  }




}
