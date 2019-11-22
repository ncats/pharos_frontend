import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureViewPanelComponent } from './structure-view-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {PharosProperty} from '../../../../../models/pharos-property';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {COMMON_CONFIG} from '../../../../../../../test/test-config';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {FIRESTORESTUB} from '../../../../../../../test/firestore-stub';
import {AngularFirestore} from '@angular/fire/firestore';

describe('StructureViewPanelComponent', () => {
  let component: StructureViewPanelComponent;
  let fixture: ComponentFixture<StructureViewPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureViewPanelComponent ],
      imports: [
        ApolloTestingModule,
        SharedModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        AngularFireAuth,
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureViewPanelComponent);
    component = fixture.componentInstance;
    component.data = new PharosProperty({term: 'c1ccc2CCCc2c1'});

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
