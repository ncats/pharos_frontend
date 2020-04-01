import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReagentPanelComponent } from './reagent-panel.component';
import * as test_data from "../../../../../../../../test/test-data-sources";
import * as reagents from "../../../../../../models/idg-resources/reagent";

describe('ReagentPanelComponent', () => {
  let component: ReagentPanelComponent;
  let fixture: ComponentFixture<ReagentPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReagentPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReagentPanelComponent);
  });

  it('should create', () => {
    component = fixture.componentInstance;
    component.reagent = test_data.TEST_RESOURCE_CELL1;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should be the right resource types', () => {
    expect(test_data.TEST_RESOURCE_CELL1 instanceof reagents.Cell).toBeTruthy();
    expect(test_data.TEST_RESOURCE_CELL2 instanceof reagents.Cell).toBeTruthy();
    expect(test_data.TEST_RESOURCE_CHEMICAL_TOOL1 instanceof reagents.SmallMolecule).toBeTruthy();
    expect(test_data.TEST_RESOURCE_CHEMICAL_TOOL2 instanceof reagents.SmallMolecule).toBeTruthy();
    expect(test_data.TEST_RESOURCE_CONSTRUCT1 instanceof reagents.GeneticConstruct).toBeTruthy();
    expect(test_data.TEST_RESOURCE_CONSTRUCT2 instanceof reagents.GeneticConstruct).toBeTruthy();
    expect(test_data.TEST_RESOURCE_MOUSE1 instanceof reagents.Mouse).toBeTruthy();
    expect(test_data.TEST_RESOURCE_MOUSE2 instanceof reagents.Mouse).toBeTruthy();
    expect(test_data.TEST_RESOURCE_PEPTIDE1 instanceof reagents.Peptide).toBeTruthy();
    expect(test_data.TEST_RESOURCE_PEPTIDE1 instanceof reagents.Peptide).toBeTruthy();
  });
});
