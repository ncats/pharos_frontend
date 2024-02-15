import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';

@Component({
    standalone: true,
    imports: [CommonModule, MatTableModule],
  selector: 'pharos-expression-details-block',
  templateUrl: './expression-details-block.component.html',
  styleUrls: ['./expression-details-block.component.scss']
})
export class ExpressionDetailsBlockComponent implements OnInit {
  @Input() expressions: any[] = [];
  constructor() { }
  allDisplayColumns = ['tissue', 'gender', 'tpm_rank', 'tpm', 'tpm_male', 'tpm_female',
                      'qual', 'url', 'value', 'evidence', 'zscore', 'conf', 'pub', 'sourceRank'];
  displayColumns = [];
  labelMap: Map<string, string> = new Map<string, string>([
      ['tissue', 'Tissue'],
      ['gender', 'Gender'],
      ['tpm', 'TPM'],
      ['tpm_rank', 'TPM Rank'],
      ['tpm_male', 'TPM (male)'],
      ['tpm_female', 'TPM (female)'],
      ['qual', 'Level'],
      ['url', 'URL'],
      ['value', 'Value'],
      ['evidence', 'Evidence'],
      [ 'zscore', 'Zscore'],
      ['conf', 'Confidence'],
      ['pub', 'Publication'],
      ['sourceRank', 'Source Rank']
  ]);

  ngOnInit(): void {
    const goodColumns = [];
    this.expressions.forEach(e => {
      for (const prop in e) {
        if (e.hasOwnProperty(prop)) {
          if ((e[prop] || e[prop] === 0) && e[prop].toString().length > 0 && !goodColumns.includes(prop)) {
            goodColumns.push(prop);
          }
          if (e[prop] && prop === 'pub') {
            e.pub = e.pub.pmid;
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
