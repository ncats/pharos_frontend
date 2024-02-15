import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {MOCKACTIVATEDROUTE} from '../../../../../../../test/mock-activate-route';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {FIRESTORESTUB} from '../../../../../../../test/firestore-stub';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {COMMON_CONFIG} from '../../../../../../../test/test-config';
import {AngularFireModule} from '@angular/fire/compat';
import {TESTTARGET, TESTTARGETPROPS} from '../../../../../../../test/test-target';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {DrugPanelParameters, DrugsLigandsPanelComponent} from "./drugs-ligands-panel.component";
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DrugsLigandsPanelComponent', () => {
  let component: DrugsLigandsPanelComponent;
  let fixture: ComponentFixture<DrugsLigandsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ApolloTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        AngularFireAuth,
        { provide: AngularFirestore, useValue: FIRESTORESTUB },
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  it('drugs panel should create', () => {
    fixture = TestBed.createComponent(DrugsLigandsPanelComponent);
    component = fixture.componentInstance;
    component.params = new DrugPanelParameters();
    component.data = {targets: TESTTARGET};
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('ligands panel should create', () => {
    fixture = TestBed.createComponent(DrugsLigandsPanelComponent);
    component = fixture.componentInstance;
    component.params = new DrugPanelParameters(false);
    component.data = {targets: TESTTARGET};
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
