import {Component, Input, OnInit} from '@angular/core';
import {DynamicPanelComponent} from "../../../../../tools/dynamic-panel/dynamic-panel.component";
import {NavSectionsService} from "../../../../../tools/sidenav-panel/services/nav-sections.service";
import {Target, TargetSerializer} from "../../../../../models/target";
import {takeUntil} from "rxjs/operators";
import {PharosProperty} from "../../../../../models/pharos-property";
import {PageData} from "../../../../../models/page-data";
import {TargetComponents} from "../../../../../models/target-components";
import {PharosApiService} from "../../../../../pharos-services/pharos-api.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'pharos-go-terms',
  templateUrl: './go-terms.component.html',
  styleUrls: ['./go-terms.component.scss']
})
export class GoTermsComponent extends DynamicPanelComponent implements OnInit {
  @Input() target: Target;
  @Input() targetProps: any;

  componentPageData: PageData;
  functionPageData: PageData;
  processPageData: PageData;

  constructor(public navSectionsService: NavSectionsService,
              private pharosApiService: PharosApiService,
              private _route: ActivatedRoute) {
    super(navSectionsService);
  }

  fields: PharosProperty[] = [
    new PharosProperty({
      name: 'term',
      label: 'GO Term',
      width: '50vw'
    }),
    new PharosProperty({
      name: 'explanation',
      label: 'Evidence',
      width: '30vw'
    }),
    new PharosProperty({
      name: 'assigned_by',
      label: 'Assigned by',
      width: '20vw'
    })];

  ngOnInit(): void {
    this._data
      // listen to data as long as term is undefined or null
      // Unsubscribe once term has value
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(x => {
        this.target = this.data.targets;
        this.targetProps = this.data.targetsProps;

        if (this.target?.goCount?.total() > 0) {
          this.navSectionsService.showSection(this.field);
        } else {
          this.navSectionsService.hideSection(this.field);
        }

        this.initialize();
      });
  }

  initialize() {
    this.componentPageData = new PageData({
      total: this.target?.goCount?.components,
      skip: 0,
      top: 10
    });
    this.processPageData = new PageData({
      total: this.target?.goCount?.processes,
      skip: 0,
      top: 10
    });
    this.functionPageData = new PageData({
      total: this.target?.goCount?.functions,
      skip: 0,
      top: 10
    });
    this.loadingComplete();
  }

  changePage(event: any, cType: string) {
    this.loadingStart();
    let pageParams: any = {};

    pageParams.gotop = event.pageSize;
    pageParams.goskip = event.pageIndex * event.pageSize;
    pageParams.gotype = cType;

    const pagingParams = this.getPagingParams(cType);
    pagingParams.pageData.skip = event.pageIndex * event.pageSize;

    this.pharosApiService.getComponentPage(this._route.snapshot, pageParams, pagingParams.component)
      .subscribe({
        next: res => {
          try {
            const targetSerializer = new TargetSerializer();
            const tempTarget = targetSerializer.fromJson(res.data.targets);
            this.target[pagingParams.propName] = tempTarget[pagingParams.propName];
            const tempProps = targetSerializer._asProperties(this.target);
            this.updateProps(cType, tempProps[pagingParams.propName]);
            this.loadingComplete();
          } catch (err) {
            console.log(err);
          }
        }, error: err => {
          console.log(err);
        }
      });
  }

  updateProps(cType: string, newProps: any[]) {
    switch (cType) {
      case 'C':
        this.targetProps.goComponent = newProps;
        break;
      case 'F':
        this.targetProps.goFunction = newProps;
        break;
      case 'P':
        this.targetProps.goProcess = newProps;
        break;
    }
  }

  getPagingParams(cType: string): { pageData: PageData, component: TargetComponents.Component, propName: string } {
    const returnObj: any = {};

    switch (cType) {
      case 'C':
        returnObj.pageData = this.componentPageData;
        returnObj.component = TargetComponents.Component.GoComponent;
        returnObj.propName = 'goComponent';
        break;
      case 'F':
        returnObj.pageData = this.functionPageData;
        returnObj.component = TargetComponents.Component.GoFunction;
        returnObj.propName = 'goFunction';
        break;
      case 'P':
        returnObj.pageData = this.processPageData;
        returnObj.component = TargetComponents.Component.GoProcess;
        returnObj.propName = 'goProcess';
        break;
    }
    return returnObj;
  }
}
