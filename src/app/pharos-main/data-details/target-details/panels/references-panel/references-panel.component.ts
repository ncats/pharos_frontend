import {ChangeDetectorRef, Component, Input, OnInit, SimpleChange, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Publication} from '../../../../../models/publication';
import {BehaviorSubject} from 'rxjs';
import {DynamicPanelComponent} from '../../../../../tools/dynamic-panel/dynamic-panel.component';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'pharos-references-panel',
  templateUrl: './references-panel.component.html',
  styleUrls: ['./references-panel.component.css']
})
export class ReferencesPanelComponent extends DynamicPanelComponent implements OnInit {
 // data: any;
  displayColumns: string[] = ['pmid', 'year', 'title'];
  dataSource = new MatTableDataSource<Publication[]>();
  width: number;

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

  setterFunction() {
this.dataSource.data = this.data['references'];
  }


}
