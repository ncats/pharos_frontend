import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MolecularDefinitionPanelComponent } from './molecular-definition-panel.component';

describe('MolecularDefinitionPanelComponent', () => {
  let component: MolecularDefinitionPanelComponent;
  let fixture: ComponentFixture<MolecularDefinitionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MolecularDefinitionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MolecularDefinitionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
