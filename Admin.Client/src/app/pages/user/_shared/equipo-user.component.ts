import { Component, OnInit, Input } from '@angular/core';
import { EquipoService } from '../../equipo/equipo.service';
import { Equipo } from '../../equipo/equipo.model';

@Component({
  selector: 'app-equipo-user',
  templateUrl: './equipo-user.component.html',
  styles: []
})
export class EquipoUserComponent implements OnInit {
  @Input() UserId: number;
  equipo: Equipo;

  constructor(private _equipoService: EquipoService) { }

  ngOnInit() {

    this._equipoService.getEquipoDefault(this.UserId).subscribe(res => {
      this.equipo = res;
    });
  }

}
