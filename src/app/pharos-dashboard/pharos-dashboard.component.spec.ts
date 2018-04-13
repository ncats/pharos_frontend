import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharosDashboardComponent } from './pharos-dashboard.component';
import {ToiCardComponent} from './toi-card/toi-card.component';
import {ToiDashboardComponent} from './toi-dashboard/toi-dashboard.component';
import {SearchCardComponent} from './search-card/search-card.component';
import {SharedModule} from '../shared/shared.module';
import {LoadingService} from '../pharos-services/loading.service';
import {PathResolverService} from '../pharos-services/path-resolver.service';
import {EnvironmentVariablesService} from '../pharos-services/environment-variables.service';
import {FacetRetrieverService} from '../pharos-main/services/facet-retriever.service';
import {PharosApiService} from '../pharos-services/pharos-api.service';
import {ResponseParserService} from '../pharos-services/response-parser.service';
import {SuggestApiService} from '../tools/search-component/suggest-api.service';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from '../app-routing.module';
import {APP_BASE_HREF} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('PharosDashboardComponent', () => {
  let component: PharosDashboardComponent;
  let fixture: ComponentFixture<PharosDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        AppRoutingModule
      ],
      declarations: [
        PharosDashboardComponent,
        ToiDashboardComponent,
        ToiCardComponent,
        SearchCardComponent
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
    fixture = TestBed.createComponent(PharosDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
