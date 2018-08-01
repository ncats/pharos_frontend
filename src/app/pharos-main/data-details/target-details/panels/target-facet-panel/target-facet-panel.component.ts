import { Component, OnInit } from '@angular/core';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {TableData} from '../../../../../models/table-data';
import {Property} from '../../../../../models/property';

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

@Component({
  selector: 'pharos-target-facet-panel',
  templateUrl: './target-facet-panel.component.html',
  styleUrls: ['./target-facet-panel.component.css']
})
export class TargetFacetPanelComponent extends DynamicPanelComponent implements OnInit {
  keys: string[];
  facets: any[];

  fields: TableData[] = [
    new TableData({
      name: 'field',
      label: ''
    }),
   /*  // todo: add back in when counts are returned
    new TableData({
      name: 'count',
      label: ''
    }),*/
    new TableData({
      name: 'externalLink',
      label: ''
    })
  ];

  constructor() {
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
          const links: Property[] = this.data[key].map(facet => {
            return {
              field:
                new Property({
                  term: facet.term,
                  href: facet.href, // todo: remove when this is standardized
                  internalHref: facet.href
                }),
           //   count: new Property({intval: 0}),
              externalLink: new Property({
                externalHref: facet.href
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
}
