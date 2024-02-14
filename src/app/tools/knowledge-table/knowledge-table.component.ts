import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {DynamicPanelComponent} from '../dynamic-panel/dynamic-panel.component';
import {PharosProperty} from '../../models/pharos-property';
import {takeUntil} from 'rxjs/operators';
import {DynamicServicesService} from '../../pharos-services/dynamic-services.service';
import {GenericTableComponent} from '../generic-table/generic-table.component';
import {CommonModule} from '@angular/common';

/**
 * table of 5 properties to show harmonizome data
 */
@Component({
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  selector: 'pharos-knowledge-table',
  templateUrl: './knowledge-table.component.html',
  styleUrls: ['./knowledge-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KnowledgeTableComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
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
    private changeRef: ChangeDetectorRef,
    public dynamicServices: DynamicServicesService
  ) {
    super(dynamicServices);
  }

  /**
   * set table data
   */
  ngOnInit() {
    this._data
    // listen to data as long as term is undefined or null
    // Unsubscribe once term has value
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
        this.tableData = this.data.sort((a, b) => b.value.term - a.value.term).slice(0, 5);
        this.changeRef.markForCheck();
      });
  }
}
