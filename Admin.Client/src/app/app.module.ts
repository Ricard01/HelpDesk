import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './core/auth/auth.component';
import { RegisterComponent } from './core/auth/register.component';
import { HttpClientModule } from '@angular/common/http';
import {  ErrorInterceptorProvider } from './shared/_interceptor/error.interceptor';
import { AuthGuard } from './shared/_guards/auth.guard';

export function getToken() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegisterComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    APP_ROUTES,
    CoreModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
     })// este seria ShareModule
  ],
  providers: [
    ErrorInterceptorProvider,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
