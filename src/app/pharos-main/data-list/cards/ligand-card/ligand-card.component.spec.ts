import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandCardComponent } from './ligand-card.component';

describe('LigandCardComponent', () => {
  let component: LigandCardComponent;
  let fixture: ComponentFixture<LigandCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigandCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
