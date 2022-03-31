import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {PageData} from '../../../../../../models/page-data';
import {SharedPathwayDetails} from '../../../../../../models/target';

@Component({
  selector: 'pharos-nearby-target-list',
  templateUrl: './nearby-target-list.component.html',
  styleUrls: ['./nearby-target-list.component.scss']
})
export class NearbyTargetListComponent implements AfterViewInit {
  @Input() apiSources: any[];
  @Input() sharedPathwayDetails: SharedPathwayDetails[];

  pageData: PageData = new PageData({});
  filteredList: SharedPathwayDetails[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.pageData = new PageData({
      total: this.sharedPathwayDetails.length,
      skip: 0,
      top: 5
    });
    this.updateList({pageIndex: 0, pageSize: 5});
  }

  updateList(event) {
    let startNum = event.pageIndex * event.pageSize;
    this.filteredList = this.sharedPathwayDetails.slice(startNum, startNum + event.pageSize)
  }

  paginate(event: any) {
      this.updateList(event);
  }

}
