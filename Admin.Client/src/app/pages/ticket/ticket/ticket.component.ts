import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../user/user.model';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/_services/auth.service';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';
import { TicketService } from '../ticket.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TicketRespuesta } from '../ticket-resp/ticket-resp.model';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  baseUrl = environment.apiUrl + 'tickets/AdjuntosRespuesta/';

  request: string;
  ticketId: number;
  ticket: any;
  user: User;
  fecha = new Date();
  respuesta: TicketRespuesta;

  mostrarUserAsignado: boolean;
  mostrarReabrir: boolean;
  mostrarResponder: boolean;

  @Input() adjuntos: any[];
  selectedItems = [];
  uploader: FileUploader;

  formRespuesta: FormGroup;
  newRespuestaId: number;


  constructor(private _route: ActivatedRoute, private _authService: AuthService,
    private _alertify: SweetalertService, private _ticketService: TicketService,
    private fb: FormBuilder) {

    this._route.data.subscribe(data => {
      this.request = data.tipo;
    });

    this._route.params.subscribe(params => {
      this.ticketId = params['id'];
    });

  }

  ngOnInit() {
    this.user = this._authService.user;
    this.cargarTicket();
  }

  cargarTicket() {

    if (this.request === 'creados') {

      this._ticketService.getTicketCreadoById(this.ticketId).subscribe((resp: any) => {

        this.ticket = resp;

        // Ticket Abierto debe mostrarResponder=True y mostrarReabrir=False
        this.mostrarUserAsignado = true;

        if (this.ticket.estatus !== 4) {
          this.mostrarResponder = true;
          this.inicializarRespuesta();
        } else {
          // Ticket Cerrado debe mostrarresponder=False y mostrarReabrir=True
          if (this.user.id === this.ticket.userId) {
            console.log(this.user.id + ' user.id');
            console.log(this.ticket.userId + ' ticket.userId');
            this.mostrarReabrir = true;
          }
        }

      });

    } else {

      this._ticketService.getTicketAsignadoById(this.ticketId).subscribe(
        (resp: any) => {

          this.ticket = resp;

          if (this.ticket.estatus !== 4) {
            this.mostrarResponder = true;
            this.inicializarRespuesta();
            // } else {
            //   console.log(+'ticketASignado' + this.user.id + ' user.id');
            //   console.log(this.ticket.userId + ' ticket.userId');

            //   if (this.user.id === this.ticket.userId) {
            //     console.log(this.user.id + ' user.id');
            //     console.log(this.ticket.userId + ' ticket.userId');
            //     this.mostrarReabrir = true;
            //   }
          }

        });

    }

  }


  inicializarRespuesta() {

    this.crearFormRespuesta();
    this.initializeUploader();

  }

  reabrirTicket() {
    this.mostrarResponder = true;
    this.inicializarRespuesta();
    // this.formRespuesta.controls['estatus'].setValue('ReAbrir', {onlySelf: true});
    this.formRespuesta.controls.estatus.setValue('2', { onlySelf: true });
    this.formRespuesta.controls.estatus.disable();
  }

  crearFormRespuesta() {
    this.formRespuesta = this.fb.group({
      respuesta: ['', Validators.required],
      estatus: ['', Validators.required]
    });
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
    console.log(this.selectedItems);
  }

  onCompleteAll() {
    this._alertify.success('Respuesta Enviada');
    this.getUltimaRespuestaInsertada(this.newRespuestaId);
  }
  guardarRespuesta() {
    if (this.formRespuesta.valid) {

      this.respuesta = Object.assign({}, this.formRespuesta.value);
      this.respuesta.fecha = this.fecha;
      this.respuesta.userId = this._authService.user.id;
      this.respuesta.ticketId = this.ticket.id;
      this._ticketService.createTicketRespuesta(this.respuesta).subscribe((res: any) => {

        // const respuestaId = res;
        this.newRespuestaId = res;
        if (this.uploader.queue.length > 0) {

          this.uploader.setOptions({ url: this.baseUrl + this.newRespuestaId });
          this.uploader.uploadAll();
          // this.getUltimaRespuestaInsertada(respuestaId);
          // this.ticket.ticketRespuestas.push(this.respuesta);

        } else {

          this._alertify.success('Respuesta enviada');
          this.getUltimaRespuestaInsertada(this.newRespuestaId);
          // this.ticket.ticketRespuestas.push(this.respuesta);

        }
        // console.log('fuera de if estatus');
        // console.log(this.respuesta);
        // if (this.respuesta.estatus === 4) {
        //   console.log('estatus');
        //   console.log(this.respuesta.estatus);
        //   this.mostrarResponder = false;
        //   this.mostrarReabrir = true;
        // }
        this.formRespuesta.reset();
      }, error => {
        console.log('Error ' + error);
        this._alertify.error(error);
      });


    }

  }

  getUltimaRespuestaInsertada(respuestaId: number) {
    this._ticketService.getUltimaRespuestaInsertada(respuestaId).subscribe((resp: any) => {
      const ultrespuesta = resp;
      this.ticket.ticketRespuestas.push(ultrespuesta);
      if (ultrespuesta.estatus === 4) {
        this.mostrarResponder = false;
      }
    });


  }


}
