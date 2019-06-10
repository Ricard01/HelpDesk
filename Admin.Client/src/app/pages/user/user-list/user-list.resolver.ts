import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { SweetalertService } from '../../../shared/_services/sweetalert.service';
import { AuthService } from '../../../core/_services/auth.service';


@Injectable()
export class UserListResolver implements Resolve<User[]> {
    numPagina = 1;
    itemsxPagina = 5;
    constructor(private userService: UserService, private router: Router,
        private alertify: SweetalertService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.numPagina, this.itemsxPagina) .pipe(
            catchError(error => {
                this.alertify.error('Ocurrio un problema al obtener la informacion');
                this.router.navigate(['/dashboard']);
                return of(null);
            })
        );
    }
}
