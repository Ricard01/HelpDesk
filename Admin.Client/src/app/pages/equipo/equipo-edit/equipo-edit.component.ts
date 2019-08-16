import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EquipoService } from '../equipo.service';
import { Equipo } from '../equipo.model';
import { SweetalertService } from '../../../shared/_services/sweetalert.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-equipo-edit',
  templateUrl: './equipo-edit.component.html',
  styles: []
})

export class EquipoEditComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private equipoService: EquipoService,
    private sweetAlert: SweetalertService,
    private location: Location) { }

  equipoEditForm: FormGroup;
  equipo: Equipo;
  @Input() idUsuario: number;
  @Input() ViewMode: Boolean;
  showActualizar = true;
  ngOnInit() {

    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getEquipo(id);
    });

    this.createEquipoEditForm();
  }

  getEquipo(id: number) {


    this.equipoService.getEquipo(id)
      .subscribe(equipo => {
        this.equipo = equipo;
        this.equipoEditForm.patchValue(this.equipo);

        if (this.ViewMode) {
          this.showActualizar = false;
          this.equipoEditForm.disable({ onlySelf: true });
        }
      });
  }

  createEquipoEditForm() {
    this.equipoEditForm = this.fb.group({
      // primer elemento valor default, segundo validadores
      nombreEquipo: [''],
      ip: [],
      caracteristicas: [],
      activo: []
    });
  }

  equipoUpdate(id: number) {
    if (this.equipoEditForm.valid) {
      this.equipo = Object.assign({}, this.equipoEditForm.value);
      this.equipoService.updateEquipo(id, this.equipo).subscribe(() => {
        this.sweetAlert.success(this.equipo.nombreEquipo + ' Actualizado correctamente');
      }, error => {
        console.log('Error ' + error);
        this.sweetAlert.error(error);
      });
    }
  }

  cancelEquipo() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
