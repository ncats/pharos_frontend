import {Component, forwardRef, Inject, Injector, Input, OnInit, Type, ViewChild} from '@angular/core';
import {ComponentLookupService} from "../../../pharos-services/component-lookup.service";
import {ComponentInjectorService} from "../../../pharos-services/component-injector.service";
import {Subject} from "rxjs/Subject";
import {Target} from "../../../models/target";
import {Publication} from "../../../models/publication";
import {CustomContentDirective} from "../../../tools/custom-content.directive";
import {DataDetailsResolver} from "../../services/data-details.resolver";
import {DynamicPanelComponent} from "../../../tools/dynamic-panel/dynamic-panel.component";
import {takeUntil} from "rxjs/operators";
import {Topic} from "../../../models/topic";

@Component({
  selector: 'pharos-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.css']
})
export class TopicDetailsComponent extends DynamicPanelComponent implements OnInit {
  path: string;
  topic: Topic;
  private ngUnsubscribe: Subject<any> = new Subject();

  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;


  constructor(
    private _injector: Injector,
    @Inject(forwardRef(() => ComponentLookupService)) private componentLookupService,
    private dataDetailsResolver: DataDetailsResolver,
    private componentInjectorService: ComponentInjectorService) {
    super();
  }


  ngOnInit() {
    /*if (this.data) {
        this._data
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(x => {
            console.log(this.data);
            this.topic = this.data;
            //childComponent.instance.data = this.pick(this.data, keys);
          });
    }*/
  }

}
