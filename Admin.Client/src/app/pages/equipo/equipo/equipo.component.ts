import { Component, OnInit, Input } from '@angular/core';
import { EquipoService } from '../equipo.service';
import { Equipo } from '../equipo.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SweetalertService } from '../../../shared/_services/sweetalert.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {

  @Input() idUsuario: number;

  equipo: Equipo;
  equipoForm: FormGroup;
  equipos: Equipo[] = [];
  selectedEquipo: Equipo;


  constructor(public fb: FormBuilder, private equipoService: EquipoService, private alertify: SweetalertService) { }

  ngOnInit() {
    this.createSelectEquipo();
  }


  createSelectEquipo() {
    this.equipoForm = this.fb.group({
      id: (null),
      nombreEquipo: [''],
      ip: ['']
    });
    this.getEquiposDisponibles();
    this.getDefault(this.idUsuario);

  }


  updateEquipo() {


    if (this.equipoForm.valid) {
      this.equipo = Object.assign({}, this.equipoForm.value);
      this.equipo.userId = this.idUsuario;
      console.log('thisE' + this.equipo);
      // this.equipo.idUser = this.idUsuario;
      this.equipoService.updateEquipo(this.equipo).subscribe(() => {
        this.alertify.success(' Actualizado con exito');

      }, error => {
        console.log('Error ' + error);
        this.alertify.error(error);
      });
    } else {
      this.selectedEquipo.userId = 0;
      this.equipoService.updateEquipo(this.selectedEquipo).subscribe(() => {
        this.alertify.success(' Actualizado con exito');

      }, error => {
        console.log('Error ' + error);
        this.alertify.error(error);
      });
    }
  }

  getDefault(iduser: number) {
    this.equipoService.getEquipoDefault(iduser).subscribe(
      res => {
        if (res != null) {
          this.selectedEquipo = res;

          this.equipoForm.patchValue({
            id: this.selectedEquipo.id

          });
        }
        // console.log('EquipoDefault:' + this.equipoDefault);
      });
  }

  getEquipos() {
    this.equipoService.getAllEquipos().subscribe(
      res => {
        this.equipos = res;
      },
      error => {
        console.log(error);
      });
  }

  getEquiposDisponibles() {
    this.equipoService.getEquiposDisponibles(this.idUsuario).subscribe(
      res => {
        this.equipos = res;
      }
    );
  }



  // updateEquipo(equipo: Equipo) {
  //   equipo.idUser = this.idUsuario;
  //   console.log('id' + this.idUsuario);
  //   this.equipoService.updateEquipo(equipo).subscribe(res => {
  //     this.alertify.success(' Actualizado con exito');

  //   }, error => {
  //     console.log('Error ' + error);
  //     this.alertify.error(error);
  //   });

  // }


}

