import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { UserService } from '../user.service';
import { SweetalertService } from 'src/app/shared/_services/sweetalert.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-nuevo',
  templateUrl: './user-nuevo.component.html',
  styles: []
})
export class UserNuevoComponent implements OnInit {
  users: User[] = [];
  @Output() cancelRegister = new EventEmitter();
  user: User;
  nuevoUser: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor( private userService: UserService,
    private alertify: SweetalertService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.nuevoUser = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // dateOfBirth: [null, Validators.required],
      puesto: ['', [Validators.required, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true };
  }

  crearUsuario() {
    if (this.nuevoUser.valid) {
      this.user = Object.assign({}, this.nuevoUser.value);
      this.userService.registrar(this.user).subscribe(() => {
        this.alertify.success(this.user.username + ' Registrado con exito');
        this.nuevoUser.reset();
      }, error => {
        console.log('Error ' + error);
        this.alertify.error(error);
      });
    }
  }

  Cancelar() {
    this.cancelRegister.emit(false);
  }

}
