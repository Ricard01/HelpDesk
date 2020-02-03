import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TicketService } from '../ticket.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tickets-my',
  templateUrl: './ticket-asignado.component.html',
  styleUrls: ['./ticket-asignado.component.css']
})
export class TicketAsignadoComponent implements OnInit {

  displayedColumns = ['id', 'fechaAlta', 'usuario', 'titulo', 'prioridad', 'estatus', 'acciones'];
  // dataSource;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  // MatPaginator: Output;
  pageEvent: PageEvent;
  constructor(private _ticketService: TicketService) { }

  ngOnInit() {
    this.getTicketsAsignados();
  }

  getTicketsAsignados() {
    this._ticketService.getTicketsAsignados().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
     this.dataSource.data = res;
     console.log(res);
     console.log('2');
     console.log(this.dataSource.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
      error => {
        console.log('Se produjo un error mientras intentaba recuperar Usuarios!' + error);
      });

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
