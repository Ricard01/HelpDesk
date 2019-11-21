import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { User } from '../user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';
import { userNameValidator } from 'src/app/shared/helpers/unique-username-validator';


@Component({
  selector: 'app-user-nuevo',
  templateUrl: './user-nuevo.component.html'
})
export class UserNuevoComponent implements OnInit {
  users: User[] = [];
  @ViewChild('username', {static: true}) userNameRef: ElementRef;
  @Output() cancelRegister = new EventEmitter();
  user: User;
  nuevoUser: FormGroup;
  // bsConfig: Partial<BsDatepickerConfig>;

  constructor(private userService: UserService,
    private alertify: SweetalertService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.nuevoUser = this.fb.group({
      username: [null, Validators.required, userNameValidator(this.userService)],
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
        this.userNameRef.nativeElement.focus();
        this.nuevoUser.reset();

      }, error => {
        // console.log('Error ' + error);
        this.alertify.error(error);
      });
    }
  }

  isUserTaken(): boolean {
    return this.nuevoUser.get('username').hasError('userExist');
  }

  Cancelar() {
    this.cancelRegister.emit(false);
  }

}
