import { NgModule } from '@angular/core';
import { ImagenPipe } from './_pipes/imagen.pipe';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { CommonModule } from '@angular/common';
import { AdjuntarComponent } from './_components/adjuntar/adjuntar.component';



@NgModule({
  declarations: [
    ImagenPipe,
    AdjuntarComponent,
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
    AdjuntarComponent
  ]
})
export class SharedModule { }
