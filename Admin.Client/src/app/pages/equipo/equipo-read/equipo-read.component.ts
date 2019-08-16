import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-equipo-read',
  templateUrl: './equipo-read.component.html',
  styles: []
})
export class EquipoReadComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  userId: number;
  viewMode = true;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });

  }

}
