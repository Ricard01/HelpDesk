import { NgModule } from '@angular/core';
import { ImagenPipe } from './pipes/imagen.pipe';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { CommonModule } from '@angular/common';
import { FileTypePipe } from './pipes/filetype.pipe';
import { MatPaginatorIntl } from '@angular/material';
import { getSpanishPaginatorIntl } from './components/spanish-paginator/spanish-paginator.component';



@NgModule({
  declarations: [
    FileTypePipe,
    ImagenPipe,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),

  ],
  exports: [
    PaginationModule,
    ImagenPipe,
    FileTypePipe,
  ]
})
export class SharedModule { }
