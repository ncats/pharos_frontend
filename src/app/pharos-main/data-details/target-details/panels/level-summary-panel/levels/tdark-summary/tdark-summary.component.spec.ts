import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdarkSummaryComponent } from './tdark-summary.component';

describe('TdarkSummaryComponent', () => {
  let component: TdarkSummaryComponent;
  let fixture: ComponentFixture<TdarkSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdarkSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdarkSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
