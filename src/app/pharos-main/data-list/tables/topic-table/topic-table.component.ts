import {
  AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild
} from '@angular/core';
import {DynamicPanelComponent} from '../../../../tools/dynamic-panel/dynamic-panel.component';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {PageData} from '../../../../models/page-data';
import {HttpClient} from '@angular/common/http';
import {Message} from "../../../../pharos-home/news-panel/news-panel.component";
import {AngularFirestore} from "@angular/fire/firestore";
import {Topic} from "../../../../models/topic";


@Component({
  selector: 'pharos-topic-table',
  templateUrl: './topic-table.component.html',
  styleUrls: ['./topic-table.component.css']
})
export class TopicTableComponent implements OnInit {
  /**
   * list of messages from firebase
   */
  topics: Message[];


  /**
   * set up dependencies
   * @param {ChangeDetectorRef} changeDetector
   * @param db
   * @param {HttpClient} _http
   */
  constructor(
    private changeDetector: ChangeDetectorRef,
    private db: AngularFirestore,
    private _http: HttpClient) {
  }

  /**
   * subscribe to data changes
   */
  ngOnInit() {
    console.log(this);
    this.db.collection<Message>('topics').valueChanges()
      .subscribe(topics => {
        console.log(topics);
        this.topics = topics.sort((a, b) => b.index - a.index);
      });
  /*  this._data.subscribe(d => {
      if (this.data) {
        this.topicsDataSource.data = this.data;
      }
    });*/
  }
}

