import { Component, OnInit } from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {PharosProperty} from '../../../../../models/pharos-property';
import {NavSectionsService} from '../../../../../tools/sidenav-panel/services/nav-sections.service';

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
  styleUrls: ['./target-facet-panel.component.css']
})
export class TargetFacetPanelComponent extends DynamicPanelComponent implements OnInit {
  /**
   * keys to the facets
   */
  keys: string[];
  
  facets: any[];

  fields: PharosProperty[] = [
    new PharosProperty({
      name: 'field',
      label: ''
    }),
   /*  // todo: add back in when counts are returned
    new PharosProperty({
      name: 'count',
      label: ''
    }),*/
    new PharosProperty({
      name: 'externalLink',
      label: ''
    })
  ];

  constructor(
    private navSectionsService: NavSectionsService
  ) {
    super();
  }

  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        // todo: this unsubscribe doesn't seem to work
        //    takeWhile(() => !this.data['references'])
      )
      .subscribe(x => {
        this.setterFunction();
      });
  }

  setterFunction(): void {
    if (this.data) {
      this.facets = [];
      this.keys = Object.keys(this.data);
      this.keys.forEach(key => {
        if (this.data[key]) {
          const links: PharosProperty[] = this.data[key].map(facet => {
            return {
              field:
                new PharosProperty({
                  term: facet.term,
                  href: facet.href, // todo: remove when this is standardized
                  internalLink: 'targets?facet=' + facet.label.replace( / /g, '+') + '/' + facet.term.replace(/ /g, '+')
                }),
           //   count: new PharosProperty({intval: 0}),
              externalLink:
                new PharosProperty({
                externalLink: facet.href
              })
            };
          });
          this.facets.push({label: key, fields: links});
        }
      });
      this.facets = this.facets.filter(facet => facet.fields.length > 0);
    }
  }

  getLabel(value: string) {
    return LABELS.get(value) ? LABELS.get(value) : value;
  }

  active(fragment: string) {
    this.navSectionsService.setActiveSection(fragment);
  }
}
