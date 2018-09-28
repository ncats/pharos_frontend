import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinProteinPanelComponent } from './protein-protein-panel.component';

describe('ProteinProteinPanelComponent', () => {
  let component: ProteinProteinPanelComponent;
  let fixture: ComponentFixture<ProteinProteinPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProteinProteinPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProteinProteinPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
