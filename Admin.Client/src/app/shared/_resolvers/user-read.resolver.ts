import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/pages/user/user.model';
import { UserService } from 'src/app/pages/user/user.service';
import { SweetalertService } from '../_services/sweetalert.service';

@Injectable()
export class UserReadResolver implements Resolve<User> {
    constructor(private userService: UserService, private router: Router,
        private alertify: SweetalertService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
      console.log('read' + route + route.params);
        return this.userService.getUser(route.params['id']).pipe(
            catchError(_error => {
                this.alertify.error('Ocurrio un problema al obtener la informacion');
                this.router.navigate(['/usuarios']);
                return of(null);
            })
        );
    }
}
