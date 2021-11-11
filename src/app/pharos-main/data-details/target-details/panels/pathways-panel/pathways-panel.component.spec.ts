import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathwaysPanelComponent } from './pathways-panel.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ApolloTestingModule} from "apollo-angular/testing";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FIRESTORESTUB} from "../../../../../../../test/firestore-stub";
import {ActivatedRoute} from "@angular/router";
import {MOCKACTIVATEDROUTE} from "../../../../../../../test/mock-activate-route";
import {AngularFireModule} from "@angular/fire/compat";
import {COMMON_CONFIG} from "../../../../../../../test/test-config";
import {TESTTARGET, TESTTARGETPROPS} from "../../../../../../../test/test-target";

describe('PathwaysPanelComponent', () => {
  let component: PathwaysPanelComponent;
  let fixture: ComponentFixture<PathwaysPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(COMMON_CONFIG),
        HttpClientTestingModule,
        ApolloTestingModule
      ],
      declarations: [ PathwaysPanelComponent ],
      providers: [
        AngularFireAuth,
        { provide: AngularFirestore, useValue: FIRESTORESTUB },
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathwaysPanelComponent);
    component = fixture.componentInstance;
    component.data.targets = TESTTARGET;
    component.data.targetsProps = TESTTARGETPROPS;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
