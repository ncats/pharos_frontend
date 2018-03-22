import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'pharos-data-list-visualizations',
  templateUrl: './data-list-visualizations.component.html',
  styleUrls: ['./data-list-visualizations.component.css'],
})
export class DataListVisualizationsComponent implements OnInit {
data: any;
datum: any;
selected: string;
facets: string[] = ['data1', 'data2', 'data3'];
  constructor() { }

  ngOnInit() {
    this.datum = {
      data1: [{label: "ovarian cancer", count: 84920},
        {label: "osteosarcoma", count: 7933},
        {label: "psoriasis", count: 6685},
        {label: "medulloblastoma, large-cell", count: 62340},
        {label: "glioblastoma", count: 5572},
        {label: "lung cancer", count: 44730},
        {label: "atypical teratoid / rhabdoid tumor", count: 43690},
        {label: "intraductal papillary-mucinous neoplasm (IPMN)", count: 3289},
        {label: "malignant mesothelioma", count: 3163},
        {label: "Breast cancer", count: 30990}],
      data2: [{label: "ovarian cancer", count: 8492},
        {label: "osteosarcoma", count: 79330},
        {label: "psoriasis", count: 66850},
        {label: "medulloblastoma, large-cell", count: 62340},
        {label: "glioblastoma", count: 5572},
        {label: "lung cancer", count: 4473},
        {label: "atypical teratoid / rhabdoid tumor", count: 4369},
        {label: "intraductal papillary-mucinous neoplasm (IPMN)", count: 3289},
        {label: "malignant mesothelioma", count: 3163},
        {label: "Breast cancer", count: 3099}],
      data3: [{label: "ovarian cancer", count: 8492},
        {label: "osteosarcoma", count: 79330},
        {label: "psoriasis", count: 66850},
        {label: "medulloblastoma, large-cell", count: 62340},
        {label: "glioblastoma", count: 55720},
        {label: "lung cancer", count: 4473},
        {label: "atypical teratoid / rhabdoid tumor", count: 4369},
        {label: "intraductal papillary-mucinous neoplasm (IPMN)", count: 3289},
        {label: "malignant mesothelioma", count: 31630},
        {label: "Breast cancer", count: 30990}]
    }
    this.selected = "data1";
    this.data = this.datum.data1;
  }
  changeData(data: string){
    this.selected = data;
    console.log(data);
    this.data = this.datum[data];
    console.log(this.data);
  }

  isSelected(field: string): boolean{
    return field === this.selected;
  }
}
