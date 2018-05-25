import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacetListComponent } from './facet-list.component';
import {PathResolverService} from '../../pharos-services/path-resolver.service';
import {EnvironmentVariablesService} from '../../pharos-services/environment-variables.service';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {ResponseParserService} from '../../pharos-services/response-parser.service';
import {SuggestApiService} from '../../tools/search-component/suggest-api.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoadingService} from '../../pharos-services/loading.service';
import {SharedModule} from '../../shared/shared.module';
import {PharosMainRoutingModule} from '../pharos-main-routing.module';
import {FacetRetrieverService} from '../services/facet-retriever.service';
import {APP_BASE_HREF} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';

describe('FacetListComponent', () => {
  let component: FacetListComponent;
  let fixture: ComponentFixture<FacetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        PharosMainRoutingModule
      ],
      declarations: [
      ],
      providers: [
        PathResolverService,
        PharosApiService,
        PathResolverService,
        ResponseParserService,
        LoadingService,
        EnvironmentVariablesService,
        FacetRetrieverService,
        SuggestApiService,
        {provide: APP_BASE_HREF, useValue: '/targets' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetListComponent);
    component = fixture.componentInstance;
    component.facets = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
