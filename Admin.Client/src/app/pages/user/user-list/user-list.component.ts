import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { SweetalertService } from '../../../shared/_services/sweetalert.service';
import Swal from 'sweetalert2';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { UserRolesComponent } from '../user-roles/user-roles.component';




@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  user: User;
  userRoles: User;
  users: User[];
  bsModalRef: BsModalRef;
  // paginacion: Paginacion;
  // pagination = Pagination;
  // length = 100;
  // pageSize = 10;

  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;


  displayedColumns: string[] = ['id', 'username', 'email', 'puesto', 'actions'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  closeResult: string;

  constructor(private userService: UserService, private http: HttpClient,
    private alertify: SweetalertService, private modalService: BsModalService) { }

  ngOnInit() {
    this.RenderDataTable();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {

    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    console.log('que popo va aqui ' + this.pageSizeOptions);
  }

  RenderDataTable() {
    this.userService.getAllusers()
      .subscribe(
        res => {
          this.dataSource = new MatTableDataSource();
          this.dataSource.data = res;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error => {
          console.log('Se produjo un error mientras intentaba recuperar Usuarios!' + error);
        });
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  editarUser(idUser: number ) {

  }

  // perfilUser(id: number, username: string ) {
  //   Swal.fire({
  //     title: 'Perfil ' + username,
  //     showCancelButton: true,
  //     confirmButtonColor: '#348fe2',
  //     cancelButtonColor: '#f2f3f4' ,
  //     confirmButtonText: 'Guardar ',
  //     cancelButtonText: '<p class="swal-text-cancel">Cancelar</p> '
  //   }).then((result) => {
  //     if (result.value) {
  //       console.log('iduser ' + id );
  //       this.userService.deleteUser(id).subscribe( () => {
  //         this.alertify.success( username + ' Se elimino con exito');
  //         this.RenderDataTable();
  //       }, error => {
  //         console.log(error);
  //         this.alertify.error('Error usuario logeado actualmente ' + error );
  //       });
  //     }
  //   }).catch(
  //     err => {
  //       console.log(err);
  //     });
  // }

  eliminar(id: number, username: string) {
    Swal.fire({
      title: 'Eliminar!',
      text: 'Estas seguro deseas eliminar al usuario? ' + username,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#348fe2',
      confirmButtonText: 'Si, eliminar ',
      cancelButtonText: 'Cancelar '
    }).then((result) => {
      if (result.value) {
        console.log('iduser ' + id );
        this.userService.deleteUser(id).subscribe( () => {
          this.alertify.success( username + ' Se elimino con exito');
          this.RenderDataTable();
        }, error => {
          console.log(error);
          this.alertify.error('Error usuario logeado actualmente ' + error );
        });
      }
    }).catch(
      err => {
        console.log(err);
      });
  }


  getUserWithRoles(id: number ) {
    this.userService.getUserWithRoles(id).subscribe((userso: User) => {
      this.user = userso;
      this.editRolesModal(userso);
    }, error => {
      console.log(error);
    });
  }


  editRolesModal(user: User) {
    const initialState = {
      user,
      roles: this.getRolesArray(user)
    };
    this.bsModalRef = this.modalService.show(UserRolesComponent, {initialState});
    this.bsModalRef.content.updateSelectedRoles.subscribe((values) => {
      const rolesToUpdate = {
        // ... asigna el filtro a la variable
        roleNames: [...values.filter(el => el.checked === true).map(el => el.name)]
      };
      if (rolesToUpdate) {
        this.userService.updateUserRoles(user, rolesToUpdate).subscribe(() => {
          user.roles = [...rolesToUpdate.roleNames];
        }, error => {
          console.log(error);
        });
      }
    });
  }

  private getRolesArray( user ) {
    const roles = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      {name: 'Admin', value: 'Admin'},
      {name: 'User', value: 'User'},
      {name: 'Otro', value: 'Otro'},
      {name: 'VIP', value: 'VIP'},
    ];

    for (let i = 0; i < availableRoles.length; i++) {
      let isMatch = false;
      for (let j = 0; j < userRoles.length; j++) {
        if (availableRoles[i].name === userRoles[j]) {
          isMatch = true;
          availableRoles[i].checked = true;
          roles.push(availableRoles[i]);
          break;
        }
      }
      if (!isMatch) {
        availableRoles[i].checked = false;
        roles.push(availableRoles[i]);
      }
    }
    return roles;
  }
}

