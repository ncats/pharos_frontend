import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToiCardComponent } from './toi-card.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from '../../app-routing.module';
import {EnvironmentVariablesService} from '../../pharos-services/environment-variables.service';
import {SharedModule} from '../../shared/shared.module';
import {PharosDashboardComponent} from '../pharos-dashboard.component';
import {SuggestApiService} from '../../tools/search-component/suggest-api.service';
import {APP_BASE_HREF} from '@angular/common';
import {SearchCardComponent} from '../search-card/search-card.component';
import {AboutPageComponent} from '../../about-page/about-page.component';
import {DataTypesPanelComponent} from '../data-types-panel/data-types-panel.component';
import {AboutPanelComponent} from '../about-panel/about-panel.component';
import {ApiPageComponent} from '../../api-page/api-page.component';
import {FaqPageComponent} from '../../faq-page/faq-page.component';
import {NewsPanelComponent} from '../news-panel/news-panel.component';
import {ApiViewerComponent} from '../../tools/api-viewer/api-viewer.component';

describe('ToiCardComponent', () => {
  let component: ToiCardComponent;
  let fixture: ComponentFixture<ToiCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        AppRoutingModule
      ],
      declarations: [
        PharosDashboardComponent,
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
    fixture = TestBed.createComponent(ToiCardComponent);
    component = fixture.componentInstance;
    component.toi = {
      name: 'Bromodomain Inhibitors',
      class: 'target',
      diseaseCt: 45,
      ligandCt: 43,
      targetCt: 0,
      publicationCt: 25
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
