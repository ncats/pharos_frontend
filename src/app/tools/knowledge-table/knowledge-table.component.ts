import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DynamicPanelComponent} from '../dynamic-panel/dynamic-panel.component';
import {PharosProperty} from '../../models/pharos-property';

/**
 * table of 5 properties to show harmonizome data
 */
@Component({
  selector: 'pharos-knowledge-table',
  templateUrl: './knowledge-table.component.html',
  styleUrls: ['./knowledge-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KnowledgeTableComponent extends DynamicPanelComponent implements OnInit {
  /**
   * data to display
   */
  tableData: any;

  /**
   * list of fields to display. The labels are adapted
   * @type {PharosProperty[]}
   */
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

  /**
   * add change detection
   * @param {ChangeDetectorRef} changeRef
   */
  constructor(
    private changeRef: ChangeDetectorRef
  ) {
    super();
  }

  /**
   * set table data
   */
  ngOnInit() {
          this.tableData = this.data.slice(0, 5);
          this.changeRef.markForCheck();
  }
}
