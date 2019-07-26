import {ChangeDetectorRef, Component, Injector, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {PharosConfig} from '../../../../config/pharos-config';

import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {Topic} from '../../../models/topic';
import {CustomContentDirective} from '../../../tools/custom-content.directive';
import {DataDetailsResolver} from '../../resolvers/data-details.resolver';
import {ComponentInjectorService} from '../../../pharos-services/component-injector.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Target} from '../../../models/target';
import {PageData} from '../../../models/page-data';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {map} from 'rxjs/internal/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {GraphParserService} from './panels/topic-graph-panel/services/graph-parser.service';
import {LinkService, NodeService} from 'smrtgraph-core';
import {PharosNodeSerializer} from './panels/topic-graph-panel/models/topic-graph/pharos-node-serializer';


/**
 * data holder
 */
interface TopicData {
  /**
   * primary target
   */
  target: Target;
  /**
   * data
   */
  data: any;
}

/**
 * main topic details component, doesn't operate the same as targets or ligands, it is tab based
 */
@Component({
  selector: 'pharos-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss'],
  // providers: [NodeService, LinkService]
})
export class TopicDetailsComponent extends DynamicPanelComponent implements OnInit {
  /**
   * url path
   */
  path: string;

  /**
   * main topic
   */
  topic: any;

  /**
   * all targets to display
   */
  allTargets: Target[] = [];

  /**
   * chunked section of targets
   */
  targets: Target[] = [];

  /**
   * chunked section of ligands
   */
  ligands: any[] = [];

  /**
   * all ligands to display
   */
  allLigands: any[] = [];

  /**
   * chunk of diseases to display
   */
  diseases: any[] = [];

  /**
   * all diseases to display
   */
  allDiseases: any[] = [];


  /**
   * main api url
   */
  _apiUrl: string;

  /**
   * map of targets
   */
  targetsMap: Map<string, Target[]> = new Map<string, Target[]>();

  /**
   * map of diseases
   */
  diseasesMap: Map<string, any> = new Map<string, any>();

  /**
   * map of ligands
   */
  ligandsMap: Map<string, any> = new Map<string, any>();
  displayTargets: any = {};
  targetPageData: PageData;
  ligandPageData: PageData;
  diseasePageData: PageData;
  diseaseLabel: string;
  queries = [];


  /**
   * table fields to display for diseases
   */
  /*  diseaseFields: PharosProperty[] = [
      new PharosProperty({
        name: 'disease',
        label: 'Disease',
      }),
      new PharosProperty({
        name: 'targets',
        label: 'Associated Targets'
      })
    ];*/

  /**
   * conponent to hold graph
   */
  @ViewChild(CustomContentDirective, {static: true}) componentHost: CustomContentDirective;

  /**
   * set up dependencies
   * @param _injector
   * @param http
   * @param _route
   * @param router
   * @param pharosConfig
   * @param dataDetailsResolver
   * @param ref
   * @param componentInjectorService
   */
  constructor(private _injector: Injector,
              private http: HttpClient,
              private _route: ActivatedRoute,
              private router: Router,
              private pharosConfig: PharosConfig,
              private ref: ChangeDetectorRef,
              private db: AngularFirestore,
              private graphParser: GraphParserService,
              private componentInjectorService: ComponentInjectorService) {
    super();
    this._apiUrl = this.pharosConfig.getApiPath();
  }


  /**
   * initialize data change subsctiptions, fetch data
   */
  ngOnInit() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
      })
    };
console.log(this);
this.graphParser.setSerializers({node: new PharosNodeSerializer()});
    this._route.snapshot.data.pharosObject.subscribe(res => {
      this.topic = res.data();
      this.graphParser.setId(this.topic.id); /*.subscribe(res => {
        console.log(res);
      });*/
      this.allTargets = this.topic.allTargets;
/*      this.topic.map(entry => {
        if(entry.graphData.ligands) {
          entry.graphData.ligands.forEach(ligand => {
            if(!this.ligandsMap.has(ligand.id)) {
              ligand.parentTarget = [entry.graphData.query];
              this.ligandsMap.set(ligand.id, ligand);
            } else {
              const lig = this.ligandsMap.get(ligand.id);
              lig.parentTarget.push(entry.graphData.query);
              this.ligandsMap.set(lig.id, lig);
            }
          })
        }
        if(entry.graphData.diseases) {
          entry.graphData.diseases.forEach(disease => {
            if(!this.diseasesMap.has(disease.id)) {
              disease.parentTarget = [entry.graphData.query];
              this.diseasesMap.set(disease.id, disease);
            } else {
              const dis = this.diseasesMap.get(disease.id);
              dis.parentTarget.push(entry.graphData.query);
              this.diseasesMap.set(dis.id, dis);
            }
          })
        }
      })*/
      this.allLigands = this.topic.allLigands;
      this.allDiseases = this.topic.allDiseases;

      this.targetPageData = new PageData({
        top: 10,
        skip: 0,
        count: 10,
        total: this.allTargets.length
      });
      this.targets = this.allTargets.slice(this.targetPageData.skip, this.targetPageData.top);
this.ligandPageData = new PageData({
        top: 10,
        skip: 0,
        count: 10,
        total: this.allLigands.length
      });
      this.ligands = this.allLigands.slice(this.ligandPageData.skip, this.ligandPageData.top);
this.diseasePageData = new PageData({
        top: 10,
        skip: 0,
        count: 10,
        total: this.allDiseases.length
      });
      this.diseases = this.allDiseases.slice(this.diseasePageData.skip, this.diseasePageData.top);
      console.log(this);
      this.ref.markForCheck();
/*

        this.db.collection('topics')
          .doc('1')
          .update({
            allTargets: this.allTargets,
            allLigands: this.allLigands,
            allDiseases: this.allDiseases
          }).then(res => {
          console.log(res);
        })
*/


     /* this.http.get<any>('https://pharos.ncats.nih.gov/idg/api/v1/targets/search?facet=UniProt+Keyword/WD+repeat&top=300')
        .pipe(
          map(res => res.content.map(target => target.accession))
        )
        .subscribe(res => {
          if(!this.topic.targets) {
            this.db.collection('topics')
              .doc('1')
              .update({
                targets: res
              }).then(res => {
              console.log(res);
            })
          }
          res.forEach(targetid => {
            this.http.post<any>(this.pharosConfig.getTopicResolveUrl(), targetid, httpOptions).subscribe(res => {
              console.log(res.content[0].ligands);
            //  this.queries.push(res.content[0]);
              this.db.collection('topics')
                .doc(res.content[0].query)
                .set({
                  topicLinkId: this.topic.id,
                  graphData: res.content[0]
                })
            })
          })
          /!*this.http.post<any>(this.pharosConfig.getTopicResolveUrl(), res.slice(41,60).join(), httpOptions).subscribe(res => {
            console.log(res);
            this.db.collection('topics')
              .doc('1')
              .update({
                graphData: this.topic.graphData ? this.topic.graphData.concat(res.content) : [].concat(res.content)
              })
          })*!/
        })
*/

    });


  }

  update() {
    this.db.collection('topics')
      .doc('wd40graph')
      .set({
        graphData: this.queries
      });
  }

   /* if(this.topic.url) {
      this.http.get<any>(`${this.pharosConfig.getApiPath()}${this.topic.url}`).subscribe(res=> {
        this.allTargets = res.content as Target[];
        const targetNames = this.allTargets.map(target => target.accession);
        console.log(targetNames);
        this.fetchTopic(targetNames);
        this.targetPageData = new PageData({
          top: 10,
          skip: 0,
          count: 10,
          total: this.allTargets.length
        });
        this.targets = this.allTargets.slice(this.targetPageData.skip, this.targetPageData.top);
      })
    }*/


  fetchTopic(targets: string[]) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
      })
    };
    this.http.post(`${this.pharosConfig.getTopicResolveUrl()}`, targets.slice(0, 10).join(','), httpOptions).subscribe(res => {
      console.log(res);
    });

  }

  changeTab(event) {}


  /**
   * paginate the list of targets
   * @param $event
   */
  paginateTargets($event) {
    this.targets = this.allTargets.slice($event.pageIndex * $event.pageSize, ($event.pageIndex + 1) * $event.pageSize);
  }

  paginateLigands($event) {
    this.ligands = this.allLigands.slice($event.pageIndex * $event.pageSize, ($event.pageIndex + 1) * $event.pageSize);
  }

  paginateDiseases($event) {
    this.diseases = this.allDiseases.slice($event.pageIndex * $event.pageSize, ($event.pageIndex + 1) * $event.pageSize);
  }

  findTarget(id: string): Target {
    const allTargets = [].concat(...Array.from(this.targetsMap.values()));
    return allTargets.filter(target => target.id === id)[0];
  }

  mapTargetRanks() {
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
    const mostKnowledgeTarget = this.targetsMap.get(highestLevel) ? this.targetsMap.get(highestLevel)
      .sort((a, b) => b.knowledgeAvailability - a.knowledgeAvailability)[0] : {};
    const mostPotentialTarget = this.targetsMap.get(mostPotential) ? this.targetsMap.get(mostPotential)
      .sort((a, b) => b.knowledgeAvailability - a.knowledgeAvailability)[0] : {};
    const mostPotentialDarkestTarget = this.targetsMap.get(lowestLevel) ? this.targetsMap.get(lowestLevel)
      .sort((a, b) => b.knowledgeAvailability - a.knowledgeAvailability)[0] : {};
    const leastKnowledgeTarget = this.targetsMap.get(lowestLevel) ? this.targetsMap.get(lowestLevel)
      .sort((a, b) => a.knowledgeAvailability - b.knowledgeAvailability)[0] : {};
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
  }

getHighestLevel(potential?: boolean): string {
  const levels = Array.from(this.targetsMap.keys());
  if (levels.length === 1) {
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
getLowestLevel(): string {
  const levels = Array.from(this.targetsMap.keys());
  if (levels.length === 1) {
    return levels[0];
  }
  if (levels.includes('Tdark')) {
    return 'Tdark';
  } else if (levels.includes('Tbio')) {
    return 'Tbio';
  } else if (levels.includes('Tclin')) {
    return 'Tclin';
  } else if (levels.includes('Tchem')) {
    return 'Tchem';
  }
}
}
