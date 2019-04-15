import { Component, OnInit } from '@angular/core';
import {DynamicPanelComponent} from '../dynamic-panel/dynamic-panel.component';
import {PharosProperty} from '../../models/pharos-property';
import {TableData} from '../../models/table-data';
import {takeWhile} from 'rxjs/internal/operators';

@Component({
  selector: 'pharos-knowledge-table',
  templateUrl: './knowledge-table.component.html',
  styleUrls: ['./knowledge-table.component.css']
})
export class KnowledgeTableComponent extends DynamicPanelComponent implements OnInit {
  tableData: any;
  fields: TableData[] = [
    new TableData({
      name: 'field',
      label: 'Most Knowledge About',
      width: 85
    }),
    new TableData({
      name: 'value',
      label: 'Knowledge Value \r\n (0 to 1 scale)'
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
        //   takeWhile(() => !this.data[0])
      )
      .subscribe(x => {
        if (this.data && this.data.length > 0) {
          this.tableData = [];
          this.data[0].axes.slice(0).sort((a, b) => b.value - a.value).slice(0, 5).forEach(
            field => this.tableData.push(
              {
                field: {label: field.axis, term: field.axis},
                value: {label: field.axis, term: field.value.toFixed(2)}
              })
          );
        }
      });
  }
}
