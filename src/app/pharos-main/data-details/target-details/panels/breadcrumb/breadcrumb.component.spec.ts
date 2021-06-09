import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BreadcrumbComponent} from './breadcrumb.component';
import {TESTTARGET} from '../../../../../../../test/test-target';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../../../test/mock-activate-route';
import {DynamicServicesService} from '../../../../../pharos-services/dynamic-services.service';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        BreadcrumbComponent
      ], providers: [
        DynamicServicesService,
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    component.data = TESTTARGET;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
