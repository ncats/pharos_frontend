import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPageComponent } from './about-page.component';
import {AppRoutingModule} from "../app-routing.module";
import {SharedModule} from "../shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PharosDashboardComponent} from "../pharos-dashboard/pharos-dashboard.component";
import {FaqPageComponent} from "../faq-page/faq-page.component";
import {ApiPageComponent} from "../api-page/api-page.component";
import {DataTypesPanelComponent} from "../pharos-dashboard/data-types-panel/data-types-panel.component";
import {NewsPanelComponent} from "../pharos-dashboard/news-panel/news-panel.component";
import {AboutPanelComponent} from "../pharos-dashboard/about-panel/about-panel.component";
import {ApiViewerComponent} from "../tools/api-viewer/api-viewer.component";
import {EnvironmentVariablesService} from "../pharos-services/environment-variables.service";
import {LoadingService} from "../pharos-services/loading.service";
import {APP_BASE_HREF} from "@angular/common";
import {PathResolverService} from "../pharos-services/path-resolver.service";
import {SuggestApiService} from "../tools/search-component/suggest-api.service";
import {ResponseParserService} from "../pharos-services/response-parser.service";
import {PharosApiService} from "../pharos-services/pharos-api.service";
import {FacetRetrieverService} from "../pharos-main/services/facet-retriever.service";

describe('AboutPageComponent', () => {
  let component: AboutPageComponent;
  let fixture: ComponentFixture<AboutPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        AppRoutingModule
      ],
      declarations: [
        PharosDashboardComponent,
        FaqPageComponent,
        ApiPageComponent,
        ApiViewerComponent,
        DataTypesPanelComponent,
        NewsPanelComponent,
        AboutPanelComponent,
        AboutPageComponent
      ],
      providers: [
        PharosApiService,
        PathResolverService,
        ResponseParserService,
        LoadingService,
        EnvironmentVariablesService,
        FacetRetrieverService,
        SuggestApiService,
        {provide: APP_BASE_HREF, useValue: '/index' }
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
