import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquipoService } from '../equipo.service';

@Component({
  selector: 'app-equipo-nuevo',
  templateUrl: './equipo-nuevo.component.html'
})
export class EquipoNuevoComponent implements OnInit {
  fEquipoNuevo: FormGroup;
  @Output() cancelRegistro = new EventEmitter();

  constructor(private equipoService: EquipoService, private fb: FormBuilder) { }


  ngOnInit() {
  }
crearFgEquipoNuevo() {
  this.fEquipoNuevo = this.fb.group({
nombreEquipo: ['', Validators.required],
  });
}
  Cancelar() {
    this.cancelRegistro.emit(false);
  }
  // mask="IP"

}
