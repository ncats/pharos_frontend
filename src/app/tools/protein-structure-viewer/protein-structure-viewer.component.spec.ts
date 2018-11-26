import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProteinStructureViewerComponent } from './protein-structure-viewer.component';

describe('ProteinStructureViewerComponent', () => {
  let component: ProteinStructureViewerComponent;
  let fixture: ComponentFixture<ProteinStructureViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProteinStructureViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProteinStructureViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
