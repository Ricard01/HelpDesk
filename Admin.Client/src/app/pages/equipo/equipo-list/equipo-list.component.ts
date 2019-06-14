import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserService } from '../../user/user.service';
import { EquipoService } from '../equipo.service';

@Component({
  selector: 'app-equipo-list',
  templateUrl: './equipo-list.component.html',
  styles: []
})
export class EquipoListComponent implements OnInit {
  pageSizeOptions: number[] = [5, 10, 25, 100];

  pageEvent: PageEvent;


  displayedColumns: string[] = ['id', 'nombreequipo', 'ip', 'activo', 'actions'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  closeResult: string;
  constructor( private equipoService: EquipoService, ) { }

  ngOnInit() {
  }


  RenderDataTable() {
    this.equipoService.getAllEquipos()
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


}
