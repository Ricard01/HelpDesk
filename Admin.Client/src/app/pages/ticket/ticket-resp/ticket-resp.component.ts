import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ticket-resp',
  templateUrl: './ticket-resp.component.html',
  styleUrls: ['./ticket-resp.component.css']
})
export class TicketRespComponent implements OnInit {

  @Input() respuestas: any[];

  constructor() {

  }

  ngOnInit() {

  }

}
