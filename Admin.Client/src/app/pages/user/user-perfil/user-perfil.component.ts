import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';
import pageSettings from 'src/app/config/page-settings';
import { User } from '../user.model';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/_services/auth.service';
import { UploadService } from 'src/app/shared/services/upload.service';
import { Equipo } from '../../equipo/equipo.model';

@Component({
  selector: 'app-user-perfil',
  templateUrl: './user-perfil.component.html',
  styles: []
})

export class UserPerfilComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private sweetAlert: SweetalertService
  ) {
    this.pageSettings.pageContentFullWidth = true;
  }
  actImg = true;
  viewMode = true;
  selectedFile: File;
  pageSettings = pageSettings;
  id: number;
  equipo: Equipo;
  user: User;
  lat = 40.7143528;
  lng = -74.0059731;
  imagenTemp: string;
  formUpdate: FormGroup;

  tabs = {
    editPerfil: true,
    equipo: false,
    perfiles: false
  };
  // baseUrl = environment.apiUrl + 'users/';

  showTab(e) {
    for (const key in this.tabs) {
      if (key === e) {
        this.tabs[key] = true;
      } else {
        this.tabs[key] = false;
      }
    }
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

  }

  updateUserProfile() {
    this.userService.updateUserProfile(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      console.log(next);
      this.sweetAlert.success('Perfil actualizado correctamente');
      // this.editForm.reset(this.user);
    }, error => {
      console.log(error);
      this.sweetAlert.error(error);
    });
  }

  ngOnDestroy() {
    this.pageSettings.pageContentFullWidth = false;
  }

}

