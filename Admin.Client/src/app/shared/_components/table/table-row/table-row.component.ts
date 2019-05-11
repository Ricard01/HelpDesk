import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styles: []
})
export class TableRowComponent implements OnInit {
  // pageSettings = pageSettings;
  // paginacion: Paginacion;
  // columnas: string [] = ['Id', 'Username', 'Email', 'Puesto'];
  // private _search$ = new Subject<void>();
  // pagination  = Pagination;

  constructor() { }

  @Input() columnas: string[];
  @Input() filas: any;


  ngOnInit() {
    // this.getUsers();
  // this.route.data.subscribe(
  //   data => {
  //     this.paginacion = data['users'].paginacion;
  //     console.log(this.paginacion);
  //     this.users = data['users'].result;
  //     console.log(data);
  //   }
  // );
  }

  // ngOnDestroy() {
  //   this.pageSettings.pageContentFullWidth = false;
  // }

  // cambiaPagina( event: any): void {
  //   this.paginacion.paginaActual = event;
  //   this.loadUsers();
  // }

  // getUsers(  ) {
  //   this.userService.getUsers( this.pagination.paginaActual, this.pagination.itemsxPagina).subscribe(resp => {

  //     this.users = resp.result;
  //     console.log(this.users);
  //     this.paginacion = resp.paginacion;

  //   });
  // }

  // loadUsers(  ) {
  //   this.userService.getUsers( this.paginacion.paginaActual, this.paginacion.itemsxPagina).subscribe(resp => {

  //     this.paginacion = resp.paginacion;
  //     this.users = resp.result;
  //   });
  // }

}
