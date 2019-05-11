import { NgModule } from '@angular/core';
import { ImagenPipe } from './_pipes/imagen.pipe';
import { TableComponent } from './_components/table/table.component';
import { TableRowComponent } from './_components/table/table-row/table-row.component';
import { PaginationModule } from 'ngx-bootstrap';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ ImagenPipe, TableComponent, TableRowComponent],
  imports: [
    PaginationModule.forRoot(),
    CommonModule
  ],
  exports: [

    PaginationModule,
    ImagenPipe,
    TableComponent
  ]
})
export class SharedModule { }
