import { Component, OnInit } from '@angular/core';
import {DynamicPanelComponent} from '../../../../../../tools/dynamic-panel/dynamic-panel.component';
import {PharosProperty} from '../../../../../../models/pharos-property';
import {PageData} from '../../../../../../models/page-data';
import {takeUntil} from 'rxjs/internal/operators';

@Component({
  selector: 'pharos-differential-panel',
  templateUrl: './differential-panel.component.html',
  styleUrls: ['./differential-panel.component.scss']
})
export class DifferentialPanelComponent extends DynamicPanelComponent implements OnInit {
  fields: PharosProperty[] = [
    new PharosProperty({
      name: 'IDG Disease',
      label: 'Disease',
      sortable: true
    }),

    new PharosProperty({
        name: 'log2foldchange',
        label: 'log2 FC',
        sortable: true
      }
    ),

    new PharosProperty({
        name: 'pvalue',
        label: 'P-value',
        sortable: true,
        sorted: 'desc'
      }
    )];

  /**
   * page data object to track pagination
   */
  pageData: PageData;

  diseaseRelevanceSerializer: any = {};

  diseaseSources: any[] = [];

  tableArr: any[] = [];

  /**
   * no args constructor
   * calls super object
   */
  constructor() {
    super();
  }

  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (Object.values(this.data).length > 0) {
          this.ngUnsubscribe.next();
       //   this.setterFunction();
        }
      });
  }

  setterFunction(): void {
  this.tableArr = [];
  this.data
    .filter(term => term.properties.filter(prop => prop.term === 'Expression Atlas').length > 0)
    .forEach(dr => {
    // create new disease relevance object to get PharosProperty class properties
    const readDR: any = this.diseaseRelevanceSerializer.fromJson(dr);
    // get array of diseases from source map
    const tableData: any = {};
    readDR.properties.forEach(prop => {
      tableData[prop.label] = new PharosProperty(prop);
    });
    this.diseaseSources.push(tableData);
  });
  this.pageData = new PageData(
    {
      top: 10,
      skip: 0,
      total: this.diseaseSources.length,
      count: 10
    });
  this.tableArr = this.diseaseSources
      .slice(this.pageData.skip, this.pageData.top);
  }

  page(event) {
    this.tableArr = this.diseaseSources.slice(event.pageIndex * event.pageSize, (event.pageIndex + 1) * event.pageSize);
  }

}
