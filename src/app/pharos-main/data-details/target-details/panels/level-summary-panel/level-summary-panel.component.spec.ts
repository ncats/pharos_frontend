import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {LevelSummaryPanelComponent} from "./level-summary-panel.component";


describe('LevelSummaryPanelComponent', () => {
  let component: LevelSummaryPanelComponent;
  let fixture: ComponentFixture<LevelSummaryPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelSummaryPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelSummaryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
