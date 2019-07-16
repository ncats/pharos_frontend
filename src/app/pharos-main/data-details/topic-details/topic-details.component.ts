import {ChangeDetectorRef, Component, Injector, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {PharosConfig} from '../../../../config/pharos-config';

import {DynamicPanelComponent} from '../../../tools/dynamic-panel/dynamic-panel.component';
import {Topic} from '../../../models/topic';
import {CustomContentDirective} from '../../../tools/custom-content.directive';
import {DataDetailsResolver} from '../data-details.resolver';
import {ComponentInjectorService} from '../../../pharos-services/component-injector.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Target} from '../../../models/target';
import {PageData} from '../../../models/page-data';


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
  encapsulation: ViewEncapsulation.None
})
export class TopicDetailsComponent extends DynamicPanelComponent implements OnInit {
  /**
   * url path
   */
  path: string;

  /**
   * main topic
   */
  topic: Topic;

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
  diseasesMap: Map<string, any[]> = new Map<string, any[]>();

  /**
   * map of ligands
   */
  ligandsMap: Map<string, any[]> = new Map<string, any[]>();
  displayTargets: any = {};
  targetPageData: PageData;
  ligandPageData: PageData;
  diseasePageData: PageData;
  diseaseLabel: string;

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
   * @param pharosConfig
   * @param dataParserService
   * @param dataDetailsResolver
   * @param ref
   * @param componentInjectorService
   */
  constructor(private _injector: Injector,
              private http: HttpClient,
              private pharosConfig: PharosConfig,
              private dataDetailsResolver: DataDetailsResolver,
              private ref: ChangeDetectorRef,
              private componentInjectorService: ComponentInjectorService) {
    super();
    this._apiUrl = this.pharosConfig.getApiPath();
  }


  /**
   * initialize data change subsctiptions, fetch data
   */
  ngOnInit() {
    if(this.topic.url) {
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
    }
    console.log(this);
  }

  fetchTopic(targets: string[]) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
      })
    };
    this.http.post(`${this.pharosConfig.getTopicResolveUrl()}`, targets.slice(0,10).join(','), httpOptions).subscribe(res=> {
      console.log(res);
    })

  }

  changeTab(event){}


  /**
   * paginate the list of targets
   * @param $event
   */
  paginateTargets($event) {
    this.targets = this.allTargets.slice($event.pageIndex * $event.pageSize, ($event.pageIndex + 1) * $event.pageSize);
  }
}
