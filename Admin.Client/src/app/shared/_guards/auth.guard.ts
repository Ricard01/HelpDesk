import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../core/_services/auth.service';
import { SweetalertService } from '../_services/sweetalert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: SweetalertService
  ) {}
  canActivate(): boolean {
    if (this.authService.loggedIn())  {
      return true;
    }

    this.alertify.error('Debes iniciar sesion');
    this.router.navigate(['/login']);
    return false;

  }
}
