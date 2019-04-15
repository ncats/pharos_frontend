import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTablePanelComponent } from './dynamic-table-panel.component';

describe('DynamicTablePanelComponent', () => {
  let component: DynamicTablePanelComponent;
  let fixture: ComponentFixture<DynamicTablePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicTablePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTablePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
