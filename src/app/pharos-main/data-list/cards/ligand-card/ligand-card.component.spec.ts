import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandCardComponent } from './ligand-card.component';
import {RouterTestingModule} from '@angular/router/testing';
import {TESTLIGAND} from '../../../../../../test/test-ligand';

describe('LigandCardComponent', () => {
  let component: LigandCardComponent;
  let fixture: ComponentFixture<LigandCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandCardComponent);
    component = fixture.componentInstance;
    component.ligand = TESTLIGAND;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
