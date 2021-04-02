import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GwasAnalyticsComponent } from './gwas-analytics.component';

describe('GwasAnalyticsComponent', () => {
  let component: GwasAnalyticsComponent;
  let fixture: ComponentFixture<GwasAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GwasAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GwasAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
