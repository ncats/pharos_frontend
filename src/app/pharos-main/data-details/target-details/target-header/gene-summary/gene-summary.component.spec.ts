import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneSummaryComponent } from './gene-summary.component';

describe('GeneSummaryComponent', () => {
  let component: GeneSummaryComponent;
  let fixture: ComponentFixture<GeneSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
