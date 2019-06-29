import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


export function getToken() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    PagesComponent,
    NgbdSortableHeader
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    APP_ROUTES,
    NgbModule,
    CoreModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    }),
    // este seria ShareModule
  ],
  exports: [
    BrowserAnimationsModule,
    NgbdSortableHeader
  ],
  providers: [
    ErrorInterceptorProvider,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
