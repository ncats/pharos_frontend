import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TargetListPanelComponent} from './target-list-panel.component';
import {SharedModule} from '../../../../shared/shared.module';
import {GenericTableModule} from '../../../../tools/generic-table/generic-table.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TESTDISEASE} from '../../../../../../test/test-disease';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {FIRESTORESTUB} from '../../../../../../test/firestore-stub';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {COMMON_CONFIG} from '../../../../../../test/test-config';
import {AngularFireModule} from '@angular/fire/compat';

describe('TargetListPanelComponent', () => {
  let component: TargetListPanelComponent;
  let fixture: ComponentFixture<TargetListPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetListPanelComponent ],
      imports: [
        ApolloTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        SharedModule,
        GenericTableModule,
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
    fixture = TestBed.createComponent(TargetListPanelComponent);
    component = fixture.componentInstance;
    component.data = {
      diseases: TESTDISEASE
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
