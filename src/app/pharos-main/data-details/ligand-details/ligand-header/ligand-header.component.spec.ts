import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandHeaderComponent } from './ligand-header.component';

describe('LigandHeaderComponent', () => {
  let component: LigandHeaderComponent;
  let fixture: ComponentFixture<LigandHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigandHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
