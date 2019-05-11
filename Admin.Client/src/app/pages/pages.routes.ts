import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserEditResolver } from '../shared/_resolvers/user-edit.resolver';
import { UserComponent } from './user/user.component';
import { UserListResolver } from '../shared/_resolvers/user-list.resolver';
import { UserListComponent } from './user/user-list/user-list.component';



const pagesRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-editar',  component: UserEditComponent, resolve: { user: UserEditResolver}},
  { path: 'user-nuevo', component: UserComponent},
  { path: 'user', component: UserComponent, resolve: { users: UserListResolver}},
  { path: 'usuarios', component: UserListComponent, resolve: { users: UserListResolver}},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
