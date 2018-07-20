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


@Component({
  selector: 'pharos-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopicDetailsComponent extends DynamicPanelComponent implements OnInit, OnDestroy {
  path: string;
  topic: Topic;
  targets : Target[] = [];
  ligands: Ligand[] = [];
  diseases: Disease[] = [];
  nodes: any[] = [];

  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;


  constructor(
    private _injector: Injector,
    private http: HttpClient,
    @Inject(forwardRef(() => ComponentLookupService)) private componentLookupService,
    private dataDetailsResolver: DataDetailsResolver,
    private componentInjectorService: ComponentInjectorService) {
    super();
  }

  ngOnInit() {
    console.log(this);
       this.topic = this.data.object;
    const components: any = this.componentLookupService.lookupByPath(this.path, 'panels');
    if (components) {
      components.forEach(component => {
        console.log(component);
        // start api calls before making component
        const keys: string[] = [];
        if(component.api) {
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
        // todo need to cover when no results are returned - do we still want to make the component?
        this._data
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(obj => {
            console.log(obj);
            childComponent.instance.data = obj.object;
           // childComponent.instance.id = obj.object.id;
           // childComponent.instance.topic = obj.object;
          });
      });
    }

    switch (this.topic.name){
      case "Bromodomain Inhibitors": {
        console.log("ddddd");
        const targets = ['BRD2','BRD3','BRD4','BRDT'];
        targets.forEach(target =>
          this.http.get('https://pharos.ncats.io/idg/api/v1/targets/'+target).subscribe(res => {
            console.log(res);
              this.targets.push(res as Target);
            }));
        this.targets = this.targets.sort((a,b) => a.knowledgeAvailability - b.knowledgeAvailability);
        console.log(this);
        break;
      }
      case "Lysomal Storage Disorders":{
        break;
      }
      default :{
        break;
      }

    }
/*    this.nodeService.nodeList$
      .subscribe(res => {
        this.data = Array.from(new Set(res.hovered.concat(res.clicked)));
      });
    if (this.data) {
      this.data = [this.data];
    }
    this.dataConnectionService.messages.next({
      message: 'MATCH (n:`KG:1`)-[r]-(b) with {segments:[{start: startNode(r), relationship:r,' +
      ' end: endNode(r)}]} AS ret RETURN ret LIMIT 25', params: {}});*/
  }

pick(o, props): any {
  return Object.assign({}, ...props.map(prop => ({[prop]: o[prop]})));
}

ngOnDestroy(): void {
  this.ngUnsubscribe.next();
this.ngUnsubscribe.complete();
}
}
