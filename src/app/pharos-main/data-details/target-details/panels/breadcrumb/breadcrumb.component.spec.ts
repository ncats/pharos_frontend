import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbComponent } from './breadcrumb.component';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedModule} from '../../../../../shared/shared.module';
import {BrowserTestingModule} from '@angular/platform-browser/testing';
import {PathResolverService} from '../../../../../pharos-services/path-resolver.service';
import {ApolloTestingModule} from 'apollo-angular/testing';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        ApolloTestingModule,
        RouterTestingModule
      ],
      providers: [PathResolverService],
      declarations: [
        BreadcrumbComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    component.links = ['targets'];
    component.path = 'targets';
    component.data = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
