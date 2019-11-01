import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DynamicPanelComponent} from '../dynamic-panel/dynamic-panel.component';
import {PharosProperty} from '../../models/pharos-property';
import {takeWhile} from 'rxjs/internal/operators';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'pharos-knowledge-table',
  templateUrl: './knowledge-table.component.html',
  styleUrls: ['./knowledge-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KnowledgeTableComponent extends DynamicPanelComponent implements OnInit {
  tableData: any;
  fields: PharosProperty[] = [
    new PharosProperty({
      name: 'name',
      label: 'Most Knowledge About',
      width: '85vw'
    }),
    new PharosProperty({
      name: 'value',
      label: 'Knowledge Value \r\n (0 to 1 scale)',
      description: ''
    })
  ];

  constructor(
    private changeRef: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    console.log(this);
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(
        // todo: this unsubscribe doesn't seem to work
        takeUntil(this.ngUnsubscribe),
      )
      .subscribe(x => {
        if (this.data && this.data.length > 0) {
          this.tableData = this.data.slice(0, 5).map(val => {
            val.value.term = val.value.term.toFixed(2);
            return val;
          });
          this.changeRef.markForCheck();
          /*this.data[0].axes.slice(0).sort((a, b) => b.value - a.value).slice(0, 5).forEach(
            field => this.tableData.push(
              {
                field: {label: field.name, term: field.name},
                value: {label: field.name, term: field.value.toFixed(2)}
              })
          );*/
        }
      });
  }
}
