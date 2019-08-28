import { NgModule } from '@angular/core';
import { ImagenPipe } from './_pipes/imagen.pipe';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    ImagenPipe,
  ],
  providers: [
  ],
  imports: [
    PaginationModule.forRoot(),
    ModalModule.forRoot(),

  ],
  exports: [
    PaginationModule,
    ImagenPipe,
  ]
})
export class SharedModule { }
