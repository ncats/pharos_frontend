import {Component, OnDestroy, OnInit} from '@angular/core';
import {DynamicPanelComponent} from '../tools/dynamic-panel/dynamic-panel.component';
import {DynamicServicesService} from '../pharos-services/dynamic-services.service';
import {takeUntil} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {PharosPoint} from '../models/pharos-point';
import {ScatterOptions} from '../tools/visualizations/scatter-plot/models/scatter-options';

@Component({
  selector: 'pharos-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss']
})
export class StatsPageComponent extends DynamicPanelComponent implements OnInit, OnDestroy {

  constructor(
    public dynamicServices: DynamicServicesService,
    private _route: ActivatedRoute) {
    super(dynamicServices);
  }

  get displayColumns() {
    return ['uses', 'users', 'summary'];
  }

  get schemas() {
    return ['pharos_config_prod', 'pharos_config_dev'];
  }

  get summaryFields() {
    return ['dayStats', 'weekStats', 'monthStats', 'yearStats'];
  }

  dataTree: Map<string, any>;

  ngOnInit(): void {
    this.data = this._route.snapshot.data;
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (this.data && this.data.results) {
          this.dataTree = new Map<string, any>();
          this.schemas.forEach(schema => {
            const schemaData = new Map<string, any>();
            this.dataTree.set(schema, schemaData);
            this.summaryFields.forEach(field => {
              schemaData.set(field, new Map<string, any>());
            });
          });
          this.summaryFields.forEach(field => {
            this.data.results[field].forEach(point => {
              const schemaData = this.dataTree.get(point.schema);
              const fieldData = schemaData.get(field);

              let featureList = fieldData.get(point.feature);
              if (!featureList) {
                featureList = [];
                fieldData.set(point.feature, featureList);
              }
              featureList.push(point);
            });
          });
        }
      });
  }

  /**
   * cleanp on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
