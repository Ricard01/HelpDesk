import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HasRoleDirective } from '../shared/directives/has-role.directive';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    NgbModule,
    NgxSpinnerModule,
  ],
  declarations: [
    HasRoleDirective,
    HeaderComponent,
    SidebarComponent,
    PagenotfoundComponent,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    PagenotfoundComponent,
    NgxSpinnerModule,

  ]
})
export class CoreModule {}
