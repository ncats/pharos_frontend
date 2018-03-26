import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'pharos-toi-card',
  templateUrl: './toi-card.component.html',
  styleUrls: ['./toi-card.component.css']
})
export class ToiCardComponent implements OnInit {
  @Input() toi: any;
  constructor() { }

  ngOnInit() {
  }

}
