import { NgModule } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RegisterComponent } from './auth/register.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule.forRoot(),
    NgxSpinnerModule
  ],
  declarations: [
    AuthComponent,
    RegisterComponent,
    HeaderComponent,
    PagenotfoundComponent,
    SidebarComponent,

  ],
  // Para mandar las paginas fuera de este scope
  exports: [
    NgxSpinnerModule,
    AuthComponent,
    RegisterComponent,
    HeaderComponent,
    PagenotfoundComponent,
    SidebarComponent,

  ]
})
export class CoreModule {}
