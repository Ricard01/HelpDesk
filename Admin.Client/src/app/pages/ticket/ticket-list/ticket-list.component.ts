import { Component, OnInit } from '@angular/core';
import { Ticket } from '../ticket.model';
import { TicketService } from '../ticket.service';
import { ActivatedRoute } from '@angular/router';
import { Paginacion, PaginacionRes } from 'src/app/config/pagination';
import { PageChangedEvent } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Filtros } from 'src/app/config/filtros';
import { DatePipe } from '@angular/common';
import { ErrorStateMatcher } from '@angular/material/core';
// import { MatPaginator, PageEvent } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';

export class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})


export class TicketListComponent implements OnInit {

  // displayedColumns = ['id', 'fechaAlta', 'usuario', 'titulo', 'prioridad', 'status', 'acciones'];
  // dataSource;
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // @ViewChild(MatSort, {static: true}) sort: MatSort;
  // length = 100;
  // pageSize = 10;
  // pageSizeOptions: number[] = [5, 10, 25, 100];
  // MatPaginator Output
  // pageEvent: PageEvent;

  pipe = new DatePipe('es-MX');
  model: Date;
  filtroForm: FormGroup;
  ticket: Ticket;
  tickets: Ticket[];
  paginacion: Paginacion;
  estatusList = [{ value: 0, display: 'Todos' }, { value: 1, display: 'Abierto' }, { value: 2, display: 'En Proceso' }
    , { value: 3, display: 'Cerrado' }, { value: 4, display: 'Re Abrir' }];
  filtros: Filtros;
  matcher = new CrossFieldErrorMatcher();

  constructor(private route: ActivatedRoute, private ticketService: TicketService,
    public fb: FormBuilder) {

  }

  ngOnInit() {
    this.createForm();
    this.route.data.subscribe(data => {
      // this.dataSource = new MatTableDataSource(data['tickets'].result);
      // this.dataSource.sort = this.sort;
      this.tickets = data['tickets'].result;
      this.paginacion = data['tickets'].paginacion;
    });
  }



  createForm() {
    this.filtroForm = this.fb.group({
      fechaIni: [null, Validators.required],
      fechaFin: [null, [Validators.required]],
      estatus: ['0']
    }, { validators: this.validadorFecha });
  }

  validadorFecha(form: FormGroup) {
    const condicion = form.get('fechaIni').value > form.get('fechaFin').value;
    return condicion ? { fechaIncorrecta: true } : null;
  }
  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  // }

  pageChanged(event: PageChangedEvent): void {
    this.paginacion.paginaActual = event.page;
    this.getTickets();
  }

  borrarFiltros(formDirective: FormGroupDirective) {
    this.filtroForm.reset();
    formDirective.resetForm();
    this.ticketService.getTickets(this.paginacion.paginaActual, this.paginacion.itemsxPagina)
      .subscribe((resp: PaginacionRes<Ticket[]>) => {
        this.tickets = resp.result;
        this.paginacion = resp.paginacion;
      });
  }

  getTickets() {
    if (this.filtroForm.get('fechaIni').value && this.filtroForm.get('fechaFin').value) {
      this.filtros = Object.assign({}, this.filtroForm.value);
      this.filtros.fechaIni = this.pipe.transform(this.filtros.fechaIni, 'MM/dd/yyyy');
      this.filtros.fechaFin = this.pipe.transform(this.filtros.fechaFin, 'MM/dd/yyyy');
    }

    this.ticketService.getTickets(this.paginacion.paginaActual, this.paginacion.itemsxPagina, this.filtros)
      .subscribe((resp: PaginacionRes<Ticket[]>) => {
        this.tickets = resp.result;
        this.paginacion = resp.paginacion;
      });
  }
}

