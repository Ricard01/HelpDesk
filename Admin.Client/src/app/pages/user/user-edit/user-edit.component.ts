import { Component, OnInit, OnDestroy } from '@angular/core';
import pageSettings from '../../../config/page-settings';
import { User } from '../user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styles: []
})
export class UserEditComponent implements OnInit, OnDestroy {
  pageSettings = pageSettings;
  id: number;
  user: User;
  lat = 40.7143528;
  lng = -74.0059731;

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

  constructor(private route: ActivatedRoute) {
    this.pageSettings.pageContentFullWidth = true;
  }

  ngOnInit() {
   this.route.data.subscribe( data => {
     this.user = data['user'];
   });
  }

  ngOnDestroy() {
    this.pageSettings.pageContentFullWidth = false;
  }
}
