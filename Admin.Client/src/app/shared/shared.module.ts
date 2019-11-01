import { NgModule } from '@angular/core';
import { ImagenPipe } from './_pipes/imagen.pipe';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { CommonModule } from '@angular/common';
import { AdjuntarComponent } from './_components/adjuntar/adjuntar.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { FileTypePipe } from './_pipes/filetype.pipe';



@NgModule({
  declarations: [
    FileTypePipe,
    ImagenPipe,
    AdjuntarComponent,
    GalleryComponent,
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
    FileTypePipe,
    AdjuntarComponent
  ]
})
export class SharedModule { }
