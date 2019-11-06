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
          this.tableData = this.data.slice(0, 5).map(val => {
            val.value.term = val.value.term.toFixed(2);
            return val;
          });
          this.changeRef.markForCheck();
  }
}
