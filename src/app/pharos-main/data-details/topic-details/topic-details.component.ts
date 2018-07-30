import {
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
  diseases: Disease[] = [];
  nodes: any[] = [];
  _apiUrl: string;
  targetsMap: Map<string, Target[]> = new Map<string, Target[]>();
  displayTargets: any;
  targetPageData: PageData;
  ligandPageData: PageData;

  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;


  constructor(private _injector: Injector,
              private http: HttpClient,
              private environmentVariablesService: EnvironmentVariablesService,
              @Inject(forwardRef(() => ComponentLookupService)) private componentLookupService,
              private dataDetailsResolver: DataDetailsResolver,
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
            console.log(res);
            if (res.object && res.topicTargets) {
              console.log("unsubscribe");
              this.ngUnsubscribe.next();
              console.log(res);
              childComponent.instance.data = res.object;
              this.mapTargets();
            } else {
              console.log("still waiting");
            }
          });
      });
    }

    if (this.data.object.url) {
      console.log("getting targets");
      this.dataDetailsResolver.getDetailsByUrl(this._apiUrl.concat(this.data.object.url), 'topicTargets')
    }
    if(this.data.object.targetList){
      from(this.data.object.targetList).pipe(
       // map(target =>  )
      )
    }
  }

  getData(url: string) {
    return this.http.get(url);
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
    this.displayTargets = {
      mostKnowledge: this.targetsMap.get(highestLevel).sort((a, b) => b.knowledgeAvailability - a.knowledgeAvailability)[0],
      mostPotential: this.targetsMap.get(mostPotential).sort((a, b) => b.knowledgeAvailability - a.knowledgeAvailability)[0],
      mostPotentialDarkest: this.targetsMap.get(lowestLevel).sort((a, b) => b.knowledgeAvailability - a.knowledgeAvailability)[0],
      leastKnowledge: this.targetsMap.get(lowestLevel).sort((a, b) => a.knowledgeAvailability - b.knowledgeAvailability)[0]
    }

    let pd = new PageData(this.data.topicTargets);
    pd.top = 10;
    this.targetPageData = pd;
    this.targets = this.data.topicTargets.content.slice(this.targetPageData.skip, this.targetPageData.top);
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

    /*const merged = from(ligandsObserv).pipe(
      takeUntil(this.ngUnsubscribe),
      mergeAll()
    )*/

    console.log(ligandsObserv);

    const zipped: Observable<any> = from(ligandsObserv).pipe(zipAll());
    console.log(zipped);

    zipped.subscribe(res => {
      console.log("zipp subscription");
      console.log(res);
      this.allLigands = [].concat(...res);
      this.ligandPageData.total = this.allLigands.length;
      this.ligands = this.allLigands.slice(this.ligandPageData.skip, this.ligandPageData.top);
    })

   /* merged.subscribe(res => {
      console.log(res);
      this.allLigands = this.allLigands.concat(res);
    });
    console.log(this);*/
  }

  paginateTargets($event) {
    console.log($event);
    this.targets = this.allTargets.slice($event.pageIndex * $event.pageSize, ($event.pageIndex + 1) * $event.pageSize)
  }

  paginateLigands($event) {
    console.log($event);
    this.ligands = this.allLigands.slice($event.pageIndex * $event.pageSize, ($event.pageIndex + 1) * $event.pageSize)
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

  changeTab($event: MatTabChangeEvent){
    console.log($event)
    console.log($event.tab.textLabel);
    if($event.tab.textLabel === 'Ligands') {
      if(this.ligands.length === 0) {
        this.mapLigands();
      }
      this.ligands = this.allLigands.slice(0, 10)
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
