import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserEditResolver } from '../shared/_resolvers/user-edit.resolver';


const pagesRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'editar-user',  component: UserEditComponent, resolve: { user: UserEditResolver}},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
