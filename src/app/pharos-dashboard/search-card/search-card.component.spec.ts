import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchCardComponent } from './search-card.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../../shared/shared.module';
import {EnvironmentVariablesService} from '../../pharos-services/environment-variables.service';
import {SuggestApiService} from '../../tools/search-component/suggest-api.service';
import {AppRoutingModule} from '../../app-routing.module';
import {PharosDashboardComponent} from '../pharos-dashboard.component';
import {APP_BASE_HREF} from '@angular/common';
import {AboutPageComponent} from '../../about-page/about-page.component';
import {DataTypesPanelComponent} from '../data-types-panel/data-types-panel.component';
import {AboutPanelComponent} from '../about-panel/about-panel.component';
import {ApiPageComponent} from '../../api-page/api-page.component';
import {FaqPageComponent} from '../../faq-page/faq-page.component';
import {NewsPanelComponent} from '../news-panel/news-panel.component';
import {ApiViewerComponent} from '../../tools/api-viewer/api-viewer.component';

describe('SearchCardComponent', () => {
  let component: SearchCardComponent;
  let fixture: ComponentFixture<SearchCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        AppRoutingModule
      ],
      declarations: [
        PharosDashboardComponent,
        SearchCardComponent,
        ApiPageComponent,
        AboutPageComponent,
        FaqPageComponent,
        SearchCardComponent,
        DataTypesPanelComponent,
        NewsPanelComponent,
        AboutPanelComponent,
        ApiViewerComponent
      ],
      providers: [
        SuggestApiService,
        EnvironmentVariablesService,
        {provide: APP_BASE_HREF, useValue: '/index' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
