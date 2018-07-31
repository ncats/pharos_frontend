import {
  ChangeDetectorRef,
  Component, forwardRef, Inject, Injector, OnDestroy, OnInit, Type, ViewChild,
  ViewEncapsulation
} from '@angular/core';

import {DynamicPanelComponent} from "../../../tools/dynamic-panel/dynamic-panel.component";
import {Topic} from "../../../models/topic";
import {CustomContentDirective} from "../../../tools/custom-content.directive";
import {DataDetailsResolver} from "../../services/data-details.resolver";
import {ComponentInjectorService} from "../../../pharos-services/component-injector.service";
import {takeUntil} from "rxjs/operators";
import {ComponentLookupService} from "../../../pharos-services/component-lookup.service";
import {DataConnectionService} from "../../../tools/visualizations/force-directed-graph/services/connection/data-connection.service";
import {GraphDataService} from "../../../tools/visualizations/force-directed-graph/services/graph-data.service";
import {NodeService} from "../../../tools/visualizations/force-directed-graph/services/event-tracking/node.service";
import {LigandDetailsComponent} from "../ligand-details/ligand-details.component";
import {Ligand} from "../../../models/ligand";
import {HttpClient} from "@angular/common/http";
import {Target} from "../../../models/target";
import {Disease} from "../../../models/disease";
import {combineLatest, concat, forkJoin, from, merge, Observable, of, zip} from "rxjs/index";
import {map} from "rxjs/operators";
import {concatAll} from "rxjs/operators";
import {combineAll, mergeAll} from "rxjs/operators";
import {concatMap} from "rxjs/operators";
import {EnvironmentVariablesService} from "../../../pharos-services/environment-variables.service";
import {PageData} from "../../../models/page-data";
import {take, zipAll} from "rxjs/operators";
import {MatTabChangeEvent} from "@angular/material";
import {TableData} from "../../../models/table-data";
import {Property} from "../../../models/property";
import {mergeMap} from "rxjs/operators";


@Component({
  selector: 'pharos-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopicDetailsComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  path: string;
  topic: Topic;
  allTargets: Target[] = [];
  targets: Target[] = [];
  ligands: Ligand[] = [];
  allLigands: Ligand[] = [];
  diseases: any[] = [];
  allDiseases: any[] = [];
  nodes: any[] = [];
  _apiUrl: string;
  targetsMap: Map<string, Target[]> = new Map<string, Target[]>();
  diseasesMap: Map<string, any[]> = new Map<string, any[]>();
  displayTargets: any = {};
  targetPageData: PageData;
  ligandPageData: PageData;
  diseasePageData: PageData;
  diseaseLabel: string;

  diseaseFields: TableData[] =[
    new TableData({
      name: 'disease',
      label: '',
      width: 100
    })
  ];

  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;


  constructor(private _injector: Injector,
              private http: HttpClient,
              private environmentVariablesService: EnvironmentVariablesService,
              @Inject(forwardRef(() => ComponentLookupService)) private componentLookupService,
              private dataDetailsResolver: DataDetailsResolver,
              private ref: ChangeDetectorRef,
              private componentInjectorService: ComponentInjectorService) {
    super();
    this._apiUrl = this.environmentVariablesService.getApiPath();
  }

  ngOnInit() {
    console.log(this);
    this.topic = this.data.object;
    this.targetsMap.clear();
    const components: any = this.componentLookupService.lookupByPath(this.path, 'panels');
    if (components) {
      components.forEach(component => {
        // start api calls before making component
        const keys: string[] = [];
        if (component.api) {
          component.api.forEach(apiCall => {
            if (apiCall.url.length > 0) {
              const url = apiCall.url.replace('_id_', this.topic.id);
              /**this call is pushed up to the pharos api and changes are subscribed to in the generic details page, then set here*/
              this.dataDetailsResolver.getDetailsByUrl(url, apiCall.field);

              /** this will be used to track the object fields to get */
              keys.push(apiCall.field);
            }
          });
        }
        /** make component */
        const dynamicChildToken: Type<any> = this.componentInjectorService.getComponentToken(component.token);
        const childComponent: any = this.componentInjectorService.appendComponent(this.componentHost, dynamicChildToken);

        childComponent.instance.topic = this.topic;
        this._data
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(res => {
            if (res.object && res.topicTargets) {
              this.ngUnsubscribe.next();
              childComponent.instance.data = res.object;
              this.mapTargets();
            } else {
            }
          });
      });
    }

    if (this.data.object.url) {
      console.log("getting targets");
      this.dataDetailsResolver.getDetailsByUrl(this._apiUrl.concat(this.data.object.url), 'topicTargets')
    }
  }

  getData(url: string) {
    return this.http.get<any[]>(url);
  }

  mapTargets() {
    this.allTargets = this.data.topicTargets.content;
    this.data.topicTargets.content.map(target => {
      const targets = this.targetsMap.get(target.idgTDL);
      if (targets) {
        targets.push(target);
        this.targetsMap.set(target.idgTDL, targets)
      }
      else {
        this.targetsMap.set(target.idgTDL, [target]);
      }
    });

// todo: this is technically the highest/lowest knowledge of highest/lowest level, not across the whole spectrum
    const highestLevel = this.getHighestLevel();
    const mostPotential = this.getHighestLevel(true);
    const lowestLevel = this.getLowestLevel();

    if(this.topic.displayTargets){
      console.log(this.topic.displayTargets);
      this.displayTargets.mostKnowledge = this.topic.displayTargets.mostKnowledge ? this.findTarget(this.topic.displayTargets.mostKnowledge) : this.targetsMap.get(highestLevel).sort((a, b) => b.knowledgeAvailability - a.knowledgeAvailability)[0];
      this.displayTargets.mostPotential = this.topic.displayTargets.mostPotential ? this.findTarget(this.topic.displayTargets.mostPotential) : this.targetsMap.get(mostPotential).sort((a, b) => b.knowledgeAvailability - a.knowledgeAvailability)[0];
      this.displayTargets.mostPotentialDarkest = this.topic.displayTargets.mostPotentialDarkest ? this.findTarget(this.topic.displayTargets.mostPotentialDarkest) : this.targetsMap.get(lowestLevel).sort((a, b) => b.knowledgeAvailability - a.knowledgeAvailability)[0];
      this.displayTargets.leastKnowledge = this.topic.displayTargets.leastKnowledge ? this.findTarget(this.topic.displayTargets.leastKnowledge) : this.targetsMap.get(lowestLevel).sort((a, b) => a.knowledgeAvailability - b.knowledgeAvailability)[0];
      this.ref.detectChanges();
    } else {
      this.displayTargets = {
        mostKnowledge: this.targetsMap.get(highestLevel).sort((a, b) => b.knowledgeAvailability - a.knowledgeAvailability)[0],
        mostPotential: this.targetsMap.get(mostPotential).sort((a, b) => b.knowledgeAvailability - a.knowledgeAvailability)[0],
        mostPotentialDarkest: this.targetsMap.get(lowestLevel).sort((a, b) => b.knowledgeAvailability - a.knowledgeAvailability)[0],
        leastKnowledge: this.targetsMap.get(lowestLevel).sort((a, b) => a.knowledgeAvailability - b.knowledgeAvailability)[0]
      }
    }
    let pd = new PageData(this.data.topicTargets);
    pd.top = 10;
    this.targetPageData = pd;
    this.targets = this.data.topicTargets.content.slice(this.targetPageData.skip, this.targetPageData.top);
  }

  findTarget(id: string): Target {
    const allTargets = [].concat(...Array.from(this.targetsMap.values()));
    return allTargets.filter(target => target.gene === id)[0];
}

  mapLigands() {
    console.log("getting ligands");

    this.ligandPageData = new PageData({
      top: 10,
      skip: 0,
      count: 10
    });

    const tchem = this.targetsMap.get('Tchem');
    const tclin = this.targetsMap.get('Tclin');

    const targetLigands = (tchem ? tchem : []).concat(tclin ? tclin : []);

    const ligandsObserv: any = targetLigands.map(target => {
      const url = `${this._apiUrl}targets/${target.id}/links(kind=ix.idg.models.Ligand)`;
      return this.getData(url);
    });

    const zipped: Observable<any> = from(ligandsObserv).pipe(zipAll());

    zipped.subscribe(res => {
      console.log("zipp subscription");
      console.log(res);
      this.allLigands = [].concat(...res);
      console.log(this.allLigands);
      this.ligandPageData.total = this.allLigands.length;
      console.log(this.ligandPageData);
      this.ligands = this.allLigands.slice(this.ligandPageData.skip, this.ligandPageData.top);
      this.loading = false;
    })

    /* merged.subscribe(res => {
       console.log(res);
       this.allLigands = this.allLigands.concat(res);
     });
     console.log(this);*/
  }

  mapDiseases(){

    this.diseasePageData = new PageData({
      top: 10,
      skip: 0,
      count: 10
    });

    from(this.allTargets.map(target => {
        const url = `${this._apiUrl}targets/${target.id}/links(kind=ix.idg.models.Disease)`;
      this.getData(url).subscribe(res => {
        if (res.length > 0) {
          const filtered = res.filter(disease => {
            const sources = disease.properties.filter(prop => prop.label === 'Data Source').map(lab => lab['term']);
            return sources.includes('Monarch' || 'DrugCentral Indication');
          })
          filtered.map(realDisease => {
            const diseaseName = realDisease.properties.filter(prop => prop.label === 'IDG Disease')[0].term;
            const mappedDisease = this.diseasesMap.get(diseaseName);
            if (mappedDisease) {
              mappedDisease.push(
                {
                  target: new Property(
                    {
                      term: target.name,
                      href: target.accession
                    })
                });
              this.diseasesMap.set(diseaseName, mappedDisease);
            } else {
               const newDiseaseMap =  [{
                  target: new Property(
                    {
                      term: target.name,
                      href: target.accession
                    })
                }]
              this.diseasesMap.set(diseaseName, newDiseaseMap);
            }
          })
        }
        console.log('setting all diseases');
        //this.allDiseases = Array.from(this.diseasesMap.keys()).map(disease => {new Property({term: disease});
        console.log(res);
      });
    }
  ))



   /* const diseaseObserv: any = this.allTargets.map(target => {
      const url = `${this._apiUrl}targets/${target.id}/links(kind=ix.idg.models.Disease)`;
      return this.getData(url);
    });

    const zipped: Observable<any> = from(diseaseObserv).pipe(zipAll());

    zipped.subscribe(res => {
      console.log(res);
      this.allDiseases = [].concat(...res);
      const filteredDiseases = this.allDiseases.filter(disease => {
        const sources = disease.properties.filter(prop => prop.label === 'Data Source').map(lab => lab['term']);
        return sources.includes('Monarch'|| 'DrugCentral Indication');
      })
      console.log(filteredDiseases);
      this.allDiseases = filteredDiseases.map(realDisease => {
        return {
          disease : new Property(realDisease.properties.filter(prop => prop.label ==='IDG Disease')[0])}
      });
      //  this.diseasePageData.total = this.allDiseases.length;
      //  this.diseases = this.allDiseases.slice(this.diseasePageData.skip, this.diseasePageData.top);
      this.diseaseLabel = `Diseases (${this.allDiseases.length})`;
      console.log(this);
   */   this.loading = false;

      /*
       console.log(this.allLigands);
       this.ligandPageData.total = this.allLigands.length;
       console.log(this.ligandPageData);
       this.loading = false;*/
    //})


  }

  paginateTargets($event) {
    console.log($event);
    this.targets = this.allTargets.slice($event.pageIndex * $event.pageSize, ($event.pageIndex + 1) * $event.pageSize)
  }

  paginateLigands($event) {
    console.log($event);
    this.ligands = this.allLigands.slice($event.pageIndex * $event.pageSize, ($event.pageIndex + 1) * $event.pageSize)
  }

  paginateDiseases($event) {
    console.log($event);
    this.diseases = this.allDiseases.slice($event.pageIndex * $event.pageSize, ($event.pageIndex + 1) * $event.pageSize)
  }

  getHighestLevel(potential?: boolean): string {
    console.log(this.targetsMap);
    const levels = Array.from(this.targetsMap.keys());
    if (!potential && levels.includes('Tclin')) {
      return 'Tclin';
    } else if (!potential && levels.includes('Tchem')) {
      return 'Tchem';
    } else if (levels.includes('Tbio')) {
      return 'Tbio';
    } else {
      return 'Tdark';
    }
  }

  getLowestLevel(potential?: boolean): string {
    const levels = Array.from(this.targetsMap.keys());
    if (levels.includes('Tdark')) {
      return 'Tdark';
    } else if (levels.includes('Tbio')) {
      return 'Tbio';
    } else if (levels.includes('Tclin')) {
      return 'Tclin';
    } else {
      return 'Tbio';
    }
  }

  changeTab($event: MatTabChangeEvent) {
    console.log($event)
    console.log($event.tab.textLabel);
    if ($event.tab.textLabel === 'Ligands') {
      this.loading = true;
      if (this.ligands.length === 0) {
        this.mapLigands();
      }
      this.ligands = this.allLigands.slice(0, 10)
    }
    if ($event.tab.textLabel === 'Diseases') {
      this.loading = true;
      if (this.diseases.length === 0) {
        this.mapDiseases();
      }
    }
  }

  pick(o, props): any {
    return Object.assign({}, ...props.map(prop => ({[prop]: o[prop]})));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.topic = undefined;
    this.targetsMap.clear();
  }

}
