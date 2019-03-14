import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import pageSettings from '../../../config/page-settings';
import { User } from '../user.model';
import { ActivatedRoute } from '@angular/router';
import { SweetalertService } from 'src/app/shared/_services/sweetalert.service';
import { UploadService } from 'src/app/shared/_services/upload.service';
import { AuthService } from 'src/app/core/_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styles: []
})
export class UserEditComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private alert: SweetalertService,
    private authService: AuthService,
    private http: HttpClient,
    private uploadService: UploadService
  ) {
    this.pageSettings.pageContentFullWidth = true;
  }

  selectedFile: File;
  pageSettings = pageSettings;
  id: number;
  user: User;
  lat = 40.7143528;
  lng = -74.0059731;
  imagenTemp: string;

  tabs = {
    editPerfil: true,
    equipo: false,
    perfiles: false
  };
  baseUrl = environment.apiUrl + 'users/';

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

  ngOnDestroy() {
    this.pageSettings.pageContentFullWidth = false;
  }
}
