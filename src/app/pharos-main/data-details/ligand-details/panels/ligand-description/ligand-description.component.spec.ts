import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandDescriptionComponent } from './ligand-description.component';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {TESTLIGAND} from '../../../../../../../test/test-ligand';

describe('LigandDescriptionComponent', () => {
  let component: LigandDescriptionComponent;
  let fixture: ComponentFixture<LigandDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigandDescriptionComponent ],
      imports: [
        ApolloTestingModule
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandDescriptionComponent);
    component = fixture.componentInstance;
    component.data = {
      ligands: TESTLIGAND
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
