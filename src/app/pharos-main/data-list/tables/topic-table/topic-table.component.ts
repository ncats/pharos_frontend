import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';


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
   * @param ref
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
    /*   this._route.snapshot.data.data.valueChanges().subscribe(res => {
          this.topics = res;
          this.ref.markForCheck();
        });*/
  }
}

