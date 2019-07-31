import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AboutPageComponent} from './about-page.component';
import {AppRoutingModule} from '../app-routing.module';
import {SharedModule} from '../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FaqPageComponent} from '../faq-page/faq-page.component';
import {DataTypesPanelComponent} from '../pharos-home/data-types-panel/data-types-panel.component';
import {NewsPanelComponent} from '../pharos-home/news-panel/news-panel.component';
import {AboutPanelComponent} from '../pharos-home/about-panel/about-panel.component';
import {ApiViewerComponent} from '../tools/api-viewer/api-viewer.component';
import {LoadingService} from '../pharos-services/loading.service';
import {APP_BASE_HREF} from '@angular/common';
import {PathResolverService} from '../pharos-services/path-resolver.service';
import {SuggestApiService} from '../tools/search-component/suggest-api.service';
import {PharosApiService} from '../pharos-services/pharos-api.service';
import {FacetRetrieverService} from '../pharos-main/data-list/filter-panel/facet-retriever.service';

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
        FaqPageComponent,
        ApiViewerComponent,
        DataTypesPanelComponent,
        NewsPanelComponent,
        AboutPanelComponent,
        AboutPageComponent
      ],
      providers: [
        PathResolverService,
        LoadingService,
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
