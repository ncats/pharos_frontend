import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DataDetailsComponent} from './data-details.component';
import {LoadingService} from '../../pharos-services/loading.service';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {SuggestApiService} from '../../tools/search-component/suggest-api.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FacetRetrieverService} from '../data-list/filter-panel/facet-retriever.service';
import {APP_BASE_HREF} from '@angular/common';
import {PathResolverService} from '../../pharos-services/path-resolver.service';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedListModule} from '../../shared/shared-list.module';
import {SharedDetailsModule} from '../../shared/shared-details.module';
import {ComponentInjectorService} from '../../pharos-services/component-injector.service';
import {TargetHeaderComponent} from './target-details/target-header/target-header.component';
import {TargetDetailsComponent} from './target-details/target-details.component';
import {IdgLevelIndicatorComponent} from '../../tools/idg-level-indicator/idg-level-indicator.component';
import {TargetListPanelComponent} from './disease-details/target-list-panel/target-list-panel.component';
import {CommonToolsModule} from '../../tools/common-tools.module';
import {TOKENS} from '../../../config/component-tokens';

describe('DataDetailsComponent', () => {
  let component: DataDetailsComponent;
  let fixture: ComponentFixture<DataDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedListModule,
        SharedDetailsModule,
        RouterTestingModule,
        CommonToolsModule,
        BrowserAnimationsModule
      ],
      declarations: [
        TargetDetailsComponent,
        TargetHeaderComponent,
        TargetListPanelComponent
      ],
      providers: [
        PathResolverService,
        PharosApiService,
        LoadingService,
        FacetRetrieverService,
        SuggestApiService,
        ComponentInjectorService,
        // {provide: TOKENS.TARGET_HEADER_COMPONENT, useValue: TargetHeaderComponent},
        {provide: APP_BASE_HREF, useValue: '/targets' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDetailsComponent);
    component = fixture.componentInstance;
    component.path = 'targets';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
