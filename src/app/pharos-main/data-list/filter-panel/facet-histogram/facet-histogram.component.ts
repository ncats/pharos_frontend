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
  minForTargetList?: number;

  max: number;
  maxSetting: number;
  maxForTargetList?: number;

  boundsChanged(event){
    this.minSetting = event.value[0];
    this.maxSetting = event.value[1];
    this.changeRef.detectChanges();
    this.boundsChangedSubject.next();
  }

  sliderRange(){
    return [this.minSetting, this.maxSetting];
  }

  boundsChangedSubject: Subject<void> = new Subject<void>();
  currentRangeDisplay(){
    let decimals = 0;
    if(Math.floor(this.facet.binSize) !== this.facet.binSize) {
      decimals = this.facet.binSize.toString().split(".")[1].length;
    }
    return `[ ${this.minSetting.toFixed(decimals)}, ${this.maxSetting.toFixed(decimals)} `
      + (this.maxSetting === this.max || this.maxSetting === this.minSetting ? "]" : ")");
  }

  applyFilter(){
    this.selectedFacetService.removefacetFamily(this.facet);
    this.selectedFacetService.setFacets({name: this.facet.facet, change: {added: [this.currentRangeDisplay()]}});
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
    this.min = this.facet.min;
    this.max = this.facet.max;

    this.facet.values.forEach(d => {valMap.set(d.name, d.count);});
    this.chartData = Array.from(valMap.entries());

    this.mapSelected();
  }

  mapSelected() {
    const selected: Facet = this.selectedFacetService.getFacetByName(this.facet.facet);
    if (selected) {
      let pieces = selected.values[0].name.split(",").map(s => s.replace(/[^0-9|\-|\.]/g, ''));
      this.minForTargetList = pieces[0] == null || pieces[0].length === 0 ? null : +pieces[0];
      this.maxForTargetList = pieces[1] == null || pieces[1].length === 0 ? this.max : +pieces[1];
      this.minSetting = this.minForTargetList;
      this.maxSetting = this.maxForTargetList;
    } else {
      this.minForTargetList = null;
      this.maxForTargetList = null;
      this.minSetting = this.min;
      this.maxSetting = this.max;
    }
  }

  currentSettingsAreApplied(){
    return this.minSetting === this.minForTargetList && this.maxSetting === this.maxForTargetList;
  }

  /**
   * function to unubscribe on destroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
