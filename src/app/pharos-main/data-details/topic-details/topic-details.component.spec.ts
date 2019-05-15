import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {SharedDetailsModule} from "../../../shared/shared-details.module";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TopicHeaderComponent} from "../../pharos-main/data-details/topic-details/topic-header/topic-header.component";
import {GraphDataService} from "../../../tools/force-directed-graph/fdg-core/graph-component/services/graph-data.service";
import {LoadingService} from "../../../pharos-services/loading.service";
import {PharosNodeService} from "../../pharos-main/data-details/topic-details/panels/topic-graph-panel/topic-directed-graph/pharos-node.service";
import {ResponseParserService} from "../../../pharos-services/response-parser.service";
import {ComponentInjectorService} from "../../../pharos-services/component-injector.service";
import {PathResolverService} from "../../../pharos-services/path-resolver.service";
import {DataDetailsResolver} from "../../pharos-main/data-details/data-details.resolver";
import {PharosApiService} from "../../../pharos-services/pharos-api.service";
import {PharosD3Service} from "../../pharos-main/data-details/topic-details/panels/topic-graph-panel/topic-directed-graph/pharos-d3.service";
import {TopicDetailsComponent} from "../../pharos-main/data-details/topic-details/topic-details.component";
import {NodeDisplayComponent} from "../../pharos-main/data-details/topic-details/panels/node-display/node-display.component";
import {APP_BASE_HREF} from "@angular/common";


describe('TopicDetailsComponent', () => {
  let component: TopicDetailsComponent;
  let fixture: ComponentFixture<TopicDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedDetailsModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [
        TopicDetailsComponent,
        TopicHeaderComponent,
        NodeDisplayComponent
      ],
      providers: [
        GraphDataService,
        LoadingService,
        PharosNodeService,
        PharosLinkService,
        PharosD3Service,
        PharosApiService,
        DataDetailsResolver,
        PathResolverService,
        ResponseParserService,
        ComponentInjectorService,
        {provide: APP_BASE_HREF, useValue: '/targets' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
