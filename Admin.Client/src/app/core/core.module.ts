import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HasRoleDirective } from '../shared/_directives/has-role.directive';

// TODO revisar los imports PROYECTO HOSPITAL SOLO TIENE  RouterModule,    CommonModule,    PipesModule
@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    NgbModule.forRoot(),
    NgxSpinnerModule,
  ],
  declarations: [
    HasRoleDirective,
    HeaderComponent,
    SidebarComponent,
    PagenotfoundComponent,
  ],
  // Para mandar las paginas fuera de este scope
  exports: [
    HeaderComponent,
    SidebarComponent,
    PagenotfoundComponent,
    NgxSpinnerModule,

  ]
})
export class CoreModule {}
