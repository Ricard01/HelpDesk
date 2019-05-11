import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

import { User } from './user.model';
import { UserService } from './user.service';
import { ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SweetalertService } from '../../shared/_services/sweetalert.service';




@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [
    `
      table {
        width: 100%;
      }

      .mat-form-field {
        font-size: 14px;
        width: 100%;
      }
    `
  ]
})
export class UserComponent implements OnInit {
  users: User[] = [];
  @Output() cancelRegister = new EventEmitter();
  user: User;
  nuevoUser: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private userService: UserService,
    private alertify: SweetalertService, private route: ActivatedRoute,  private fb: FormBuilder) {

  }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.nuevoUser = this.fb.group({
      nusername: ['', Validators.required],
      nemail: ['', [Validators.required, Validators.email ]],
      // dateOfBirth: [null, Validators.required],
      puesto: ['', Validators.required],
      npassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('npassword').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  crearUsuario() {
    if (this.nuevoUser.valid) {
      this.user = Object.assign({}, this.nuevoUser.value);
      this.userService.register(this.user).subscribe(() => {
        this.alertify.success('Registration successful');
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  Cancelar() {
    this.cancelRegister.emit(false);
  }


}
