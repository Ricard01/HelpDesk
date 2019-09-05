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
import { TicketListComponent } from './ticket/ticket-list/ticket-list.component';
import { TicketListResolver } from './ticket/ticket-list/ticket-list.resolver';
import { TicketsMyComponent } from './ticket/tickets-my/tickets-my.component';




const pagesRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tickets/admin', component: TicketListComponent, resolve: { tickets: TicketListResolver}},
  { path: 'tickets', component: TicketsMyComponent, resolve: { tickets: TicketListResolver}},
  { path: 'equipo/detalle/:id', component: EquipoReadComponent},
  { path: 'equipo-editar/:id', component: EquipoEditComponent},
  { path: 'equipo-nuevo', component: EquipoNuevoComponent, data: {roles: ['Admin']}},
  { path: 'equipos', component: EquipoListComponent, data: {roles: ['Admin']}},
  { path: 'user/:id', component: UserComponent},
  { path: 'user-perfil',  component: UserPerfilComponent, resolve: { user: UserPerfilResolver } },
  { path: 'user-editar/:id', component: UserEditComponent, data: {roles: ['Admin']} },
  { path: 'user-nuevo', component: UserNuevoComponent, data: {roles: ['Admin']}},
  { path: 'usuarios', component: UserListComponent,  data: {roles: ['Admin']}},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
