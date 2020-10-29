import {ChangeDetectorRef, Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {takeUntil} from "rxjs/operators";
import {PharosPoint} from "../../../../models/pharos-point";
import {ScatterOptions} from "../../../../tools/visualizations/scatter-plot/models/scatter-options";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {DynamicPanelComponent} from "../../../../tools/dynamic-panel/dynamic-panel.component";
import {isPlatformBrowser} from "@angular/common";
import {PharosApiService} from "../../../../pharos-services/pharos-api.service";
import {NavSectionsService} from "../../../../tools/sidenav-panel/services/nav-sections.service";

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
    @Inject(PLATFORM_ID) private platformID: Object,
    public navSectionsService: NavSectionsService) {
    super(navSectionsService);
  }

  hasTooMuchData() {
    return this.data.diseases.associationCount >= 5000;
  }

  hasDOID() {
    return this.data.diseases?.hasDOID();
  }

  ngOnInit(): void {

    this.router.events
      .subscribe((e: any) => {
        if (e instanceof NavigationStart) {
          this.loadingStart();
          this.tinx = []; this.inTinx = [];
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
        if (isPlatformBrowser(this.platformID) && !this.hasTooMuchData() && this.tinx.length < 1 && this.hasDOID()) {
          let diseaseName = this._route.snapshot.paramMap.get('id');
          let variables = {name: diseaseName};
          this.apiService.adHocQuery(this.apiService.TinxQuery, variables).subscribe(res => {
            res.data.disease.tinx.map(point => {
              if (point.targetID) {
                for(let i = 0 ; i < point.details.length ; i++) {
                  const p: PharosPoint = new PharosPoint({
                    label: point.details[i].diseaseName,
                    x: point.novelty,
                    y: point.details[i].importance,
                    name: `${point.targetName} (${point.tdl})`
                  });
                  this.inTinx.push(p);
                }
              }
            });
            this.tinx = this.inTinx;
            this.loadingComplete();
            this.changeRef.detectChanges();
          });
        }
        else {
          this.tinx = this.inTinx;
          this.loadingComplete();
          this.changeRef.detectChanges();
        }
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
