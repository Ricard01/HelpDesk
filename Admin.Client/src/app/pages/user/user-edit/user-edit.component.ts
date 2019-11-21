import { Component, OnInit, OnDestroy } from '@angular/core';
import pageSettings from '../../../config/page-settings';
import { User } from '../user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';
import { FormGroup,  Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styles: []
})
export class UserEditComponent implements OnInit, OnDestroy {

  actImg = false;

  constructor(
    route: ActivatedRoute,
    private userService: UserService,
    private sweetAlert: SweetalertService,
    private fb: FormBuilder
  ) {
    this.pageSettings.pageContentFullWidth = true;
    route.params.subscribe(params => {

      const id = params['id'];
      this.getUser(id);

    });
  }

  pageSettings = pageSettings;
  id: number;
  user: User;

  updatePassword: false;
  formCambiarPassword: FormGroup;


  tabs = {
    editPerfil: true,
    equipo: false,
    perfiles: false
  };

  showTab(e) {
    for (const key in this.tabs) {
      if (key === e) {
        this.tabs[key] = true;
      } else {
        this.tabs[key] = false;
      }
    }
  }

  createFormPassword() {
    this.formCambiarPassword = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],

    });
  }

  ngOnInit() {
    this.createFormPassword();
  }

  updateUser(id: number) {
    this.userService.updateUser(id, this.user).subscribe(() => {
      this.sweetAlert.success('Perfil actualizado correctamente');
    }, error => {
      // console.log(error);
      this.sweetAlert.error(error);
    });
  }

  ngOnDestroy() {
    this.pageSettings.pageContentFullWidth = false;
  }

  getUser(id: number) {
    this.userService.getUser(id)
      .subscribe(user => {
        this.user = user;
        console.log(user);
      });
  }

  cambiarPassword(id: number, password: string) {

    this.userService.changePassword(id, password).subscribe(() => {
      this.sweetAlert.success('Se cambio la contraseña correctamente');
      this.updatePassword = false;
      this.formCambiarPassword.reset();
    }, error => {
      console.log('Erro cambio contraseña' + error);
      this.sweetAlert.error(error);
    });
  }

}
