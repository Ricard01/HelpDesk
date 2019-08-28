import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './core/auth/auth.component';

import { PagenotfoundComponent } from './core/pagenotfound/pagenotfound.component';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './shared/_guards/auth.guard';

const appRoutes: Routes = [
  { path: 'login', component: AuthComponent },
  {
    path: '',
    component: PagesComponent,
    runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  { path: '**', component: PagenotfoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
