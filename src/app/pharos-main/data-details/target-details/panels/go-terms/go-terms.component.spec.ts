import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoTermsComponent } from './go-terms.component';
import {PharosApiService} from "../../../../../pharos-services/pharos-api.service";
import {RouterTestingModule} from "@angular/router/testing";
import {TargetTableModule} from "../../../../modules/targets/target-list.module";
import {SharedModule} from "../../../../../shared/shared.module";
import {ApolloTestingModule} from "apollo-angular/testing";
import {AngularFireModule} from "@angular/fire";
import {COMMON_CONFIG} from "../../../../../../../test/test-config";
import {AngularFireAuth} from "@angular/fire/auth";
import {ActivatedRoute} from "@angular/router";
import {MOCKACTIVATEDROUTE} from "../../../../../../../test/mock-activate-route";
import {AngularFirestore} from "@angular/fire/firestore";
import {FIRESTORESTUB} from "../../../../../../../test/firestore-stub";
import {TESTTARGET, TESTTARGETPROPS} from "../../../../../../../test/test-target";

describe('GoTermsComponent', () => {
  let component: GoTermsComponent;
  let fixture: ComponentFixture<GoTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoTermsComponent ],
      imports: [
        RouterTestingModule,
        TargetTableModule,
        SharedModule,
        ApolloTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        AngularFireAuth,
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE},
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoTermsComponent);
    component = fixture.componentInstance;
    component.target = TESTTARGET;
    component.targetProps = TESTTARGETPROPS;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
