import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDetailsComponent } from './topic-details.component';
import {SharedDetailsModule} from "../../../shared/shared-details.module";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TopicHeaderComponent} from "./topic-header/topic-header.component";
import {NodeDisplayComponent} from "./panels/node-display/node-display.component";
import {GraphDataService} from "../../../tools/force-directed-graph/fdg-core/graph-component/services/graph-data.service";
import {LinkService} from "../../../tools/force-directed-graph/fdg-core/graph-component/services/event-tracking/link.service";
import {ComponentInjectorService} from "../../../pharos-services/component-injector.service";
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
        LinkService,
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
