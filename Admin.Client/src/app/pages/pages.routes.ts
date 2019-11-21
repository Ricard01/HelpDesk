import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserComponent } from './user/user/user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserPerfilComponent } from './user/user-perfil/user-perfil.component';
import { UserNuevoComponent } from './user/user-nuevo/user-nuevo.component';
import { UserPerfilResolver } from './user/user-perfil/user-perfil.resolver';
import { EquipoListComponent } from './equipo/equipo-list/equipo-list.component';
import { EquipoNuevoComponent } from './equipo/equipo-nuevo/equipo-nuevo.component';
import { EquipoEditComponent } from './equipo/equipo-edit/equipo-edit.component';
import { EquipoReadComponent } from './equipo/equipo-read/equipo-read.component';


import { TicketNuevoComponent } from './ticket/ticket-nuevo/ticket-nuevo.component';
import { TicketNuevoResolver } from './ticket/ticket-nuevo/ticket-nuevo.resolver';
import { TicketAsignadoComponent } from './ticket/ticket-asignado/ticket-asignado.component';
import { TicketComponent } from './ticket/ticket/ticket.component';
import { TicketAdminComponent } from './ticket/ticket-admin/ticket-admin.component';
import { TicketCreadoComponent } from './ticket/ticket-creado/ticket-creado.component';
import { TicketAdminResolver } from './ticket/ticket-admin/ticket-admin.resolver';




const pagesRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'ticket/creados/:id', component: TicketComponent, data: { tipo: 'creados' } },
  { path: 'ticket/asignados/:id', component: TicketComponent, data: { tipo: 'asignados' } },
  { path: 'ticket-nuevo', component: TicketNuevoComponent, resolve: { users: TicketNuevoResolver } },
  { path: 'tickets/creados', component: TicketCreadoComponent },
  { path: 'tickets/asignados', component: TicketAsignadoComponent },
  { path: 'tickets/admin', component: TicketAdminComponent, resolve: { tickets: TicketAdminResolver } },
  { path: 'equipo/detalle/:id', component: EquipoReadComponent },
  { path: 'equipo-editar/:id', component: EquipoEditComponent },
  { path: 'equipo-nuevo', component: EquipoNuevoComponent, data: { roles: ['Admin'] } },
  { path: 'equipos', component: EquipoListComponent, data: { roles: ['Admin'] } },
  { path: 'user/:id', component: UserComponent },
  { path: 'user-perfil', component: UserPerfilComponent, resolve: { user: UserPerfilResolver } },
  { path: 'user-editar/:id', component: UserEditComponent, data: { roles: ['Admin'] } },
  { path: 'user-nuevo', component: UserNuevoComponent, data: { roles: ['Admin'] } },
  { path: 'usuarios', component: UserListComponent, data: { roles: ['Admin'] } },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
