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
  dataSource;
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
