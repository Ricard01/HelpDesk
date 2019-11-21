import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../user/user.model';
import { ActivatedRoute } from '@angular/router';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { AuthService } from 'src/app/core/_services/auth.service';
import { environment } from 'src/environments/environment';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ticket } from '../ticket.model';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-nuevo',
  templateUrl: './ticket-nuevo.component.html',
  styleUrls: ['./ticket-nuevo.component.css']
})


export class TicketNuevoComponent implements OnInit {
  // ticketId: number;
  @Input() adjuntos: any[];
  @Input() ticketId: number;
  baseUrl = environment.apiUrl + 'tickets/adjuntar/';
  fecha = new Date();
  user: User;
  ticket: Ticket;
  usersForTicket: [];
  selectedItems = [];
  dropdownSettings = {};
  uploader: FileUploader;
  formTicketNuevo: FormGroup;


  constructor(private _route: ActivatedRoute, private _authService: AuthService,
    private fb: FormBuilder, private _alertify: SweetalertService, private _ticketService: TicketService) {

    this._route.data.subscribe(data => {
      this.usersForTicket = data['users'];
    });

  }

  ngOnInit() {
    this.initializeUploader();
    this.createFormTicketNuevo();

    this.dropdownSettings = {
      singleSelection: false,
      text: 'Seleccionar Usuario(s)',
      enableCheckAll: false,
      enableSearchFilter: true,
      badgeShowLimit: 3,
      searchPlaceholderText: 'Buscar',
      searchAutofocus: true,
      lazyLoading: true,
    };

  }


  initializeUploader() {
    this.uploader = new FileUploader({
      // url: this.baseUrl,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image', 'pdf', 'doc', 'xls', 'compress'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024 // 10mb max

    });

    // this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
    //   if (this.ticket) { form.append('data', JSON.stringify(this.ticket)); }
    // };

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onWhenAddingFileFailed = (item, filter, options) => this.onWhenAddingFileFailed(item, filter, options);
    this.uploader.onCompleteAll = () => this.onCompleteAll();
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      // this._alertify.success('Ticket ' + this.ticketId + ' se creo con exito');
      if (response) {
        const res: any = JSON.parse(response);
        const adjunto = {
          id: res.id,
          url: res.url,

        };
        this.adjuntos.push(adjunto);
      }
    };
  }


  createFormTicketNuevo() {
    this.formTicketNuevo = this.fb.group({
      titulo: [null, [Validators.required, Validators.maxLength(60)]],
      mensaje: [null, Validators.required],
      prioridad: ['1', Validators.required],
      ticketsasignados: [null, Validators.required]
    });
  }

  onWhenAddingFileFailed(item: FileLikeObject, filter: any, options: any) {
    switch (filter.name) {
      case 'fileSize':
        this._alertify.error(`El archivo "${item.name}" excede el tamaño maximo de archivo de 10Mb`);
        break;
      case 'fileType':
        // const allowedTypes = this.allowedMimeType.join();
        this._alertify.error(`El archivo "${item.name}" no esta permitdo. Extensiones permitidas (jpg, doc, xls, rar, zip)`);
        break;
      default:
        this._alertify.error(` Orurrio un error con el archivo ${item.name} validar la extension y tamaño. )`);
    }
  }

  onItemSelect(item: any) {
    console.log(item.username);
  }
  onCompleteAll() {
    this._alertify.success('Ticket ' + this.ticketId + ' se creo con exito');
  }
  createTicket() {
    if (this.formTicketNuevo.valid) {
      this.ticket = Object.assign({}, this.formTicketNuevo.value);
      this.ticket.userId = this._authService.decodedToken.nameid;
      this._ticketService.createTicket(this.ticket).subscribe((res: any) => {
        this.ticketId = res;  // <-- Aqui establezco el ticketId
        if (this.uploader.queue.length > 0) {
          this.uploader.setOptions({ url: this.baseUrl + this.ticketId });
          this.uploader.uploadAll();
        } else {
          this._alertify.success('Ticket ' + this.ticketId + ' Creado con exito');
        }
        this.formTicketNuevo.reset();
      }, error => {
        console.log('Error ' + error);
        this._alertify.error(error);
      });
    }
  }



}
