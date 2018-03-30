import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import { MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import {Field} from '../../../models/facet';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';
import {PathResolverService} from '../../../pharos-services/path-resolver.service';

@Component({
  selector: 'pharos-facet-table',
  templateUrl: './facet-table.component.html',
  styleUrls: ['./facet-table.component.css'],
//  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacetTableComponent implements OnInit, OnDestroy {
  @Input() facet: any;
  dataSource = new MatTableDataSource<any>([]);
  filterSelection = new SelectionModel<string>(true, []);
  displayColumns: string [] = ['select', 'label', 'count'];
  fieldColumns: string [] = ['label', 'count'];
  private ngUnsubscribe: Subject<any> = new Subject();
  propogate = true;

  constructor(private route: ActivatedRoute,
              private ref: ChangeDetectorRef,
              private pathResolverService: PathResolverService) { }

  // todo: on redirect (click targets button), the checked boxes remain
  ngOnInit() {
    this.pathResolverService.mapToFacets(this.route.snapshot.queryParamMap);

    this.pathResolverService.facets$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
      res.filter(facetObj =>
        facetObj.facet.toLowerCase() === this.facet.name.toLowerCase()).forEach(filtered => {
        this.propogate = false;
        this.filterSelection.select(...filtered.fields);
      }
    );
        this.propogate = true;
      });
  this.dataSource.data = this.facet.values;
    this.filterSelection.onChange
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(change => {
          if (this.propogate === true) {
            this.pathResolverService.mapSelection({facet: this.facet.name, fields: this.filterSelection.selected});
            this.pathResolverService.navigate();
          }
         });
  }

  trackByFunction(index, item: Field) {
    return item.label;
  }

  filterFacet(q: string): void {
  console.log(q);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
