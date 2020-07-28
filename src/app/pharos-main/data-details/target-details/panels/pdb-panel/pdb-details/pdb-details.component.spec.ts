import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdbDetailsComponent } from './pdb-details.component';

describe('PdbDetailsComponent', () => {
  let component: PdbDetailsComponent;
  let fixture: ComponentFixture<PdbDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdbDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdbDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
