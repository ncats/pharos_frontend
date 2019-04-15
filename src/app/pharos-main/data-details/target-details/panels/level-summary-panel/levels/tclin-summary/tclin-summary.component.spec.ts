import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TclinSummaryComponent } from './tclin-summary.component';

describe('TclinSummaryComponent', () => {
  let component: TclinSummaryComponent;
  let fixture: ComponentFixture<TclinSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TclinSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TclinSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
