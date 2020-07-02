import {Component, Input, OnInit} from '@angular/core';
import {VirusDetails} from "../../../../../../models/virus-interactions";

@Component({
  selector: 'pharos-virus-details',
  templateUrl: './virus-details.component.html',
  styleUrls: ['./virus-details.component.scss']
})
export class VirusDetailsComponent implements OnInit {

  @Input() virus: VirusDetails;
  collapsed: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  virusDetailsString(){
    return `(${this.virus.interactionDetails.length} interacting proteins)`;
  }
}
