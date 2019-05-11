import { Injectable } from '@angular/core';
import { User } from './user.model';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginacionRes } from 'src/app/config/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl + 'users/';
  user: User;
  user2: User[] = [];

  constructor(public http: HttpClient) {}

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + id);
  }

  getAllusers() {
    return this.http.get<User[]>(this.baseUrl + 'all');
  }

  getUsers(pagina?, itemsxPagina?): Observable<PaginacionRes<User[]>> {
    const paginacionResult: PaginacionRes<User[]> = new PaginacionRes<User[]>();

    let params = new HttpParams();

    if (pagina != null && itemsxPagina != null) {
      params = params.append('numPagina', pagina);
      params = params.append('itemsxPagina', itemsxPagina);
    }

    return this.http.get(this.baseUrl, { observe: 'response', params }).pipe(
      map((response: any) => {
        paginacionResult.result = response.body;
        if (response.headers.get('Paginacion') != null) {
          paginacionResult.paginacion = JSON.parse(response.headers.get('Paginacion'));
        }
        return paginacionResult;
      })
    );
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + id, user);
  }

  getColumns(): string[] {
    return ['id', 'username', 'email', 'puesto'];
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }


  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles = null; // this.decodedToken.role as Array<string>;
    allowedRoles.forEach(element => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }

}
