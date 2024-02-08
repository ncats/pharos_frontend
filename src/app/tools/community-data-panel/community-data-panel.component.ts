import {ChangeDetectorRef, Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {DynamicPanelComponent} from "../dynamic-panel/dynamic-panel.component";
import {DynamicServicesService} from "../../pharos-services/dynamic-services.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {PharosApiService} from "../../pharos-services/pharos-api.service";
import {isPlatformServer} from "@angular/common";
import {PharosConfig} from "../../../config/pharos-config";
import {takeUntil} from "rxjs/operators";
import {CentralStorageService} from "../../pharos-services/central-storage.service";
import {environment} from "../../../environments/environment";
import {MatCard, MatCardModule} from '@angular/material/card';
import {ComponentHeaderComponent} from '../component-header/component-header.component';
import {PredictionsPanelComponent} from '../predictions-panel/predictions-panel.component';

@Component({
  standalone: true,
  imports: [
    MatCardModule,
    ComponentHeaderComponent,
    PredictionsPanelComponent
  ],
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
  isProduction = environment.production;

  citations(index) {
    if (this.results && this.results?.length > 0) {
      const refs = []
      const res = this.results[index];
      if (res && res.length > 0) {
        res.forEach(set => {
          if (set.citation) {
            refs.push(set.citation);
          }
        });
      }
      return refs;
    }
  }

  constructor(
    @Inject(PLATFORM_ID) private platformID: any,
    private _route: ActivatedRoute,
    private pharosApiService: PharosApiService,
    private changeRef: ChangeDetectorRef,
    private pharosConfig: PharosConfig,
    private router: Router,
    public dynamicServices: DynamicServicesService,
    private centralStorageService: CentralStorageService) {
    super(dynamicServices);
  }

  initialize() {
    const manualAPIs = this._route.snapshot.queryParamMap.get("apis")?.split("|") || [];
    this.communityAPIs = this.apis.filter(a => {
      if (!a.default && !manualAPIs.includes(a.code)) return false;
      return a.related_section === this.section;
    });
    if (this.showManual) {
      manualAPIs.forEach(code => {
        if (code.length > 4) {
          if (!this.isProduction) {
            this.communityAPIs.push({
              section: "API from URL",
              code: code
            });
          } else {
            alert (`You tried to request data from an external API (${code}).\n\nEncorporating data via a URL is disabled in the Production environment.\n\nYou must register your API with the Pharos team, and use the four character code that they give you to share your data through Pharos.`)
          }
        }
      });
    }

    this.communityAPIs.forEach(api => {
      const variables = {
        apiCode: [api.code],
        name: this._route.snapshot.paramMap.get('id'),
      }
      this.addComponent(api);
      this.pharosApiService.adHocQuery(this.pharosApiService.GetPredictions(this._route.snapshot.data.path), variables)
        .toPromise().then(res => {
        const results = res.data.model.communityData;
        this.results.push(results[0]);
        results.forEach((result) => {
          if (result && result.length > 0 && result[0].predictions && result[0].predictions.length > 0) {
            this.centralStorageService.showVisible(api.code);
          } else {
            this.centralStorageService.hideVisible(api.code);
          }
        });
        this.loadingComplete();
        this.changeRef.detectChanges();
      }, (error) => {
        alert(error);
      });

    });
  }

  ngOnInit(): void {
    if(isPlatformServer(this.platformID)) {
      return;
    }
    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          this.initialize();
          this.results = [];
        }
      });
    this.initialize();
  }

  addComponent(communityAPI: any) {
    const newone = {
      token: communityAPI.code,
      section: 'contentPortalOutlet',
      browserOnly: true,
      externalComponent: true,
      navHeader: {
        mainDescription: communityAPI.description,
        prediction: true,
        section: communityAPI.code,
        label: communityAPI.section
      },
      api: [
        {
          description: communityAPI.url,
          field: 'url',
          label: 'API format'
        }]
    };
    this.centralStorageService.addVisibleCommunityAPI(communityAPI);

    this.centralStorageService.sourcesMap.set(newone.navHeader.section, {
      sources: newone.api,
      title: newone.navHeader.label,
      mainDescription: newone.navHeader.mainDescription || null,
      mainSource: communityAPI.link ? [communityAPI.link] : null
    });
  }
}
