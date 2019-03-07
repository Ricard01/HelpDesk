import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './core/auth/auth.component';
import { RegisterComponent } from './core/auth/register.component';
import { PagenotfoundComponent } from './core/pagenotfound/pagenotfound.component';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './shared/_guards/auth.guard';

const appRoutes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'registrar', component: RegisterComponent },
  {
    path: '',
    component: PagesComponent,
    canActivate: [ AuthGuard ],
    loadChildren: './pages/pages.module#PagesModule'
  },
  { path: '**', component: PagenotfoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
