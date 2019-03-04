import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TchemSummaryComponent } from './tchem-summary.component';

describe('TchemSummaryComponent', () => {
  let component: TchemSummaryComponent;
  let fixture: ComponentFixture<TchemSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TchemSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TchemSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
