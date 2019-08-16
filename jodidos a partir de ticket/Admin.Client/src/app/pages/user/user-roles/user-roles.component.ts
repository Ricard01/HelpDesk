import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { User } from '../user.model';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styles: []
})
export class UserRolesComponent implements OnInit {
  @Output() updateSelectedRoles = new EventEmitter();
  user: User;
  roles: any[];

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }


  updateRoles() {
    this.updateSelectedRoles.emit(this.roles);
    this.bsModalRef.hide();
  }

}
