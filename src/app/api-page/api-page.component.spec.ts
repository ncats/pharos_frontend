import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ApiPageComponent} from './api-page.component';
import {SharedModule} from '../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from '../app-routing.module';
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
        ApiPageComponent,
        ApiViewerComponent
      ],
      providers: [
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
