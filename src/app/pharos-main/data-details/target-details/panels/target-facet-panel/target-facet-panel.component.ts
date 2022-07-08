import {Component, Input, OnInit} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {PharosProperty} from '../../../../../models/pharos-property';
import {Target} from '../../../../../models/target';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';
import {takeUntil} from 'rxjs/operators';

/**
 * this is a list of the facets shown - this could probably be set in the config files
 * @type {Map<string, string>}
 */
const LABELS: Map<string, {label: string, facet: string}> = new Map<string, {label: string, facet: string}> (
  [
    ['uniprotKeyword', {label: 'UniProt Keyword', facet: 'UniProt Keyword'}],
    ['gwasTrait', {label: 'GWAS Trait', facet: 'GWAS'}],
    ['mgiPhenotype', {label: 'MGI Phenotype', facet: 'JAX/MGI Phenotype'}],
  ]);

/**
 * show various related facets
 */
@Component({
  selector: 'pharos-target-facet-panel',
  templateUrl: './target-facet-panel.component.html',
  styleUrls: ['./target-facet-panel.component.scss']
})
export class TargetFacetPanelComponent extends DynamicPanelComponent implements OnInit {
  /**
   * keys to the facets
   */
  keys: string[];

  @Input() target: Target;

  @Input() targetProps: any;

  facets: any[];

  fields: PharosProperty[] = [
    new PharosProperty({
      name: 'field',
      label: ''
    }),
    new PharosProperty({
      name: 'externalLink',
      label: ''
    })
  ];

  constructor(
    public dynamicServices: DynamicServicesService) {
    super(dynamicServices);
  }

  // todo support pagination for each facet table
  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        this.facets = [];
        this.target = this.data.targets;
        this.targetProps = this.data.targetsProps;
        this.setterFunction();
        this.loadingComplete();
      });
  }

  setterFunction(): void {
    [...LABELS.keys()].map(key => {
      if (this.targetProps && this.targetProps[key] && this.targetProps[key].length > 0) {
        this.facets.push(
          {
            name: key,
            label: LABELS.get(key),
            fields: this.targetProps[key].map(field => field = {
                field: field.term ? field.term : field.value,
                externalLink: {externalLink: field.value && field.value.externalLink ? field.value.externalLink : null}
              }
              )
          }
          );
      }
    });
  }

  getLabel(value: string) {
    return LABELS.get(value) ? LABELS.get(value).label : value;
  }
  getFacet(value: string){
    return LABELS.get(value) ? LABELS.get(value).facet : value;
  }
}
