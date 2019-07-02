import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PharosHomeComponent} from './pharos-home.component';
import {SharedModule} from '../shared/shared.module';
import {LoadingService} from '../pharos-services/loading.service';
import {SuggestApiService} from '../tools/search-component/suggest-api.service';
import {AppRoutingModule} from '../app-routing.module';
import {APP_BASE_HREF} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataTypesPanelComponent} from './data-types-panel/data-types-panel.component';
import {NewsPanelComponent} from './news-panel/news-panel.component';
import {AboutPanelComponent} from './about-panel/about-panel.component';

describe('PharosHomeComponent', () => {
  let component: PharosHomeComponent;
  let fixture: ComponentFixture<PharosHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        AppRoutingModule
      ],
      declarations: [
        PharosHomeComponent,
        DataTypesPanelComponent,
        NewsPanelComponent,
        AboutPanelComponent
      ],
      providers: [
        LoadingService,
        SuggestApiService,
        {provide: APP_BASE_HREF, useValue: '/index' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
