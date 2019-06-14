import { Component, OnInit, Input } from '@angular/core';
import { EquipoService } from '../equipo.service';
import { Equipo } from '../equipo.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styles: []
})
export class EquipoComponent implements OnInit {

  @Input() idUser: number;

  constructor(public fb: FormBuilder, private equipoService: EquipoService) { }
  equipos: Equipo[] = [];

  fEquipo = new FormGroup({
    equipo: new FormControl()
  });
  selectedEquipo: string;

  ngOnInit() {
    this.getEquipos();
  }


  getEquipos() {
    this.equipoService.getAllEquipos().subscribe(
      res => {
        this.equipos = res;
        console.log(this.equipos);
      },
      error => {
        console.log(error);
      });
  }

  updateEquipo(idUser: number, equipo: Equipo) {
    equipo.idUser = idUser;
    this.equipoService.updateEquipo(equipo).subscribe(res => {

    }, error => {
      console.log(error);
    });
    console.log('equipo' + equipo);
    console.log('id' + idUser);
  }


}

