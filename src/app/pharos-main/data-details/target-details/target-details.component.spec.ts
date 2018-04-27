import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetDetailsComponent } from './target-details.component';
import {SharedModule} from '../../../shared/shared.module';
import {TargetHeaderComponent} from './target-header/target-header.component';
import {EnvironmentVariablesService} from '../../../pharos-services/environment-variables.service';
import {ComponentLookupService} from '../../../pharos-services/component-lookup.service';
import {DataDetailsResolver} from '../../services/data-details.resolver';
import {ResponseParserService} from '../../../pharos-services/response-parser.service';
import {SuggestApiService} from '../../../tools/search-component/suggest-api.service';
import {FacetRetrieverService} from '../../services/facet-retriever.service';
import {LoadingService} from '../../../pharos-services/loading.service';
import {APP_BASE_HREF} from '@angular/common';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {PathResolverService} from '../../../pharos-services/path-resolver.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PharosMainRoutingModule} from '../../pharos-main-routing.module';
import {RouterTestingModule} from '@angular/router/testing';
import {TESTTARGET} from '../../../../../test/test-target';
import {testComponentLookupService} from '../../../../../test/test-component-lookup.service';

describe('TargetDetailsComponent', () => {
  let component: TargetDetailsComponent;
  let fixture: ComponentFixture<TargetDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [ TargetDetailsComponent, TargetHeaderComponent],
      providers: [
        EnvironmentVariablesService,
        DataDetailsResolver,
        PathResolverService,
        PharosApiService,
        PathResolverService,
        ResponseParserService,
        LoadingService,
        {provide: ComponentLookupService, useClass: testComponentLookupService},
        {provide: APP_BASE_HREF, useValue: '/targets' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetDetailsComponent);
    component = fixture.componentInstance;
    component.path = 'targets';
    component.setData({object: TESTTARGET, references: []});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
