import {Component, Input, OnInit} from '@angular/core';
import {Target} from "../../../../models/target";

@Component({
  selector: 'pharos-tdark-viewer',
  templateUrl: './tdark-viewer.component.html',
  styleUrls: ['./tdark-viewer.component.css']
})
export class TdarkViewerComponent implements OnInit {
@Input() target: Target;
  constructor() { }

  ngOnInit() {
  }

}
