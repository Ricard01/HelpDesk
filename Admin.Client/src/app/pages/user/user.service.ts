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

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + id);
  }

  updateUser(id: number, user: User ) {
    return this.http.put(this.baseUrl + id, user) ;
  }

}
