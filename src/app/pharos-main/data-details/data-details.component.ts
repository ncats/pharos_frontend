import {Component, ComponentFactoryResolver, OnDestroy, OnInit, Type, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {ResponseParserService} from "../../pharos-services/response-parser.service";
import {Subject} from "rxjs/Subject";
import {TargetTableComponent} from "../data-list/target-table/target-table.component";
import {TargetDetailsComponent} from "./target-details/target-details.component";
import {CustomContentDirective} from "../../tools/custom-content.directive";

@Component({
  selector: 'pharos-data-details',
  templateUrl: './data-details.component.html',
  styleUrls: ['./data-details.component.css']
})
export class DataDetailsComponent implements OnInit, OnDestroy {
  data: any = {};
  private ngUnsubscribe: Subject<any> = new Subject();
  @ViewChild(CustomContentDirective) componentHost: CustomContentDirective;


  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private responseParserService: ResponseParserService
  ) { }

  ngOnInit() {
    this.responseParserService.detailsData$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        this.data = res;
        this.loadDetails();
      });
    console.log(this);
  }

  loadDetails() {

    /*    this.fieldsMap.forEach(field => {
          if (field.name === name) {
            ret = !!field.component;
          }
        });*/

    const instance: Type<any> = TargetDetailsComponent;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(instance);
    const viewContainerRef = this.componentHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.target = this.data;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
