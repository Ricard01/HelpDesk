import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/_services/auth.service';
import { User } from './pages/user/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      // Sirve para que no se pierdan los datos en caso de f5 o limpiar cache
      this.authService.user = user;
      this.authService.cambiarFoto(user.fotoUrl);
    }
  }

}
