import {ChangeDetectorRef, Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {Target} from "../../../../../models/target";
import {PharosApiService} from "../../../../../pharos-services/pharos-api.service";
import {isPlatformBrowser} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {DynamicPanelComponent} from "../../../../../tools/dynamic-panel/dynamic-panel.component";
import {DynamicServicesService} from "../../../../../pharos-services/dynamic-services.service";

@Component({
  selector: 'pharos-target-word-cloud',
  templateUrl: './target-word-cloud.component.html',
  styleUrls: ['./target-word-cloud.component.scss']
})
export class TargetWordCloudComponent extends DynamicPanelComponent implements OnInit {
  @Input() target: Target;
  cloudData: any[] = [];

  constructor(
    private changeRef: ChangeDetectorRef,
    private pharosApiService: PharosApiService,
    @Inject(PLATFORM_ID) private platformID: any,
    private _route: ActivatedRoute,
    public dynamicServices: DynamicServicesService
  ) {
    super(dynamicServices);
  }


  ngOnInit(): void {

    if (isPlatformBrowser(this.platformID)) {
      const target = this._route.snapshot.paramMap.get('id');
      const variables = {name: target};
      this.loadingStart();
      const minFont = 16;
      const maxFont = 70;
      this.pharosApiService.adHocQuery(this.pharosApiService.PubmedCloudQuery, variables).toPromise()
        .then(
          (res: any) => {
            const words = res.data.target.abstractWordCounts;
            const maxLog = Math.log(words[0].value);
            const minLog = Math.log(words[words.length - 1].value);
            this.cloudData = words.map((wordObj) => {
              const logVal = Math.log(wordObj.value);
              return { text: wordObj.name, value: ((maxFont - minFont) * (logVal - minLog) / (maxLog - minLog)) + minFont};
            });
            this.loadingComplete();
            this.changeRef.markForCheck();
          });
    }
  }

}
