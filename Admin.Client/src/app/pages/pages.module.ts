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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserReadComponent } from './user/user-read/user-read.component';
import { UserReadResolver } from '../shared/_resolvers/user-read.resolver';
import { UserPerfilComponent } from './user/user-perfil/user-perfil.component';
import { UserRolesComponent } from './user/user-roles/user-roles.component';
import { EquipoComponent } from './equipo/equipo/equipo.component';



@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    UserEditComponent,
    ConfiguracionComponent,
    UserListComponent,
    UserReadComponent,
    UserPerfilComponent,
    EquipoComponent,
    UserRolesComponent
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
  entryComponents: [
    UserRolesComponent
  ],
    providers: [
      UserEditResolver,
      UserListResolver,
      UserReadResolver
    ]
})
export class PagesModule {}
