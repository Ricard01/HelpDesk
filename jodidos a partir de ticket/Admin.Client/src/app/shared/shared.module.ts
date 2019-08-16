import { NgModule } from '@angular/core';
import { ImagenPipe } from './_pipes/imagen.pipe';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ImagenPipe,
   ],
  imports: [
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    CommonModule
  ],
  exports: [
    PaginationModule,
    ImagenPipe,

  ]
})
export class SharedModule { }
