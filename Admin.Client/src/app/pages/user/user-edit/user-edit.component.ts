import { Component, OnInit, OnDestroy } from '@angular/core';
import pageSettings from '../../../config/page-settings';
import { User } from '../user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { SweetalertService } from 'src/app/shared/_services/sweetalert.service';
import { FormGroup,  Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styles: []
})
export class UserEditComponent implements OnInit, OnDestroy {
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
      // if ( id !== 'nuevo' ) {
      // }

    });
  }

  // selectedFile: File;
  pageSettings = pageSettings;
  id: number;
  user: User;

  // lat = 40.7143528;
  // lng = -74.0059731;
  imagenTemp: string;
  updatePassword: false;
  formCambiarPassword: FormGroup;


  tabs = {
    editPerfil: false,
    equipo: true,
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

  createRegisterForm() {
    this.formCambiarPassword = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],

    });
  }

  ngOnInit() {
    this.createRegisterForm();
  }

  updateUser(id: number) {
    this.userService.updateUser(id, this.user).subscribe(() => {
      this.sweetAlert.success('Perfil actualizado correctamente');
    }, error => {
      console.log(error);
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
