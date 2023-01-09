import {Component, ElementRef, OnChanges, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {PharosApiService} from "../../pharos-services/pharos-api.service";
import {LocalStorageService} from "../../pharos-services/local-storage.service";
import {HttpClient} from "@angular/common/http";
import {PredictionsPanelComponent} from "../../tools/predictions-panel/predictions-panel.component";
import {CentralStorageService} from "../../pharos-services/central-storage.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'pharos-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit {
  @ViewChild('predictionsPanel', {static: false}) predictionsPanel: PredictionsPanelComponent;
  workingAPI = "";
  isProduction = environment.production;
  api = "";
  callApi = "";
  aliases: any[] = [];
  rawAPIdata: any;
  pharosAPIdata: any;
  builtinMap: Map<string, any[]> = new Map<string, any[]>();
  sortedKeys: string[] = ['target','disease','ligand'];

  constructor(private pharosApiService: PharosApiService,
              private centralStorageService: CentralStorageService,
              private localStorageService: LocalStorageService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.workingAPI = this.localStorageService.store.getItem('workingAPI');
    if (this.workingAPI && this.workingAPI.length > 0) {
      this.api = this.workingAPI;
    }
    this.centralStorageService.toolboxDetailsPage = '';
    this.pharosApiService.adHocQuery(this.pharosApiService.getAPIs).toPromise().then((res: any) => {
      this.sortedKeys.forEach(model => {
        this.builtinMap.set(model, []);
      })
      res.data.communityAPIs.forEach(api => {
        const list = this.builtinMap.get(api.model);
        list.push(api);
      });
    });
  }

  currentDetailsPage = null;
  selectedAPI: any = null;

  selectAPI(event) {
    this.api = event.url;
    this.getAPI();
  }
  apiChanged(event) {
    this.localStorageService.store.setItem('workingAPI', this.api);
    this.workingAPI = this.api;
    this.selectedAPI = null;
    this.getAPI();
  }

  setApi(api) {
    this.api = api;
    this.selectedAPI = null;
    this.getAPI();
  }

  detailsPageSelected(details) {
    if (details && details.extra) {
      this.currentDetailsPage = {path: details.extra.path, id: details.extra.reference_id};
      this.centralStorageService.toolboxDetailsPage = this.currentDetailsPage.id;
      this.getAPI();
    }
  }

  apiResults = null;

  getColor(api) {
    if (this.api === api) {
      return 'accent';
    }
    return 'primary';
  }

  getAPI() {
    if (this.currentDetailsPage) {
      const variables = {
        url: this.api,
        pageInfo: this.currentDetailsPage
      };
      this.aliases = [];
      this.callApi = "";
      this.rawAPIdata = "";
      this.pharosAPIdata = "";
      return this.pharosApiService.adHocQuery(this.pharosApiService.GetAPIMetadataQuery, variables).toPromise().then((res: any) => {
        if (res.data.getAPIMetadata) {
          const details = res.data.getAPIMetadata.details;
          for(let field in details) {
            this.aliases.push(`{${field}} => ${details[field]}`);
          }
          this.callApi = res.data.getAPIMetadata.url;
          if (this.callApi) {
            const clientQuery = this.http.get<string>(this.callApi).toPromise();
            const serverQuery = this.pharosApiService.adHocQuery(this.pharosApiService.GetAPIResultsQuery, variables).toPromise();
            return Promise.allSettled([clientQuery, serverQuery]).then((results: any[]) => {
              this.rawAPIdata = this.parseSettledResults(results[0]);
              this.pharosAPIdata = this.parseSettledResults(results[1]).data?.getAPIResults;
              if (this.rawAPIdata && !this.pharosAPIdata) { // hosting API on localhost for testing won't work when the backend is remote, so we do this call to parse the data
                return this.pharosApiService.adHocQuery(
                  this.pharosApiService.ParseLocalResultsQuery, { localResults: this.rawAPIdata }).toPromise()
                  .then(res => {
                    this.pharosAPIdata = res.data.parseAPIResults;
                  });
              }
            });
          }
        }
      });
    }
  }

  get pharosAPIdataForPanel() {
    return this.pharosAPIdata[0];
  }
  parseSettledResults(result) {
    if (result.status === 'fulfilled') {
      return result.value;
    }
    if (result.status === 'rejected') {
      return result.reason.message;
    }
    return result;
  }
}
