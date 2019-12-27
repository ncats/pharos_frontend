import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TargetRelevancePanelComponent} from './target-relevance-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {GenericTableModule} from '../../../../../tools/generic-table/generic-table.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {COMMON_CONFIG} from '../../../../../../../test/test-config';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {FIRESTORESTUB} from '../../../../../../../test/firestore-stub';
import {AngularFirestore} from '@angular/fire/firestore';
import {TESTLIGAND, TESTLIGANDPROPS} from '../../../../../../../test/test-ligand';

describe('TargetRelevancePanelComponent', () => {
  let component: TargetRelevancePanelComponent;
  let fixture: ComponentFixture<TargetRelevancePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TargetRelevancePanelComponent],
      imports: [
        SharedModule,
        GenericTableModule,
        BrowserAnimationsModule,
        ApolloTestingModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        AngularFireAuth,
        {provide: AngularFirestore, useValue: FIRESTORESTUB}
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetRelevancePanelComponent);
    component = fixture.componentInstance;
    component.data = {
      ligands: TESTLIGAND,
      ligandsProps: TESTLIGANDPROPS
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
