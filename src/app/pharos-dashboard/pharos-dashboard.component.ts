import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pharos-pharos-dashboard',
  templateUrl: './pharos-dashboard.component.html',
  styleUrls: ['./pharos-dashboard.component.css']
})
export class PharosDashboardComponent implements OnInit {
  topics: any;

  constructor() {
  }

  ngOnInit() {
    this.topics = [
      {
        name: 'Bromodomain Inhibitors',
        class: 'target',
        diseaseCt: 45,
        ligandCt: 43,
        targetCt: 0,
        publicationCt: 25
      }, {
        name: 'Lysomal Storage Disorder',
        class: 'disease',
        diseaseCt: 0,
        ligandCt: 45,
        targetCt: 45,
        publicationCt: 45
      }, {
        name: 'Cystic Fibrosis',
        class: 'disease',
        diseaseCt: 0,
        ligandCt: 4,
        targetCt: 5,
        publicationCt: 12
      }
    ];


  }
}
