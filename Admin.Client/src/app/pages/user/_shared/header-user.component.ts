import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../user.model';
import { AuthService } from 'src/app/core/_services/auth.service';
import { UploadService } from 'src/app/shared/services/upload.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styles: []
})

export class HeaderUserComponent implements OnInit {

  @Input() user: User;
  @Input() actualizarImg: boolean;
  @Output() tabname = new EventEmitter();
  imagenTemp: string;

  constructor(
    private authService: AuthService,
    private uploadService: UploadService,
  ) { }

  tabs = {
    editPerfil: true,
    equipo: false,
    perfiles: false
  };

  ngOnInit() {
  }

  tabChange(tabname: string) {

    this.tabname.emit(tabname);
  }


  imgToUpload(event) {
    const file = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append('File', file);
    this.uploadService.uploadImg(uploadData).subscribe((res: User) => {
      this.authService.user.fotoUrl = res.fotoUrl;
      this.imagenTemp = res.fotoUrl;
      localStorage.setItem('user', JSON.stringify(this.authService.user));
    }, error => {
      console.log(error);
    });

  }

}
