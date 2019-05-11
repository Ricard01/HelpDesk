import { Component, OnInit, ViewChild} from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { HttpClient } from '@angular/common/http';
import Pagination from '../../../config/pagination';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { Paginacion } from '../../../config/pagination';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
users: User[] ;
paginacion: Paginacion;
pagination  = Pagination;
length = 100;
pageSize = 10;

pageSizeOptions: number[] = [5, 10, 25, 100];

// MatPaginator Output
pageEvent: PageEvent;


displayedColumns: string [] = [ 'id', 'username', 'email', 'puesto'];
dataSource: any;

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
closeResult: string;

  constructor(private userService: UserService, private http: HttpClient) { }

  ngOnInit() {
    this.RenderDataTable();
  }

//   ngAfterViewInit() {
//     this.paginator.page
//         .pipe(
//             tap(() => this.getUsers())
//         )
//         .subscribe();
// }

setPageSizeOptions(setPageSizeOptionsInput: string) {

  this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  console.log(this.pageSizeOptions);
}
  RenderDataTable() {
    this.userService.getAllusers( )
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
  pageChanged() {
    length = this.pagination.itemsxPagina;

  }

  getUsers(  ) {
    this.userService.getUsers( this.pagination.paginaActual, this.pagination.itemsxPagina).subscribe(resp => {

      this.users = resp.result;
      this.paginacion = resp.paginacion;

    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
}




}
