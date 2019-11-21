import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../../user/user.model';
import { UserService } from '../../user/user.service';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';
import { AuthService } from 'src/app/core/_services/auth.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TicketNuevoResolver implements Resolve<User> {
    constructor(private userService: UserService, private router: Router,
        private alertify: SweetalertService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUsersForTicket(this.authService.user.id).pipe(
            catchError(error => {
                this.alertify.error('Ocurrio un problema al obtener la informacion' + error);
                this.router.navigate(['/dashboard']);
                return of(null);
            })
        );
    }
}
