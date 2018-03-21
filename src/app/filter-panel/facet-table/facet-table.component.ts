import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from "@angular/material";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {SelectionModel} from "@angular/cdk/collections";
import {Field} from "../../models/facet";

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
  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.dataSource.data = this.facet.values;
    // todo this replaces any other fields from a different facet
    // todo needs to track all other selected facets, but ditch pagination data
    this.filterSelection.onChange.subscribe(change => {
      let facetList: string[] = [];
      this.filterSelection.selected.map(field => {
       facetList.push(this.facet.name.replace(/ /g, '+') + '/' + encodeURIComponent(field.toString()));
      });
      console.log(facetList);
      const navigationExtras: NavigationExtras = {
        queryParams: {facet: facetList},
        queryParamsHandling: 'merge'
      };
      this.router.navigate([], navigationExtras );    });
  }

/*navigateTo(value: any) {

    const val = encodeURIComponent(value.toString());
    const facet: string = this.facet.name.replace(/ /g, '+') + '/' + val;
    const navigationExtras: NavigationExtras = {
      queryParams: {facet: facet},
      queryParamsHandling: 'merge'
    };
   this.router.navigate([], navigationExtras );
    //  this.router.navigate([], {queryParams: { top: event.pageSize, skip: event.pageIndex * event.pageSize } });


  }*/

  trackByFunction(index, item: Field){
    return item.label;
  }
}
