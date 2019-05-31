import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandDescriptionComponent } from './ligand-description.component';

describe('LigandDescriptionComponent', () => {
  let component: LigandDescriptionComponent;
  let fixture: ComponentFixture<LigandDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigandDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
