import {Component, Input, OnInit} from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {PharosProperty} from '../../../../../models/pharos-property';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';
import {Target} from '../../../../../models/target';

/**
 * this is a list of the facets shown - this could probably be set in the config files
 * @type {Map<string, string>}
 */
const LABELS: Map<string, string> = new Map<string, string> (
  [
    ['pantherProteinClass', 'Panther Protein Class'],
    ['goFunction', 'GO Function'],
    ['goComponent', 'GO Component'],
    ['goProcess', 'GO Process'],
    ['rnaCellLine', 'RNA Cell Line'],
    ['uniprotKeyword', 'Uniprot Keyword'],
    ['pathways', 'Pathways'],
    ['mgiPhenotype', 'MGI Phenotype'],
    ['gwasTrait', 'GWAS Trait']
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
    public navSectionsService: NavSectionsService) {
    super(navSectionsService);
  }

  // todo support pagination for each facet table
  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        // todo: this unsubscribe doesn't seem to work
        //    takeWhile(() => !this.data['references'])
      )
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
      if (this.targetProps[key] && this.targetProps[key].length > 0) {
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
    return LABELS.get(value) ? LABELS.get(value) : value;
  }

  /**
   * active section view tracker
   * @param {string} fragment
   */
  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }
}
