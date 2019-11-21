import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquipoService } from '../equipo.service';
import { Equipo } from '../equipo.model';
import { nombreEquipoValidator } from '../../../shared/helpers/unique_nombreEquipo-validator';
import { SweetalertService } from '../../../shared/services/sweetalert.service';

@Component({
  selector: 'app-equipo-nuevo',
  templateUrl: './equipo-nuevo.component.html'
})
export class EquipoNuevoComponent implements OnInit {

  fEquipoNuevo: FormGroup;
  equipo: Equipo;
  @ViewChild('nombreEquipo', {static: true}) nombreEquipoRef: ElementRef;
  @Output() cancelRegistro = new EventEmitter();

  constructor(private equipoService: EquipoService, private fb: FormBuilder, private alertify: SweetalertService) { }


  ngOnInit() {
    this.crearFormEquipoNuevo();
  }

  crearFormEquipoNuevo() {
    this.fEquipoNuevo = this.fb.group({
      nombreEquipo: [null, Validators.required, nombreEquipoValidator(this.equipoService)],
      ip: [''],
      caracteristicas: ['']
    });
  }

  Cancelar() {
    this.cancelRegistro.emit(false);
  }
  // mask="IP"


  crearEquipo() {
    if (this.fEquipoNuevo.valid) {
      this.equipo = Object.assign({}, this.fEquipoNuevo.value);
      this.equipoService.createEquipo(this.equipo).subscribe(() => {
        this.alertify.success(this.equipo.nombreEquipo + ' Registrado con exito');
        this.nombreEquipoRef.nativeElement.focus();
        this.fEquipoNuevo.reset();

      }, error => {
        console.log('Error ' + error);
        this.alertify.error(error);
      });
    }
  }

  uniqueNombreEquipo(): boolean  {
    return this.fEquipoNuevo.get('nombreEquipo').hasError('equipoExist');
  }

}
