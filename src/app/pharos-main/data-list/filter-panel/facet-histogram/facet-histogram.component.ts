import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import {Facet} from "../../../../models/facet";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {SelectedFacetService} from "../selected-facet.service";
import {PathResolverService} from "../path-resolver.service";

@Component({
  selector: 'pharos-facet-histogram',
  templateUrl: './facet-histogram.component.html',
  styleUrls: ['./facet-histogram.component.scss']
})
export class FacetHistogramComponent implements OnInit {

  /**
   * unsubscribe subject
   * @type {Subject<any>}
   */
  private ngUnsubscribe: Subject<any> = new Subject();

  chartData: any[] = [];

  constructor(
    private router: Router,
    private changeRef: ChangeDetectorRef,
    private selectedFacetService: SelectedFacetService,
    private pathResolverService: PathResolverService,
    private _route: ActivatedRoute) {
  }

  @Input() facet: Facet;

  min: number;
  minSetting: number;

  max: number;
  maxSetting: number;
  boundsChanged(event){
    this.changeRef.detectChanges();
    this.boundsChangedSubject.next();
  }

  sliderRange(){
    return [this.minSetting, this.maxSetting];
  }

  boundsChangedSubject: Subject<void> = new Subject<void>();
  currentRange(){
    return `(${this.minSetting}, ${this.maxSetting})`;
  }
  applyFilter(){
    this.selectedFacetService.removefacetFamily(this.facet);
    this.selectedFacetService.setFacets({name: this.facet, change: {added: [this.currentRange()]}});
    const queryParams = this.selectedFacetService.getFacetsAsUrlStrings();
    this.pathResolverService.navigate(queryParams, this._route, this.selectedFacetService.getPseudoFacets());
  }

  ngOnInit(): void {
    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalize the component
        if (e instanceof NavigationEnd) {
          // update field values
          this.initialize();
          this.changeRef.detectChanges();
          this.boundsChangedSubject.next();
        }
      });
    this.initialize();
  }

  initialize(){
    const valMap: Map<string, number> = new Map<string, number>();
    this.min = parseFloat(this.facet.values[0].name);
    this.max = parseFloat(this.facet.values[0].name);

    this.facet.values.forEach(d => {
      let curVal = parseFloat(d.name);
      this.min = curVal < this.min ? curVal : this.min;
      this.max = curVal > this.max ? curVal : this.max;
      valMap.set(d.name, d.count);
    });
    this.chartData = Array.from(valMap.entries());

    this.minSetting = this.min;
    this.maxSetting = this.max;
  }


  /**
   * function to unubscribe on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
