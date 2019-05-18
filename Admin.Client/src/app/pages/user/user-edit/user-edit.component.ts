import { Component, OnInit, OnDestroy } from '@angular/core';
import pageSettings from '../../../config/page-settings';
import { User } from '../user.model';
import { ActivatedRoute } from '@angular/router';
import { UploadService } from 'src/app/shared/_services/upload.service';
import { AuthService } from 'src/app/core/_services/auth.service';
import { UserService } from '../user.service';
import { SweetalertService } from 'src/app/shared/_services/sweetalert.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Equipo } from '../../equipo/equipo.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styles: []
})
export class UserEditComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private uploadService: UploadService,
    private sweetAlert: SweetalertService
  ) {
    this.pageSettings.pageContentFullWidth = true;
  }

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

    // this.formUpdate = new FormGroup({
    //   phoneNumber:  new FormControl('', [ Validators.pattern('^[0-9]*$'),   Validators.minLength(8),  ])

    // } );

  }

  imgToUpload(event) {
    const file = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append('File', file);
    this.uploadService.uploadImg(uploadData).subscribe( (res: User) => {


          this.authService.user.fotoUrl = res.fotoUrl;
          this.imagenTemp = res.fotoUrl;
          localStorage.setItem('user', JSON.stringify(this.authService.user));


    }, error => {
      console.log(error);
    });

  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
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
