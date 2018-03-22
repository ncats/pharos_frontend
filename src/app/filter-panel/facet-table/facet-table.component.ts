import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from "@angular/material";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {SelectionModel} from "@angular/cdk/collections";
import {Field} from "../../models/facet";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'pharos-facet-table',
  templateUrl: './facet-table.component.html',
  styleUrls: ['./facet-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacetTableComponent implements OnInit {
@Input() facet: any;
  dataSource = new MatTableDataSource<any>([]);
  filterSelection = new SelectionModel<string>(true, []);
  displayColumns:string [] = ['select', 'label', 'count'];
  fieldColumns:string [] = ['label', 'count'];
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ref: ChangeDetectorRef) { }

  // todo: on redirect (click targets button), the checked boxes remain
  ngOnInit() {
    console.log(this.route.snapshot);
    if(this.route.snapshot.queryParamMap.keys.length === 0){
      console.log("clearing selections");
      console.log(this.filterSelection.selected);
      this.filterSelection.clear();
      this.ref.markForCheck()
    }
    this.dataSource.data = this.facet.values;
    this.filterSelection.onChange
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(change => {
        const prev = this.route.snapshot.queryParamMap.getAll('facet');
      let facetList: string[] = prev ? prev : [];
      this.filterSelection.selected.map(field => {
       facetList.push(this._makeFacetString(field));
      });
      facetList = Array.from(new Set(facetList));
      // remove unclicked elements
        if(change.removed){
          const removed: string[] = [];
          change.removed.map(field => removed.push(this._makeFacetString(field)));
          removed.forEach(remField => facetList = facetList.filter(field => field !== remField));
        }
        const navigationExtras: NavigationExtras = {
        queryParams: {facet: facetList},
      };
        this.router.onSameUrlNavigation ='reload'; //forces reload since technically, this is the same navigation url
        this.router.navigate([], navigationExtras);
      });
  }

  trackByFunction(index, item: Field){
    return item.label;
  }

  private _makeFacetString(field: string): string {
    return this.facet.name.replace(/ /g, '+') + '/' + encodeURIComponent(field.toString())
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
