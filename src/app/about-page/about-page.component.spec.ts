import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AboutPageComponent} from './about-page.component';
import {AppRoutingModule} from '../app-routing.module';
import {SharedModule} from '../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoadingService} from '../pharos-services/loading.service';
import {APP_BASE_HREF} from '@angular/common';
import {PathResolverService} from '../pharos-services/path-resolver.service';

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
