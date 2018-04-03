import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'pharos-target-details',
  templateUrl: './target-details.component.html',
  styleUrls: ['./target-details.component.css']
})
export class TargetDetailsComponent implements OnInit {
  @Input() data;
  constructor() { }

  ngOnInit() {
  }

}
