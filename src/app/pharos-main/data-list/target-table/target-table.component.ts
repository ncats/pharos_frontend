import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Target} from '../../../models/target';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'pharos-target-table',
  templateUrl: './target-table.component.html',
  styleUrls: ['./target-table.component.css']
})

export class TargetTableComponent  extends DynamicPanelComponent implements OnInit, OnDestroy {
  displayColumns: string[] = ['name', 'gene', 'idgTDL', 'idgFamily', 'novelty', 'jensenScore', 'antibodyCount', 'knowledgeAvailability'];
  @Input() total: number;
  @Output() readonly sortChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() readonly pageChange: EventEmitter<string> = new EventEmitter<string>();


  dataSource = new MatTableDataSource<any>(this.data);
  rowSelection = new SelectionModel<any>(true, []);

  constructor() {
    super();
  }

  ngOnInit() {
    this._data
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(obj => {
        this.dataSource.data = this.data;
      });
  }

  changeSort($event): void {
    this.sortChange.emit($event);
  }

  changePage($event): void {
    console.log("page change");
    this.pageChange.emit($event);
  }

ngOnDestroy(): void {
  this.ngUnsubscribe.next();
this.ngUnsubscribe.complete();
}
}
