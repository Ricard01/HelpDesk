import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EquipoService } from '../equipo.service';
import Swal from 'sweetalert2';
import { SweetalertService } from '../../../shared/_services/sweetalert.service';

@Component({
  selector: 'app-equipo-list',
  templateUrl: './equipo-list.component.html',
  styles: []
})
export class EquipoListComponent implements OnInit {
  pageSizeOptions: number[] = [5, 10, 25, 100];

  pageEvent: PageEvent;

  displayedColumns: string[] = ['id', 'nombreEquipo', 'ip', 'activo', 'actions'];
  dataSource: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  closeResult: string;
  constructor( private equipoService: EquipoService, private alertify: SweetalertService ) { }

  ngOnInit() {
    this.RenderDataTable();
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

  eliminar( id: number, nombreEquipo: string ) {
    Swal.fire({
      title: 'Eliminar!',
      text: 'Estas seguro deseas eliminar el equipo? ' + nombreEquipo,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#348fe2',
      confirmButtonText: 'Si, eliminar ',
      cancelButtonText: 'Cancelar '
    }).then((result) => {
      if (result.value) {
        console.log('iduser ' + id );
        this.equipoService.deleteEquipo(id).subscribe( () => {
          this.alertify.success( nombreEquipo + ' Se elimino con exito');
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



}
