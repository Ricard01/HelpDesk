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


export class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],

})


export class TicketListComponent implements OnInit {



  private _searchTerm: string;
  filtroTickets: Ticket[];

  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    // this.tickets = this.filtroT( value );
  }
  activo = false;
  isDesc = false;
  column: 'id';
  pipe = new DatePipe('es-MX');
  model: Date;
  filtroForm: FormGroup;
  ticket: Ticket;
  tickets: Ticket[];
  paginacion: Paginacion;
  orderSelect = 'id';
  orderList = [{ value: 'id', display: '# Ticket' }, { value: 'Fecha', display: 'Fecha' }, { value: 'Usuario', display: 'Usuario' },
  { value: 'Prioridad', display: 'Prioridad' }, { value: 'Estatus', display: 'Estatus' }];
  estatusList = [{ value: 0, display: 'Todos' }, { value: 1, display: 'Abierto' }, { value: 2, display: 'En Proceso' }
    , { value: 3, display: 'Cerrado' }, { value: 4, display: 'Re Abrir' }];
  filtros = {} as Filtros;
  filtrosT: Filtros = {};
  userParams: any = {};
  matcher = new CrossFieldErrorMatcher();
  sortIcon: string;


  constructor(private route: ActivatedRoute, private ticketService: TicketService,
    public fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
    console.log('ngOnInit: ' + this.isDesc);
    this.route.data.subscribe(data => {
      // this.dataSource = new MatTableDataSource(data['tickets'].result);
      // this.dataSource.sort = this.sort;
      this.tickets = data['tickets'].result;
      this.filtroTickets = this.tickets;
      this.paginacion = data['tickets'].paginacion;
    });
    this.filtrosT.fechaIni = '01/01/2019';
    this.filtrosT.fechaFin = this.pipe.transform(Date.now(), 'MM/dd/yyyy');
    this.filtrosT.estatus = '0';
    this.filtrosT.orderBy = 'id';
  }

  filtroT(searchString: string) {
    return this.filtroTickets.filter(ticket =>
      ticket.id.toString().toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }
  onClick(event, isDesc, link: any) {
console.log('onClick: ' + isDesc);
    this.sortIcons(link, isDesc);
    if (!isDesc) {
      this.getTickets(event.target.id);
    } else {
      this.getTickets(event.target.id.toLowerCase());
    }

  }

  sortIcons(link: any, isDesc: boolean) {
    const selectores: any = document.getElementsByClassName('selector');
    for (const ref of selectores) {
      ref.classList.remove('fas', 'fa-sort-down');
      ref.classList.remove('fas', 'fa-sort-up');

    }
    if (isDesc) {
      link.classList.add('fas', 'fa-sort-down');
    } else {
      link.classList.add('fas', 'fa-sort-up');
    }


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


  pageChanged(event: PageChangedEvent): void {
    this.paginacion.paginaActual = event.page;
    this.getTickets();
  }

  borrarFiltros(formDirective: FormGroupDirective) {
    this.filtrosT.fechaIni = '01/01/2019';
    this.filtrosT.fechaFin = this.pipe.transform(Date.now(), 'MM/dd/yyyy');
    this.filtrosT.estatus = '0';
    this.filtrosT.orderBy = 'id';
    this.filtroForm.reset();
    formDirective.resetForm();
    this.ticketService.getTickets(this.paginacion.paginaActual, this.paginacion.itemsxPagina)
      .subscribe((resp: PaginacionRes<Ticket[]>) => {
        this.tickets = resp.result;
        this.paginacion = resp.paginacion;
      });
  }


  getTickets(orderValue?: string) {
    if (this.filtroForm.get('fechaIni').value && this.filtroForm.get('fechaFin').value) {
      this.filtrosT = Object.assign({}, this.filtroForm.value);
      this.filtrosT.fechaIni = this.pipe.transform(this.filtrosT.fechaIni, 'MM/dd/yyyy');
      this.filtrosT.fechaFin = this.pipe.transform(this.filtrosT.fechaFin, 'MM/dd/yyyy');
    }

    if (orderValue != null) {
      this.filtrosT.orderBy = orderValue;
      console.log(this.filtrosT.orderBy);
    }

    this.ticketService.getTickets(this.paginacion.paginaActual, this.paginacion.itemsxPagina, this.filtrosT)
      .subscribe((resp: PaginacionRes<Ticket[]>) => {
        this.tickets = resp.result;
        this.paginacion = resp.paginacion;
      });
  }

  // getTickets(orderValue?: string) {
  //   if (this.filtroForm.get('fechaIni').value && this.filtroForm.get('fechaFin').value) {
  //     this.filtros = Object.assign({}, this.filtroForm.value);
  //     this.filtros.fechaIni = this.pipe.transform(this.filtros.fechaIni, 'MM/dd/yyyy');
  //     this.filtros.fechaFin = this.pipe.transform(this.filtros.fechaFin, 'MM/dd/yyyy');
  //   }

  //   if (orderValue != null) {
  //     this.filtros.orderby = orderValue;
  //     console.log(this.filtros.orderby);
  //   }

  //   this.ticketService.getTickets(this.paginacion.paginaActual, this.paginacion.itemsxPagina, this.filtros)
  //     .subscribe((resp: PaginacionRes<Ticket[]>) => {
  //       this.tickets = resp.result;
  //       this.paginacion = resp.paginacion;
  //     });
  // }

  onOrderBySelected(val: string) {
    this.filtrosT.orderBy = val;

  }


}

