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

describe('DataDetailsComponent', () => {
  let component: DataDetailsComponent;
  let fixture: ComponentFixture<DataDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedListModule,
        SharedDetailsModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [
      ],
      providers: [
        PathResolverService,
        PharosApiService,
        LoadingService,
        FacetRetrieverService,
        SuggestApiService,
        ComponentInjectorService,
        {provide: APP_BASE_HREF, useValue: '/targets' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
