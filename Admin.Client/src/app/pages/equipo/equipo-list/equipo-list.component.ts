import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EquipoService } from '../equipo.service';
import Swal from 'sweetalert2';
import { SweetalertService } from '../../../shared/_services/sweetalert.service';
import { ActivatedRoute } from '@angular/router';

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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  closeResult: string;
  constructor( private equipoService: EquipoService, private alertify: SweetalertService
    , private route: ActivatedRoute ) { }

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
