import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pharos-visualization-options',
  templateUrl: './visualization-options.component.html',
  styleUrls: ['./visualization-options.component.css']
})
export class VisualizationOptionsComponent implements OnInit {
  @Input() facets: any[];
  @Output() readonly fieldChange: EventEmitter<string> = new EventEmitter<string>();

  data: any;
  selected: string;

  constructor() { }

  ngOnInit() {
    console.log(this);
    this.changeData(this.facets[0].name);
  }

  changeData(data: string){
    console.log(data);
    this.selected = data;
    this.fieldChange.emit(data);
  }

  isSelected(field: string): boolean {
    return field === this.selected;
  }


}
