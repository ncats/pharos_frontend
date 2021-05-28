import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandDescriptionComponent } from './ligand-description.component';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {TESTLIGAND} from '../../../../../../../test/test-ligand';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../../../test/mock-activate-route';

describe('LigandDescriptionComponent', () => {
  let component: LigandDescriptionComponent;
  let fixture: ComponentFixture<LigandDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE}
      ],
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
