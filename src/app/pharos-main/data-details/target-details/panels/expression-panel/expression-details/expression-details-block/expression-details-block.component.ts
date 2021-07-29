import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'pharos-expression-details-block',
  templateUrl: './expression-details-block.component.html',
  styleUrls: ['./expression-details-block.component.scss']
})
export class ExpressionDetailsBlockComponent implements OnInit {
  @Input() expressions: any[];
  constructor() { }
  allDisplayColumns = ['tissue', 'gender', 'tpm', 'tpm_rank', 'qual', 'url', 'value', 'evidence', 'zscore', 'conf', 'pub', 'sourceRank'];
  displayColumns = [];
  ngOnInit(): void {
    const goodColumns = [];
    this.expressions.forEach(e => {
      for (const prop in e) {
        if (e.hasOwnProperty(prop)) {
          if ((e[prop] || e[prop] === 0) && e[prop].toString().length > 0 && !goodColumns.includes(prop)) {
            goodColumns.push(prop);
            if (prop === 'pub') {
              e.pub = e.pub.pmid;
            }
          }
        }
      }
    });
    this.displayColumns = this.allDisplayColumns.filter(c => goodColumns.includes(c));
  }

  getLink(column: string, value: string) {
    if (column === 'url') {
      return value;
    }
    if (column === 'pub') {
      return `http://www.ncbi.nlm.nih.gov/pubmed/${value}`;
    }
    return false;
  }
  getLinkText(column: string, value: string) {
    if (column === 'url') {
      const chunk = value.split('://')[1];
      return chunk.split('/')[0];
    }
    return value;
  }
}
