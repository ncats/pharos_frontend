import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Facet} from '../../../../models/facet';

/**
 * list of facets available under the donut chart
 */
@Component({
  selector: 'pharos-visualization-options',
  templateUrl: './visualization-options.component.html',
  styleUrls: ['./visualization-options.component.scss']
})
export class VisualizationOptionsComponent implements OnInit {

  /**
   * list of available facets
   */
  @Input() facets: Facet[];

  /**
   * event emitter for facet change that changes the donut slices listed
   * @type {EventEmitter<string>}
   */
  @Output() readonly fieldChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * selected facet to display donut slices for
   */
  selected: string;

  /**
   * no args constructor
   */
  constructor() { }

  /**
   * load the first facet by default
   */
  ngOnInit() {
    this.changeData(this.facets[0].facet);
  }

  /**
   * change the facet displayed in the donut chart
   * @param {string} data
   */
  changeData(data: string) {
    this.selected = data;
    this.fieldChange.emit(data);
  }

  /**
   * highlight selected facet
   * @param {string} field
   * @returns {boolean}
   */
  isSelected(field: string): boolean {
    return field === this.selected;
  }
}
