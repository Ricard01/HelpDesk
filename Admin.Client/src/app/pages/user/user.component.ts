import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { UserService } from './user.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import pageSettings from 'src/app/config/page-settings';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})

export class UserComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder
  ) {

  }

  pageSettings = pageSettings;
  id: number;
  user: User;

  imagenTemp: string;
  formRead = true;
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
      });
  }

}
