import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ApiPageComponent} from './api-page.component';
import {SharedModule} from '../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from '../app-routing.module';
<<<<<<< HEAD
=======
import {DataTypesPanelComponent} from '../pharos-home/data-types-panel/data-types-panel.component';
import {AboutPanelComponent} from '../pharos-home/about-panel/about-panel.component';
import {PathResolverService} from '../pharos-services/path-resolver.service';
import {FaqPageComponent} from '../faq-page/faq-page.component';
import {NewsPanelComponent} from '../pharos-home/news-panel/news-panel.component';
import {AboutPageComponent} from '../about-page/about-page.component';
>>>>>>> deploy
import {LoadingService} from '../pharos-services/loading.service';
import {ApiViewerComponent} from '../tools/api-viewer/api-viewer.component';
import {APP_BASE_HREF} from '@angular/common';


describe('ApiPageComponent', () => {
  let component: ApiPageComponent;
  let fixture: ComponentFixture<ApiPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        AppRoutingModule
      ],
      declarations: [
<<<<<<< HEAD
=======
        FaqPageComponent,
>>>>>>> deploy
        ApiPageComponent,
        ApiViewerComponent
      ],
      providers: [
<<<<<<< HEAD
=======
        PharosApiService,
        PathResolverService,
>>>>>>> deploy
        LoadingService,
        {provide: APP_BASE_HREF, useValue: '/index' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
