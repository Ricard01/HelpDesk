import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnDestroy } from '@angular/core';
import pageSettings from 'src/app/config/page-settings';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { SweetalertService } from '../../../shared/services/sweetalert.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})

export class UserComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private sweetAlert: SweetalertService
  ) {

  }
  actImg = false;
  pageSettings = pageSettings;
  id: number;
  user: User;

  imagenTemp: string;


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

  ngOnInit() {
    this.route.params.subscribe(params => {
      const idUser = params['id'];
      this.getUser(idUser);
    });

  }


  ngOnDestroy() {
    this.pageSettings.pageContentFullWidth = false;
  }

  getUser(id: number) {
    this.userService.getUser(id)
      .subscribe(user => {
        this.user = user;
      }, error => {
      this.sweetAlert.error(error);
      });
  }

}
