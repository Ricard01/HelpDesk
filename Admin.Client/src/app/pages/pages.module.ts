import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

// Modulos
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule, MatPaginatorModule, MatTableModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';

// NG
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { UserListResolver } from '../shared/_resolvers/user-list.resolver';
import { UserEditResolver } from '../shared/_resolvers/user-edit.resolver';
import { UserListComponent } from './user/user-list/user-list.component';
import { NgbdSortableHeader } from '../config/sortable.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    UserEditComponent,
    ConfiguracionComponent,
    UserListComponent
  ],
  exports: [
    DashboardComponent,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    NgbModule.forRoot(),
    PAGES_ROUTES,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
    providers: [
      UserEditResolver,
      UserListResolver
    ]
})
export class PagesModule {}
