import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.component.html',
  styleUrls: ['./archivo.component.css']
})
export class ArchivoComponent implements OnInit {
  @Input() item: any;
  constructor() { }

  ngOnInit() {
    console.log(this.item);
  }

}
