import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

// Modulos
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// NG
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserEditResolver } from '../shared/_resolvers/user-edit.resolver';
import { TicketsComponent } from './tickets/tickets.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    UserEditComponent,
    TicketsComponent,
  ],
  exports: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    SharedModule,
    PAGES_ROUTES],
    providers: [
      UserEditResolver
    ]
})
export class PagesModule {}
