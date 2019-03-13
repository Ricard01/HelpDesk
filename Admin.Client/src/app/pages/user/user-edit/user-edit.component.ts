import { Component, OnInit, OnDestroy } from '@angular/core';
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
    private http: HttpClient
  ) {
    this.pageSettings.pageContentFullWidth = true;
  }

  selectedFile: File;
  pageSettings = pageSettings;
  id: number;
  user: User;
  lat = 40.7143528;
  lng = -74.0059731;

  imagenSubir: File;
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

  imgToUpload( event) {

    const file = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append('File', file );

    const url = this.baseUrl + this.authService.user.id + '/photos';

    this.http.post(url, uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe( events => {
        console.log(events); // handle event here
      });
  }

  ngOnDestroy() {
    this.pageSettings.pageContentFullWidth = false;
  }
}
