import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Facet} from '../../../../models/facet';
import {CentralStorageService} from '../../../../pharos-services/central-storage.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

/**
 * list of facets available under the donut chart
 */
@Component({
  selector: 'pharos-visualization-options',
  templateUrl: './visualization-options.component.html',
  styleUrls: ['./visualization-options.component.scss']
})
export class VisualizationOptionsComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe: Subject<any> = new Subject();

  /**
   * list of available facets
   */
  @Input() facets: Facet[];
  @Input() model: string;

  /**
   * selected facet to display donut slices for
   */
  selected: string;

  /**
   * no args constructor
   */
  constructor(private centralStorageService: CentralStorageService) { }

  /**
   * load the first facet by default
   */
  ngOnInit() {
    this.selected = this.centralStorageService.getDisplayFacet(this.model);
    this.centralStorageService.displayFacetChanged
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(obj => {
      if (obj.model === this.model) {
        this.selected = obj.facet;
      }
    });
  }

  /**
   * change the facet displayed in the donut chart
   * @param {string} data
   */
  changeData(data: string) {
    this.selected = data;
    this.centralStorageService.setDisplayFacet(this.model, data);
  }

  /**
   * highlight selected facet
   * @param {string} field
   * @returns {boolean}
   */
  isSelected(field: string): boolean {
    return field === this.selected;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
