import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TicketService } from '../ticket.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-ticket-creado',
  templateUrl: './ticket-creado.component.html',
  styleUrls: ['./ticket-creado.component.css']
})
export class TicketCreadoComponent implements OnInit {

  displayedColumns = ['id', 'fechaAlta', 'usuario', 'titulo', 'prioridad', 'estatus', 'acciones'];
  dataSource;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  routerCreado = true;
  constructor(private _ticketService: TicketService) { }

  ngOnInit() {
    this.getTicketsCreados();
  }

  getTicketsCreados() {
    this._ticketService.getTicketsCreados().subscribe(res => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = res;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
      error => {
        console.log('Error!' + error);
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
