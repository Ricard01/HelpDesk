import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/_services/auth.service';
import { UserService } from '../user.service';
import { SweetalertService } from 'src/app/shared/_services/sweetalert.service';
import pageSettings from 'src/app/config/page-settings';
import { User } from '../user.model';
import { FormGroup, FormBuilder } from '@angular/forms';

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
    private sweetAlert: SweetalertService,
    private fb: FormBuilder
  ) {
    this.pageSettings.pageContentFullWidth = true;
    route.params.subscribe( params => {

      const id = params['id'];
      this.getUser( id );
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
  userPerfil: FormGroup;

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
    // this.route.data.subscribe(data => {
    //   this.user = data['user'];
    // });

  }

  updateUser(id: number) {
    this.userService.updateUser(id, this.user).subscribe(next => {
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

  getUser( id: number ) {
    this.userService.getUser( id )
          .subscribe( user => {

            console.log( user );
            this.user = user;
          });
  }

  cambiarPassword(npassword: string ) {

  }
}

