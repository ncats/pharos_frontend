import {
  ChangeDetectorRef,
  Component, forwardRef, Inject, Injector, OnDestroy, OnInit, Type, ViewChild,
  ViewEncapsulation
} from '@angular/core';

import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {Topic} from '../../../models/topic';
import {CustomContentDirective} from '../../../tools/custom-content.directive';
import {DataDetailsResolver} from '../../services/data-details.resolver';
import {ComponentInjectorService} from '../../../pharos-services/component-injector.service';
import {takeUntil} from 'rxjs/operators';
import {ComponentLookupService} from '../../../pharos-services/component-lookup.service';
import {DataConnectionService} from '../../../tools/visualizations/force-directed-graph/services/connection/data-connection.service';
import {GraphDataService} from '../../../tools/visualizations/force-directed-graph/services/graph-data.service';
import {NodeService} from '../../../tools/visualizations/force-directed-graph/services/event-tracking/node.service';
import {LigandDetailsComponent} from '../ligand-details/ligand-details.component';
import {Ligand} from '../../../models/ligand';
import {HttpClient} from '@angular/common/http';
import {Target} from '../../../models/target';
import {Disease} from '../../../models/disease';
import {from, Observable, of} from 'rxjs/index';
import {EnvironmentVariablesService} from '../../../pharos-services/environment-variables.service';
import {PageData} from '../../../models/page-data';
import {map, zipAll} from 'rxjs/operators';
import {MatTabChangeEvent} from '@angular/material';
import {TableData} from '../../../models/table-data';
import {Property} from '../../../models/property';
import {Node} from "../../../tools/visualizations/force-directed-graph/models/node";
import {Link} from "../../../tools/visualizations/force-directed-graph/models/link";
import {LinkService} from "../../../tools/visualizations/force-directed-graph/services/event-tracking/link.service";

interface TopicData{
  target: Target;
  data: any;
}

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
  nodes: Node[] = [];
  links: Link[] = [];
  _apiUrl: string;
  targetsMap: Map<string, Target[]> = new Map<string, Target[]>();
  diseasesMap: Map<string, any[]> = new Map<string, any[]>();
  ligandsMap: Map<string, any[]> = new Map<string, any[]>();
  displayTargets: any = {};
  targetPageData: PageData;
  ligandPageData: PageData;
  diseasePageData: PageData;
  diseaseLabel: string;

  diseaseFields: TableData[] = [
    new TableData({
      name: 'disease',
      label: 'Disease',
    }),
    new TableData({
      name: 'targets',
      label: 'Associated Targets'
    })
  ];

  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;


  constructor(private _injector: Injector,
              private http: HttpClient,
              private environmentVariablesService: EnvironmentVariablesService,
              private nodeService: NodeService,
              private linkService: LinkService,
              @Inject(forwardRef(() => ComponentLookupService)) private componentLookupService,
              private dataDetailsResolver: DataDetailsResolver,
              private ref: ChangeDetectorRef,
              private componentInjectorService: ComponentInjectorService) {
    super();
    this._apiUrl = this.environmentVariablesService.getApiPath();
  }

  ngOnInit() {
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
              this.allTargets = this.data.topicTargets.content;
              this.mapTargets();
            } else {
              if(this.topic.targetList){
                const targetsObserv: any = this.topic.targetList.map(target => {
                const url = `${this._apiUrl}targets/${target}`;
                return this.getData(url);
              });

              const zipped: Observable<any> = from(targetsObserv).pipe(zipAll());

              zipped.subscribe(res => {
                this.allTargets = [].concat(...res);
                this.mapTargets();
              });
            }
          }
          });
      });
    }

    if (this.data.object.url) {
      this.dataDetailsResolver.getDetailsByUrl(this._apiUrl.concat(this.data.object.url), 'topicTargets');
    }
  }

  getData(url: string) {
    return this.http.get<any[]>(url);
  }

  mapTargets() {
    this.targetPageData = new PageData({
      top: 10,
      skip: 0,
      count: 10,
      total: this.allTargets.length
    });

    this.allTargets.map(target => {
      const targets = this.targetsMap.get(target.idgTDL);
      if (targets) {
        targets.push(target);
        this.targetsMap.set(target.idgTDL, targets);
      } else {
        this.targetsMap.set(target.idgTDL, [target]);
      }
    });

// todo: this is technically the highest/lowest knowledge of highest/lowest level, not across the whole spectrum
    const highestLevel = this.getHighestLevel();
    const mostPotential = this.getHighestLevel(true);
    const lowestLevel = this.getLowestLevel();
const mostKnowledgeTarget = this.targetsMap.get(highestLevel)? this.targetsMap.get(highestLevel).sort((a, b) => b.knowledgeAvailability - a.knowledgeAvailability)[0] : {};
const mostPotentialTarget = this.targetsMap.get(mostPotential)? this.targetsMap.get(mostPotential).sort((a, b) => b.knowledgeAvailability - a.knowledgeAvailability)[0] : {};
const mostPotentialDarkestTarget = this.targetsMap.get(lowestLevel)? this.targetsMap.get(lowestLevel).sort((a, b) => b.knowledgeAvailability - a.knowledgeAvailability)[0] : {};
const leastKnowledgeTarget = this.targetsMap.get(lowestLevel)? this.targetsMap.get(lowestLevel).sort((a, b) => a.knowledgeAvailability - b.knowledgeAvailability)[0] : {};

      this.displayTargets.mostKnowledge = this.topic.displayTargets && this.topic.displayTargets.mostKnowledge ?
        this.findTarget(this.topic.displayTargets.mostKnowledge) : mostKnowledgeTarget;

      this.displayTargets.mostPotential = this.topic.displayTargets && this.topic.displayTargets.mostPotential ?
        this.findTarget(this.topic.displayTargets.mostPotential) : mostPotentialTarget;

      this.displayTargets.mostPotentialDarkest = this.topic.displayTargets &&
      this.topic.displayTargets.mostPotentialDarkest ?
        this.findTarget(this.topic.displayTargets.mostPotentialDarkest) : mostPotentialDarkestTarget;
      this.displayTargets.leastKnowledge = this.topic.displayTargets &&
      this.topic.displayTargets.leastKnowledge ?
        this.findTarget(this.topic.displayTargets.leastKnowledge) : leastKnowledgeTarget;

    const tdark = this.targetsMap.get('Tdark') ? this.targetsMap.get('Tdark') : [];
    const tbio = this.targetsMap.get('Tbio') ? this.targetsMap.get('Tbio') : [];
    const tchem = this.targetsMap.get('Tchem') ? this.targetsMap.get('Tchem') : [];
    const tclin = this.targetsMap.get('Tclin') ? this.targetsMap.get('Tclin') : [];

    const sortedTopics = tdark.sort((a, b) => b.knowledgeAvailability - a.knowledgeAvailability)
      .concat(tbio.sort((a, b) => b.knowledgeAvailability - a.knowledgeAvailability))
      .concat( tchem.sort((a, b) => b.knowledgeAvailability - a.knowledgeAvailability))
      .concat( tclin.sort((a, b) => b.knowledgeAvailability - a.knowledgeAvailability));
   this.allTargets = sortedTopics;
    this.targets = this.allTargets.slice(this.targetPageData.skip, this.targetPageData.top);
      this.targetPageData.count = this.allTargets.length;
  }

  findTarget(id: string): Target {
    const allTargets = [].concat(...Array.from(this.targetsMap.values()));
    return allTargets.filter(target => target.gene === id)[0];
}


  mapLigands() {
    this.ligandsMap.clear();
    const tchem = this.targetsMap.get('Tchem');
    const tclin = this.targetsMap.get('Tclin');

    const targetLigands = (tchem ? tchem : []).concat(tclin ? tclin : []);
    const nodes: Node[] = [];
    const links: Link[] = [];
    from(targetLigands.map(target => {
      const url = `${this._apiUrl}targets/${target.id}/links(kind=ix.idg.models.Ligand)`;
      const topicData: TopicData = {target: target, data: this.getData(url)};
      return topicData;
    })).pipe(
      map(res => {
        return res.data.pipe(
          map(response => {
            const data : TopicData = {target: res.target as Target, data: response};
              const start = this.nodeService.makeNode(data.target.id.toString(), {properties: data.target});
              data.data.map(ligand => {
                const end = this.nodeService.makeNode(ligand.id, {properties: ligand});
                nodes.push(...[start, end]);
                const link: Link = this.linkService.makeLink(start.id + end.id, start, end);
                links.push(link);
                this.nodeService.setNode(start);
                this.nodeService.setNode(end);
                this.linkService.setLink(link);
                ligand.target = data.target;
              });
            return response;
     //   });
          }))
      }),
      zipAll()
    ).subscribe(res => {
      console.log(res);
/*
      res.map(apiCall => {
        const td: TopicData = apiCall;
      //  return td.
          return apiCall;
        });*/
    //    });

      this.allLigands = [].concat(...res);
      this.ligandPageData = new PageData({
        top: 20,
        skip: 0,
        count: 20,
        total: this.allLigands.length
      });
      this.ligands = this.allLigands.slice(this.ligandPageData.skip, this.ligandPageData.top);
      this.nodes = nodes;
      this.links = links;
      this.loading = false;
      console.log(this);
      console.log("loading done?");
    })
  }

  mapDiseases() {
/*    this.diseasesMap.clear();
    from(this.allTargets.map(target => {
      const url = `${this._apiUrl}targets/${target.id}/links(kind=ix.idg.models.Disease)`;
      return [target, this.getData(url)];
    })).pipe(
      map(res => {
        return res[1].pipe(
          map(response => {
            if (response.length > 0) {
              const filtered = response.filter(disease => {
                const sources = disease.properties.filter(prop => prop.label === 'Data Source').map(lab => lab['term']);
                return sources.includes('Monarch' || 'DrugCentral Indication');
              });
              filtered.map(realDisease => {
                const diseaseName = realDisease.properties.filter(prop => prop.label === 'IDG Disease')[0].term;
                const mappedDisease = this.diseasesMap.get(diseaseName);
                if (mappedDisease) {
                  mappedDisease.push(
                   new Property(
                        {
                          term: res[0].name,
                          internalHref: `/idg/topics/${res[0].accession}`
                        })
                    );
                  this.diseasesMap.set(diseaseName, mappedDisease);
                } else {
                  const newDiseaseMap = [
                    new Property(
                      {
                        term: res[0].name,
                        internalHref: `/idg/topics/${res[0].accession}`
                      })
                  ];
                  this.diseasesMap.set(diseaseName, newDiseaseMap);
                }
              });
            }

            return {target: res[0], data: response};
          })
        )
      }),
      zipAll()
    ).subscribe(res => {
      this.allDiseases = [];
      this.diseasesMap.forEach((value, key) => {
        this.allDiseases.push({
          disease: new Property({term: key}),
          targets: value
        })
      });
      this.loading = false;
    });*/
  }

  paginateTargets($event) {
    this.targets = this.allTargets.slice($event.pageIndex * $event.pageSize, ($event.pageIndex + 1) * $event.pageSize);
  }

  paginateLigands($event) {
    this.ligands = this.allLigands.slice($event.pageIndex * $event.pageSize, ($event.pageIndex + 1) * $event.pageSize);
  }

  getHighestLevel(potential?: boolean): string {
    const levels = Array.from(this.targetsMap.keys());
    if(levels.length === 1) {
      return levels[0];
    }

    if (!potential && levels.includes('Tclin')) {
      return 'Tclin';
    } else if (!potential && levels.includes('Tchem')) {
      return 'Tchem';
    } else if (levels.includes('Tbio')) {
      return 'Tbio';
    } else if (levels.includes('Tdark')) {
      return 'Tdark';
    }
  }

  getLowestLevel(potential?: boolean): string {
    const levels = Array.from(this.targetsMap.keys());
    if(levels.length === 1) {
      return levels[0];
    }
    if (levels.includes('Tdark')) {
      return 'Tdark';
    } else if (levels.includes('Tbio')) {
      return 'Tbio';
    } else if (levels.includes('Tclin')) {
      return 'Tclin';
    } else if (levels.includes('Tchem')){
      return 'Tchem';
    }
  }

  changeTab($event: MatTabChangeEvent) {
    if ($event.tab.textLabel.split(' ')[0] === 'Ligands') {
      this.loading = true;
      if (this.ligands.length === 0) {
        this.mapLigands();
      } else {
        this.ligands = this.allLigands.slice(0, 20);
        this.loading = false;
      }
    }
    if ($event.tab.textLabel.split(' ')[0] === 'Diseases') {
      this.loading = true;
      if (this.allDiseases.length === 0) {
        this.mapDiseases();
      }
      else{
        this.loading = false;
      }
    }
    if($event.tab.textLabel ==='Graph'){
      if (this.ligands.length === 0) {
        this.mapLigands();
      }
      if (this.allDiseases.length === 0) {
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
