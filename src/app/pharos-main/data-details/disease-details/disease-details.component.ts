import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'pharos-disease-details',
  templateUrl: './disease-details.component.html',
  styleUrls: ['./disease-details.component.css']
})
export class DiseaseDetailsComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

  setData(data: any): void {
    this.data = data;
  //  this.dataSource.next(data);
  }
}
