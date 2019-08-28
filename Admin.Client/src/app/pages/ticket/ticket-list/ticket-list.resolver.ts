import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Ticket } from '../ticket.model';
import { SweetalertService } from 'src/app/shared/_services/sweetalert.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TicketService } from '../ticket.service';

@Injectable()
export class TicketListResolver implements Resolve<Ticket[]> {
    numPagina = 1;
    itemsxPagina = 10;
    constructor(private ticketService: TicketService, private router: Router,
        private alertify: SweetalertService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Ticket[]> {
        return this.ticketService.getTickets(this.numPagina, this.itemsxPagina).pipe(
            catchError(error => {
                this.alertify.error('Ocurrio un problema al obtener la informacion' + error );
                this.router.navigate(['/dashboard']);
                return of(null);
            })
        );
    }
}
