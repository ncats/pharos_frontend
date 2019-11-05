import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectedFacetListComponent} from './selected-facet-list.component';
import {PathResolverService} from '../../../pharos-services/path-resolver.service';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {SuggestApiService} from '../../../tools/search-component/suggest-api.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoadingService} from '../../../pharos-services/loading.service';
import {SharedModule} from '../../../shared/shared.module';
import {SelectedFacetService} from '../filter-panel/selected-facet.service';
import {APP_BASE_HREF} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';

describe('SelectedFacetListComponent', () => {
  let component: SelectedFacetListComponent;
  let fixture: ComponentFixture<SelectedFacetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [
        SelectedFacetListComponent
      ],
      providers: [
        PathResolverService,
        PharosApiService,
        PathResolverService,
        LoadingService,
        SelectedFacetService,
        SuggestApiService,
        {provide: APP_BASE_HREF, useValue: '/targets' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedFacetListComponent);
    component = fixture.componentInstance;
    component.facets = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
