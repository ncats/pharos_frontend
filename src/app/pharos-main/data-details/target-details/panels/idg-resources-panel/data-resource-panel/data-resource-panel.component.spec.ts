import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataResourcePanelComponent } from './data-resource-panel.component';
import * as test_data from "../../../../../../../../test/test-data-sources";
import * as dataResources from "../../../../../../models/idg-resources/data-resource";

describe('DataResourcePanelComponent', () => {
  let component: DataResourcePanelComponent;
  let fixture: ComponentFixture<DataResourcePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataResourcePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataResourcePanelComponent);
  });

  it('should create', () => {
    component = fixture.componentInstance;
    component.dataResource = test_data.TEST_RESOURCE_NANOBRET1;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should be the right resource types', () => {
    expect(test_data.TEST_RESOURCE_EXPRESSION1 instanceof dataResources.Dataset).toBeTruthy();
    expect(test_data.TEST_RESOURCE_EXPRESSION2 instanceof dataResources.Dataset).toBeTruthy();
    expect(test_data.TEST_RESOURCE_MOUSE_IMAGING1 instanceof dataResources.MouseImageData).toBeTruthy();
    expect(test_data.TEST_RESOURCE_MOUSE_IMAGING2 instanceof dataResources.MouseImageData).toBeTruthy();
    expect(test_data.TEST_RESOURCE_NANOBRET1 instanceof dataResources.Dataset).toBeTruthy();
    expect(test_data.TEST_RESOURCE_NANOBRET2 instanceof dataResources.Dataset).toBeTruthy();
  });
});
