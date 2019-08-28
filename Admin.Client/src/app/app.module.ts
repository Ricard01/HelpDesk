import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './core/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorInterceptorProvider } from './shared/_interceptor/error.interceptor';
import { AuthGuard } from './shared/_guards/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { NgbdSortableHeader } from './config/sortable.directive';
import localeEs from '@angular/common/locales/es-MX';
import localeEsExtra from '@angular/common/locales/extra/es-MX';
import { registerLocaleData } from '@angular/common';


registerLocaleData(localeEs, 'es-MX', localeEsExtra);

export function getToken() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    // Todo lo que sirve dentro de este scope / modulo
    AppComponent,
    AuthComponent,
    PagesComponent,
    NgbdSortableHeader,
  ],
  imports: [
    // Cuando incluyan la palabra modulo eva en esta area
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    APP_ROUTES,
    CoreModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    }),
  ],
  exports: [
    // Lo que puedo utilizar en otros componentes.
    BrowserAnimationsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-MX' },
    ErrorInterceptorProvider,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
