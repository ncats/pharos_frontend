import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'pharos-topic-graph-filters',
  templateUrl: './topic-graph-filters.component.html',
  styleUrls: ['./topic-graph-filters.component.scss']
})
export class TopicGraphFiltersComponent implements OnInit {
  selection = new SelectionModel<any>(true, ['tclin','tchem','tbio','tdark','disease','ligand']);
  @Output() filterSelectionChange: EventEmitter<SelectionModel<any>> = new EventEmitter<SelectionModel<any>>();

  constructor() { }

  ngOnInit() {
    this.selection.changed.subscribe(change => {
      console.log(this.selection);
      this.filterSelectionChange.emit(this.selection);
    });

  }

  setFilterType(event, field) {
    console.log(event);
    console.log(field);
  }

}
