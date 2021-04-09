import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GwasTargetAnalyticsComponent } from './gwas-target-analytics.component';

describe('GwasTargetAnalyticsComponent', () => {
  let component: GwasTargetAnalyticsComponent;
  let fixture: ComponentFixture<GwasTargetAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GwasTargetAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GwasTargetAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
