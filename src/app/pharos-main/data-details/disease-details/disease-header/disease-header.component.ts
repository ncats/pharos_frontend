import {Component, Input, OnInit} from '@angular/core';
import {Disease} from "../../../../models/disease";

@Component({
  selector: 'pharos-disease-header',
  templateUrl: './disease-header.component.html',
  styleUrls: ['./disease-header.component.css']
})
export class DiseaseHeaderComponent implements OnInit {
  @Input() disease: Disease;

  constructor() { }

  ngOnInit() {
  }

}
