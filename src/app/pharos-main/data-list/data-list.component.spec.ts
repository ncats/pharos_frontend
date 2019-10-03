import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DataListComponent} from './data-list.component';
import {PathResolverService} from '../../pharos-services/path-resolver.service';
import {PharosApiService} from '../../pharos-services/pharos-api.service';
import {SuggestApiService} from '../../tools/search-component/suggest-api.service';
import {RouterTestingModule} from '@angular/router/testing';
import {FacetRetrieverService} from './filter-panel/facet-retriever.service';
import {APP_BASE_HREF} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedListModule} from '../../shared/shared-list.module';
import {ComponentInjectorService} from '../../pharos-services/component-injector.service';

describe('DataListComponent', () => {
  let component: DataListComponent;
  let fixture: ComponentFixture<DataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedListModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [

      ],
      providers: [
        ComponentInjectorService,
        PathResolverService,
        PharosApiService,
        FacetRetrieverService,
        SuggestApiService,
        {provide: APP_BASE_HREF, useValue: '/targets' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
