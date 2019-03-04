import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelSummaryComponent } from './level-summary.component';

describe('LevelSummaryComponent', () => {
  let component: LevelSummaryComponent;
  let fixture: ComponentFixture<LevelSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
