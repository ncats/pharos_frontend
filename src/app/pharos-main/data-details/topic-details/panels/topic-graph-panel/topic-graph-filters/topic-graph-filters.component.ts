import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SelectionChange, SelectionModel} from '@angular/cdk/collections';
import {FormControl} from '@angular/forms';

/**
 * component that holds a multitude of forms and inputs to filter a smrtgraph instance
 * emitts changes to the parent component instead of interacting with the graph itself
 */
@Component({
  selector: 'pharos-topic-graph-filters',
  templateUrl: './topic-graph-filters.component.html',
  styleUrls: ['./topic-graph-filters.component.scss']
})
export class TopicGraphFiltersComponent implements OnInit {
  /**
   * selection of filterable properties. displayed as toggle switches
   */
  selection = new SelectionModel<any>(true, ['Tclin', 'Tchem', 'Tbio', 'Tdark', 'disease', 'ligand']);

  pathBuilder = new SelectionModel<boolean>();

  /**
   * output changes on toggle filter changes
   */
  @Output() filterSelectionChange: EventEmitter<SelectionChange<string>> = new EventEmitter<SelectionChange<string>>();

  /**
   * output on link confidence filter changes
   */
  @Output() confidenceChange: EventEmitter<{value: number, confidence: boolean}> = new EventEmitter<{value: number, confidence: boolean}>();


  @Output() resetGraphEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() pathBuildEmitter: EventEmitter<any> = new EventEmitter<any>();

  /**
   * form control to track changes to the confidence slider
   */
  confidenceCtrl: FormControl = new FormControl(0);

  /**
   * show links with no confidence values/measurements. defaults to true
   */
  showNoConfidence = true;

  /**
   * no args constructor
   */
  constructor() {}

  /**
   * subscribe to event changes and emit them
   */
  ngOnInit() {
    this.selection.changed.subscribe(change => {
      this.filterSelectionChange.emit(change);
    });

    this.confidenceCtrl.valueChanges.subscribe(value => {
      this.confidenceChange.emit({value: value, confidence: this.showNoConfidence});
    });

    this.pathBuilder.changed.subscribe(change => this.pathBuildEmitter.emit());
  }

  /**
   * emit changes to no confidence boolean
   */
  showConfidenceChange() {
    this.showNoConfidence = !this.showNoConfidence;
    this.confidenceChange.emit({value: this.confidenceCtrl.value, confidence: this.showNoConfidence});
  }

  resetGraph() {
    this.selection.select(...['Tclin', 'Tchem', 'Tbio', 'Tdark', 'disease', 'ligand']);
    this.resetGraphEmitter.emit();
  }

  /**
   * todo: this doesn't do anything
   * @param event
   * @param field
   */
  setFilterType(event, field) {

  }

}
