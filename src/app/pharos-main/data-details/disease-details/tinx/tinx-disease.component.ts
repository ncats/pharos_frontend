import {ChangeDetectorRef, Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {takeUntil} from "rxjs/operators";
import {PharosPoint} from "../../../../models/pharos-point";
import {ScatterOptions} from "../../../../tools/visualizations/scatter-plot/models/scatter-options";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {DynamicPanelComponent} from "../../../../tools/dynamic-panel/dynamic-panel.component";
import {isPlatformBrowser} from "@angular/common";
import {PharosApiService} from "../../../../pharos-services/pharos-api.service";

@Component({
  selector: 'pharos-tinx-disease',
  templateUrl: './tinx-disease.component.html',
  styleUrls: ['./tinx-disease.component.scss']
})
export class TinxDiseaseComponent extends DynamicPanelComponent implements OnInit {

  @Input()
  inTinx: PharosPoint[] = [];

  tinx: PharosPoint[] = [];

  constructor(
    private apiService: PharosApiService,
    private changeRef: ChangeDetectorRef,
    private _route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformID: Object) {
    super();
  }

  hasTooMuchData(){
    return this.data.diseases.associationCount >= 5000;
  }

  ngOnInit(): void {

    this.router.events
      .subscribe((e: any) => {
        if (e instanceof NavigationStart) {
          this.loading = true;
          this.tinx = [];
          this.changeRef.markForCheck();
        }
      });

    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        if (isPlatformBrowser(this.platformID) && !this.hasTooMuchData() && this.inTinx.length < 1) {
          let diseaseName = this._route.snapshot.paramMap.get('id');
          let variables = {name: diseaseName};
          this.apiService.adHocQuery(this.apiService.TinxQuery, variables).subscribe(res => {
            res.data.disease.tinx.map(point => {
              if (point.targetID) {
                const p: PharosPoint = new PharosPoint({
                  label: point.details[0].diseaseName,
                  x: point.novelty,
                  y: point.details[0].importance,
                  name: point.targetName
                });
                this.inTinx.push(p);
              }
            });
          });
        }
        this.tinx = this.inTinx;
        this.loading = false;
        this.changeRef.detectChanges();
      });
  }

  chartOptions: ScatterOptions = new ScatterOptions({
    line: false,
    xAxisScale: 'log',
    yAxisScale: 'log',
    xLabel: 'Novelty',
    yLabel: 'Importance',
    margin: {top: 20, right: 35, bottom: 25, left: 35}
  });
}
