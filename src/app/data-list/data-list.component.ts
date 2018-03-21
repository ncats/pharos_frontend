import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {MatPaginator, MatPaginatorIntl, MatSort, MatTableDataSource} from '@angular/material';
import {ResponseParserService} from "../services/response-parser.service";
import {PharosApiService} from "../services/pharos-api.service";
import {detectChanges} from "@angular/core/src/render3";

@Component({
  selector: 'pharos-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {
  data: any;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayColumns: string[] = ['name', 'idgTDL','idgFamily', 'novelty','jensenScore', 'antibodyCount', 'knowledgeAvailability'];
  constructor(private route: ActivatedRoute,
              private router: Router,
              private ref: ChangeDetectorRef,
              private responseParserService: ResponseParserService,
              private pharosApiService: PharosApiService) {
  }

  ngOnInit() {
    this.responseParserService.tableData$.subscribe(res=> {
      console.log(res);
      this.dataSource.data = res;
      this.ref.markForCheck();
    });

   /* this.route.queryParamMap.subscribe(res => console.log(res));
    this.route.data.subscribe(res => {
      console.log(res);
      this.dataSource.data = res.data.content;
    });*/
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

paginationChanges(event: any ) {
  console.log(event);
  const navigationExtras: NavigationExtras = {
    queryParams: { top: event.pageSize, skip: event.pageIndex * event.pageSize },
    queryParamsHandling: 'merge'
  };
  this.router.navigate([], navigationExtras);
}


}
