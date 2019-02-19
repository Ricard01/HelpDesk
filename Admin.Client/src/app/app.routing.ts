import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './core/auth/auth.component';
import { RegisterComponent } from './core/auth/register.component';
import { PagenotfoundComponent } from './core/pagenotfound/pagenotfound.component';
import { PagesComponent } from './pages/pages.component';

const appRoutes: Routes = [

    { path: '', component: PagesComponent },
    { path: 'login', component: AuthComponent },
    { path: 'register', component: RegisterComponent },
    // { path: '**', component: PagenotfoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
