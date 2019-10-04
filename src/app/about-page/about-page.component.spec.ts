import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AboutPageComponent} from './about-page.component';
import {AppRoutingModule} from '../app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoadingService} from '../pharos-services/loading.service';
import {APP_BASE_HREF} from '@angular/common';
import {PathResolverService} from '../pharos-services/path-resolver.service';
import {SharedModule} from '../shared/shared.module';
import {GenericTableModule} from '../tools/generic-table/generic-table.module';
import {Router, RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';


describe('AboutPageComponent', () => {
  let component: AboutPageComponent;
  let fixture: ComponentFixture<AboutPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        SharedModule,
        GenericTableModule
      ],
      declarations: [
        AboutPageComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPageComponent);
    component = fixture.componentInstance;
    component['data'] = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
