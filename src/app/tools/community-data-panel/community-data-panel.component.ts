import {ChangeDetectorRef, Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {DynamicPanelComponent} from "../dynamic-panel/dynamic-panel.component";
import {DynamicServicesService} from "../../pharos-services/dynamic-services.service";
import {ActivatedRoute} from "@angular/router";
import {PharosApiService} from "../../pharos-services/pharos-api.service";
import {isPlatformServer} from "@angular/common";

@Component({
  selector: 'pharos-community-data-panel',
  templateUrl: './community-data-panel.component.html',
  styleUrls: ['./community-data-panel.component.scss']
})
export class CommunityDataPanelComponent extends DynamicPanelComponent implements OnInit {
  @Input() apis: any[] = [];
  @Input() section: string = '';
  @Input() showManual = false;
  results = [];
  communityAPIs = [];

  constructor(
    @Inject(PLATFORM_ID) private platformID: any,
    private _route: ActivatedRoute,
    private pharosApiService: PharosApiService,
    private changeRef: ChangeDetectorRef,
    public dynamicServices: DynamicServicesService) {
    super(dynamicServices);
  }

  ngOnInit(): void {
    if(isPlatformServer(this.platformID)) {
      return;
    }
    const manualAPIs = this._route.snapshot.queryParamMap.get("apis")?.split("|") || [];
    this.communityAPIs = this.apis.filter(a => {
      if (!a.default && !manualAPIs.includes(a.code)) return false;
      return a.related_section === this.section;
    });
    if (this.showManual) {
      manualAPIs.forEach(code => {
        if (code.length > 4) {
          this.communityAPIs.push({
            section: "API from URL",
            code: code
          });
        }
      });
    }
    const variables = {
      apiCode: this.communityAPIs.map(c => c.code),
      name: this._route.snapshot.paramMap.get('id'),
    }
    this.pharosApiService.adHocQuery(this.pharosApiService.GetPredictions(this._route.snapshot.data.path), variables)
      .toPromise().then(res => {
      this.results = res.data.model.communityData;
      this.loadingComplete();
      this.changeRef.markForCheck();
    }, (error) => {
      alert(error);
    });
  }

}
