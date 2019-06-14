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

import { UserListComponent } from './user/user-list/user-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserPerfilComponent } from './user/user-perfil/user-perfil.component';
import { UserRolesComponent } from './user/user-roles/user-roles.component';
import { EquipoComponent } from './equipo/equipo/equipo.component';

import { UserNuevoComponent } from './user/user-nuevo/user-nuevo.component';
import { UserPerfilResolver } from './user/user-perfil/user-perfil.resolver';
// import { UserListResolver } from './user/user-list/user-list.resolver';
import { EquipoListComponent } from './equipo/equipo-list/equipo-list.component';




@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    UserEditComponent,
    ConfiguracionComponent,
    UserListComponent,
    UserPerfilComponent,
    EquipoComponent,
    UserRolesComponent,
    UserNuevoComponent,
    EquipoListComponent
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
      UserPerfilResolver,
      // UserListResolver
    ]
})
export class PagesModule {}
