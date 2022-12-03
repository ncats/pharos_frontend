import {Component, ElementRef, OnChanges, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {PharosApiService} from "../../pharos-services/pharos-api.service";
import {LocalStorageService} from "../../pharos-services/local-storage.service";
import {HttpClient} from "@angular/common/http";
import {PredictionsPanelComponent} from "../../tools/predictions-panel/predictions-panel.component";
import {CentralStorageService} from "../../pharos-services/central-storage.service";

@Component({
  selector: 'pharos-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit {
  @ViewChild('predictionsPanel', {static: false}) predictionsPanel: PredictionsPanelComponent;
  workingAPI = "";
  kinaseCancerAPI = "https://16z877ei3f.execute-api.us-east-1.amazonaws.com/default/pharos-kinase-cancer-prediction?target={sym}"
  testAPI = "https://us-east4-ncatsidg-dev.cloudfunctions.net/pharos-test-api?target={sym}"
  api = "";
  callApi = "";
  aliases: any[] = [];
  rawAPIdata: any;
  pharosAPIdata: any;

  constructor(private pharosApiService: PharosApiService,
              private centralStorageService: CentralStorageService,
              private localStorageService: LocalStorageService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.workingAPI = this.localStorageService.store.getItem('workingAPI');
    this.centralStorageService.toolboxDetailsPage = '';
    // this.predictionsPanel.field = 'Toolbox Predictions';
    // this.predictionsPanel.label = 'Toolbox Predictions';
  }

  currentDetailsPage = null;

  apiChanged(event) {
    if (this.api !== this.testAPI && this.api !== this.kinaseCancerAPI) {
      this.localStorageService.store.setItem('workingAPI', this.api);
      this.workingAPI = this.api;
    }
    this.getAPI();
  }

  setApi(api) {
    this.api = api;
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
    return {
      targets:
        {
          predictions: this.pharosAPIdata[0]
        }
      };
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
