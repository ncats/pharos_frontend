import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandTableComponent } from './ligand-table.component';

describe('LigandTableComponent', () => {
  let component: LigandTableComponent;
  let fixture: ComponentFixture<LigandTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigandTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
