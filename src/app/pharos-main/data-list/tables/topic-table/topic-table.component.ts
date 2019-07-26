import {
  AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild
} from '@angular/core';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {PageData} from '../../../../models/page-data';
import {HttpClient} from '@angular/common/http';
import {Message} from '../../../../pharos-home/news-panel/news-panel.component';
import {AngularFirestore} from '@angular/fire/firestore';
import {Topic} from '../../../../models/topic';
import {ActivatedRoute, Route} from '@angular/router';


@Component({
  selector: 'pharos-topic-table',
  templateUrl: './topic-table.component.html',
  styleUrls: ['./topic-table.component.css']
})
export class TopicTableComponent implements OnInit {
  /**
   * list of messages from firebase
   */
  topics: any[];


  /**
   * set up dependencies
   * @param {ChangeDetectorRef} changeDetector
   * @param _route
   * @param {HttpClient} _http
   */
  constructor(
    private ref: ChangeDetectorRef,
    private _route: ActivatedRoute,
    private _http: HttpClient) {
  }


  /**
   * subscribe to data changes
   */
  ngOnInit() {
   this._route.snapshot.data.data.valueChanges().subscribe(res => {
     console.log(res);
      this.topics = res;
      this.ref.markForCheck();
    });
  }
}

