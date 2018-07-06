import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {PharosDashboardComponent} from './pharos-dashboard/pharos-dashboard.component';
import {SearchCardComponent} from './pharos-dashboard/search-card/search-card.component';
import {APP_BASE_HREF} from '@angular/common';
import {LoadingService} from './pharos-services/loading.service';
import {PathResolverService} from './pharos-services/path-resolver.service';
import {EnvironmentVariablesService} from './pharos-services/environment-variables.service';
import {FacetRetrieverService} from './pharos-main/services/facet-retriever.service';
import {PharosApiService} from './pharos-services/pharos-api.service';
import {ResponseParserService} from './pharos-services/response-parser.service';
import {SuggestApiService} from './tools/search-component/suggest-api.service';
import {ApiPageComponent} from "./api-page/api-page.component";
import {AboutPageComponent} from "./about-page/about-page.component";
import {FaqPageComponent} from "./faq-page/faq-page.component";
import {DataTypesPanelComponent} from "./pharos-dashboard/data-types-panel/data-types-panel.component";
import {AboutPanelComponent} from "./pharos-dashboard/about-panel/about-panel.component";
import {NewsPanelComponent} from "./pharos-dashboard/news-panel/news-panel.component";
import {ApiViewerComponent} from "./tools/api-viewer/api-viewer.component";
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule
      ],
      declarations: [
        AppComponent,
        PharosDashboardComponent,
        ApiPageComponent,
        AboutPageComponent,
        FaqPageComponent,
        DataTypesPanelComponent,
        AboutPanelComponent,
        NewsPanelComponent,
        ApiViewerComponent,
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
        {provide: APP_BASE_HREF, useValue: '/' }
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Pharos'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Pharos');
  }));
});
