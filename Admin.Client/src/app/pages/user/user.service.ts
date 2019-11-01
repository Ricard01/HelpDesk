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
  baseUrlAuth = environment.apiUrl + 'auth/';
  baseUrlAdmin = environment.apiUrl + 'admin/';

  user: User;
  user2: User[] = [];

  constructor(public http: HttpClient) {}

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + id);
  }

  checkUserName(username: string ) {
    return  this.http.get(this.baseUrl + 'userexist/' + username  );
  }

  getAllusers() {
    return this.http.get<User[]>(this.baseUrl + 'all');
  }

  getUsersForTicket(userId: number ) {
    return this.http.get<any[]>(this.baseUrl + userId + '/forticket' );
  }

  // getUsers(pagina?, itemsxPagina?): Observable<PaginacionRes<User[]>> {
  //   const paginacionResult: PaginacionRes<User[]> = new PaginacionRes<User[]>();

  //   let params = new HttpParams();

  //   if (pagina != null && itemsxPagina != null) {
  //     params = params.append('numPagina', pagina);
  //     params = params.append('itemsxPagina', itemsxPagina);
  //   }

  //   return this.http.get(this.baseUrl, { observe: 'response', params }).pipe(
  //     map((response: any) => {
  //       paginacionResult.result = response.body;
  //       if (response.headers.get('Paginacion') != null) {
  //         paginacionResult.paginacion = JSON.parse(response.headers.get('Paginacion'));
  //       }
  //       return paginacionResult;
  //     })
  //   );
  // }

  updateUserProfile(id: number, user: User) {
    return this.http.put(this.baseUrl + id, user);
  }

  updateUser(id: number, user: User ) {
    return this.http.put( this.baseUrl + 'update/' + id , user );
  }

  registrar(user: User) {
    return this.http.post(this.baseUrlAuth + 'registrar', user);
  }

  deleteUser(id: number ) {
      return this.http.post(this.baseUrl + 'delete/' + id , {});
  }

  getUserWithRoles(id: number) {
    return this.http.get(this.baseUrlAdmin + 'userwithroles/' + id);
  }

  updateUserRoles(user: User, roles: {}) {
    return this.http.post(this.baseUrlAdmin + 'editRoles/' + user.username, roles);
  }

  changePassword(id: number, password: string ) {

    const user = new UserToChangePassword();
    user.id = id;
    user.password = password;
    return this.http.put(this.baseUrl + 'cambiarPassword', user);

  }

}


 class UserToChangePassword {
  id: number;
  password: string;
}
