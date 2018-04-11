import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugPanelComponent } from './drug-panel.component';

describe('DrugPanelComponent', () => {
  let component: DrugPanelComponent;
  let fixture: ComponentFixture<DrugPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
