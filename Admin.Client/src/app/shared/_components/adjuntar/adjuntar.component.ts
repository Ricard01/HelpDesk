import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-adjuntar',
  templateUrl: './adjuntar.component.html',
  styleUrls: ['./adjuntar.component.css']
})
export class AdjuntarComponent implements OnInit {

  constructor() { }
  // TODO Input trae informacion del componente padre.
  @Input() archivos: any[];
  ngOnInit() {
  }

}
