import {ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {takeUntil} from "rxjs/operators";
import {PharosPoint} from "../../../../models/pharos-point";
import {ScatterOptions} from "../../../../tools/visualizations/scatter-plot/models/scatter-options";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {DynamicPanelComponent} from "../../../../tools/dynamic-panel/dynamic-panel.component";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'pharos-tinx-disease',
  templateUrl: './tinx-disease.component.html',
  styleUrls: ['./tinx-disease.component.scss']
})
export class TinxDiseaseComponent extends DynamicPanelComponent implements OnInit {

  tinx: PharosPoint[];

  constructor(
    private apollo: Apollo,
    private changeRef: ChangeDetectorRef,
    private _route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformID: Object) {
    super();
  }

  hasTooMuchData(){
    return this.data.diseases.associationCount >= 10000;
  }

  ngOnInit(): void {

    this.router.events
      .subscribe((e: any) => {
        if (e instanceof NavigationStart) {
          this.loading = true;
        }
      });

    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        let diseaseName = this._route.snapshot.paramMap.get('id');
        let variables = {name: diseaseName};
        this.tinx = [];
        if (isPlatformBrowser(this.platformID) && !this.hasTooMuchData()) {
          this.apollo.query<any>({query: this.tinxQuery, variables}).subscribe(res => {
            this.tinx = [];
            res.data.disease.tinx.map(point => {
              if (point.targetID) {
                const p: PharosPoint = new PharosPoint({
                  label: point.details[0].diseaseName,
                  x: point.novelty,
                  y: point.details[0].importance,
                  name: point.targetName
                });
                this.tinx.push(p);
              }
            });
            this.changeRef.markForCheck();
            this.loading = false;
          });
        }
        else{
          this.loading = false;
        }
      });
  }

  chartOptions: ScatterOptions = new ScatterOptions({
    line: false,
    xAxisScale: 'log',
    yAxisScale: 'log',
    xLabel: 'Novelty',
    yLabel: 'Importance',
    margin: {top: 20, right: 175, bottom: 25, left: 35}
  });

  tinxQuery = gql`query tinxDisease($name: String) {
    disease(name: $name) {
      tinx {
        targetID
        targetName
        tdl
        novelty
        details {
          doid
          diseaseName
          importance
        }
      }
    }
  }`;

}
