import { NgModule } from '@angular/core';
import { ImagenPipe } from './_pipes/imagen.pipe';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { CommonModule } from '@angular/common';
import { TicketPipe } from './_pipes/ticket.pipe';
// import { HasRoleDirective } from './_directives/has-role.directive';


@NgModule({
  declarations: [
    ImagenPipe,
    TicketPipe,
  ],
  providers: [
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),

  ],
  exports: [
    PaginationModule,
    ImagenPipe,
    TicketPipe
  ]
})
export class SharedModule { }
