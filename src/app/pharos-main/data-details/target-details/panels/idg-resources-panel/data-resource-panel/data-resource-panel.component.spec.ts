import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataResourcePanelComponent } from './data-resource-panel.component';

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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
