import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SelectionChange, SelectionModel} from '@angular/cdk/collections';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'pharos-topic-graph-filters',
  templateUrl: './topic-graph-filters.component.html',
  styleUrls: ['./topic-graph-filters.component.scss']
})
export class TopicGraphFiltersComponent implements OnInit {
  selection = new SelectionModel<any>(true, ['Tclin', 'Tchem', 'Tbio', 'Tdark', 'disease', 'ligand']);
  @Output() filterSelectionChange: EventEmitter<SelectionChange<string>> = new EventEmitter<SelectionChange<string>>();
  @Output() confidenceChange: EventEmitter<{value: number, confidence: boolean}> = new EventEmitter<{value: number, confidence: boolean}>();
  confidenceCtrl: FormControl = new FormControl(0);
  showNoConfidence = true;

  constructor() {}

  ngOnInit() {
    this.selection.changed.subscribe(change => {
      this.filterSelectionChange.emit(change);
    });

    this.confidenceCtrl.valueChanges.subscribe(value => {
      this.confidenceChange.emit({value: value, confidence: this.showNoConfidence});
    });
  }

  showConfidenceChange() {
    this.showNoConfidence = !this.showNoConfidence;
    this.confidenceChange.emit({value: this.confidenceCtrl.value, confidence: this.showNoConfidence});
  }

  setFilterType(event, field) {
    console.log(event);
    console.log(field);
  }

}
