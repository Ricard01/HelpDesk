import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserEditResolver } from '../shared/_resolvers/user-edit.resolver';
import { UserComponent } from './user/user.component';
import { UserListResolver } from '../shared/_resolvers/user-list.resolver';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserReadComponent } from './user/user-read/user-read.component';
import { UserReadResolver } from '../shared/_resolvers/user-read.resolver';
import { UserPerfilComponent } from './user/user-perfil/user-perfil.component';



const pagesRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  {path: 'users/:id', component: UserReadComponent, resolve: {user: UserReadResolver}},
  { path: 'user-editar',  component: UserEditComponent, resolve: { user: UserEditResolver}},
  { path: 'user-perfil/:id', component: UserPerfilComponent, data: {roles: ['Admin']}},
  { path: 'user-nuevo', component: UserComponent, data: {roles: ['Admin']}},
  { path: 'usuarios', component: UserListComponent, resolve: { users: UserListResolver}, data: {roles: ['Admin']}},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
