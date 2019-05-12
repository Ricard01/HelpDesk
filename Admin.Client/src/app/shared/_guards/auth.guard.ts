import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
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

  canActivate(next: ActivatedRouteSnapshot): boolean {
    const roles = next.firstChild.data['roles'] as Array<string>;
    if (roles) {

      const match = this.authService.roleMatch(roles);
      if (match) {

        return true;
      } else {
        this.router.navigate(['dashboard']);
        this.alertify.error('Acceso denegado');
      }
    }
    if (this.authService.loggedIn())  {
      return true;
    }

    this.alertify.error('Debes iniciar sesion');
    this.router.navigate(['/login']);
    return false;

  }


}
