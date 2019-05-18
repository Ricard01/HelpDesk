import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../pages/user/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  token: string;
  user: User;
   fotoUrl = new BehaviorSubject<string>('../../assets/user.png');
  // currentPhotoUrl = this.fotoUrl.asObservable();
  // currentUser: User;
  constructor(private http: HttpClient, private router: Router) { this.cargarStorage(); }

   cambiarFoto(fotoUrl: string) {
    this.fotoUrl.next(fotoUrl);
  }


  login(user: User, recordar: boolean = false) {
    if ( recordar ) {
      localStorage.setItem('username', user.userName );
    } else {
      localStorage.removeItem('username');
    }
    return this.http.post(this.baseUrl + 'login', user).pipe(
      map((response: any) => {
        const usuario = response;
        if (usuario) {

          this.guardarStorage( usuario.token, usuario.user);
          return true;

        }
      })
    );
  }

  guardarStorage( token: string, usuario: User ) {

    localStorage.setItem('token', token );
    localStorage.setItem('user', JSON.stringify(usuario) );
     this.decodedToken = this.jwtHelper.decodeToken(token);
    // localStorage.setItem('menu', JSON.stringify(menu) );

    this.user = usuario;
    this.token = token;
    // this.menu = menu;
  }

  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse( localStorage.getItem('user') );
      // this.menu = JSON.parse( localStorage.getItem('menu') );
    } else {
      this.token = '';
      this.user = null;
      // this.menu = [];
    }

  }


  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.decodedToken = null;
    this.user = null;
   // this.alertify.message('logged out');
   console.log('Cierre de sesion');
    this.router.navigate(['/login']);
  }

  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles = this.decodedToken.role as Array<string>;
    allowedRoles.forEach(element => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }

}
