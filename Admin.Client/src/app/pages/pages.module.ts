import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

// Modulos
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

// NG
import { DashboardComponent } from './dashboard/dashboard.component';

import { UserEditComponent } from './user/user-edit/user-edit.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { UserComponent } from './user/user/user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserPerfilComponent } from './user/user-perfil/user-perfil.component';
import { UserRolesComponent } from './user/user-roles/user-roles.component';
import { EquipoComponent } from './equipo/equipo/equipo.component';

import { UserNuevoComponent } from './user/user-nuevo/user-nuevo.component';
import { UserPerfilResolver } from './user/user-perfil/user-perfil.resolver';
// import { UserListResolver } from './user/user-list/user-list.resolver';
import { EquipoListComponent } from './equipo/equipo-list/equipo-list.component';
import { EquipoNuevoComponent } from './equipo/equipo-nuevo/equipo-nuevo.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { EquipoEditComponent } from './equipo/equipo-edit/equipo-edit.component';
import { EquipoReadComponent } from './equipo/equipo-read/equipo-read.component';
import { TicketListComponent } from './ticket/ticket-list/ticket-list.component';
import { TicketListResolver } from './ticket/ticket-list/ticket-list.resolver';
import { PaginationModule } from 'ngx-bootstrap';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};


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
    EquipoListComponent,
    EquipoNuevoComponent,
    EquipoEditComponent,
    EquipoReadComponent,
    TicketListComponent,
  ],
  exports: [
    DashboardComponent,
  ],
  imports: [
    NgxMaskModule.forRoot(options),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    PaginationModule,
    SharedModule,
    NgbModule.forRoot(),
    PAGES_ROUTES,
    MatDatepickerModule,
    MatMomentDateModule,
    MatNativeDateModule,
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
    TicketListResolver
    // UserListResolver
  ]
})
export class PagesModule { }
