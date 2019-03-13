import { Injectable } from '@angular/core';
import { User } from './user.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl + 'users/';
  user: User;
  user2: User[] = [];

  constructor(public http: HttpClient) {}

  getUser( id ): Observable<User> {
   return this.http.get<User>(this.baseUrl + id);

  }

  updatePhoto( ) {

  }


  // cambiarImagen( archivo: File, id: string ) {

  //   this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
  //         .then( (resp: any) => {

  //           this.usuario.img = resp.usuario.img;
  //           swal( 'Imagen Actualizada', this.usuario.nombre, 'success' );
  //           this.guardarStorage( id, this.token, this.usuario, this.menu );

  //         })
  //         .catch( resp => {
  //           console.log( resp );
  //         }) ;

  // }


}
