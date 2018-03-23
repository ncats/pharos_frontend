import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'pharos-visualization-options',
  templateUrl: './visualization-options.component.html',
  styleUrls: ['./visualization-options.component.css']
})
export class VisualizationOptionsComponent implements OnInit {
  @Input() facets: any[];
  data: any;
  datum: any;
  selected: string;

  constructor() { }

  ngOnInit() {
    console.log(this);
    this.selected = this.facets[0].name;
  }

  changeData(data: string){
    this.selected = data;
    console.log(data);
    this.data = this.datum[data];
    console.log(this.data);
  }

  isSelected(field: string): boolean {
    return field === this.selected;
  }


}
