import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import pageSettings from '../../config/page-settings';
import { AuthService } from '../_services/auth.service';
import { SweetalertService } from '../../shared/_services/sweetalert.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
  pageSettings = pageSettings;
  // user: User = {};
  username: string;
  recordar = false;
  model: any = {};

  constructor(
    private router: Router,
    private renderer: Renderer2,
    public authService: AuthService,
    private alert: SweetalertService
  ) {
    this.pageSettings.pageEmpty = true;
    this.renderer.addClass(document.body, 'bg-white');
  }

  ngOnInit() {
    this.model.username = localStorage.getItem('username') || '';
    if (this.model.username.length > 1) {
      this.recordar = true;
    }
  }
  ngOnDestroy() {
    this.pageSettings.pageEmpty = false;
    this.renderer.removeClass(document.body, 'bg-white');
  }

  login(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    this.authService.login(this.model, loginForm.value.recordar).subscribe(
      next => {
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.log(error);
        this.alert.error('El nombre de usuario o password no es valido');
      }
    );
  }

  loggedIn() {
    // return this.authService.loggedIn(); TODo porque no la manejan al final del curso?
    const token = localStorage.getItem('token');
    return !!token;
  }
}
