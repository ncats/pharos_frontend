import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GwasDiseaseAnalyticsComponent } from './gwas-disease-analytics.component';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../../test/mock-activate-route';

describe('GwasDiseaseAnalyticsComponent', () => {
  let component: GwasDiseaseAnalyticsComponent;
  let fixture: ComponentFixture<GwasDiseaseAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE}
      ],
      declarations: [ GwasDiseaseAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GwasDiseaseAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
