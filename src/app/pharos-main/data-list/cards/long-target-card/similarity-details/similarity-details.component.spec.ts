import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SimilarityDetailsComponent} from './similarity-details.component';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FIRESTORESTUB} from "../../../../../../../test/firestore-stub";
import {AngularFireModule} from "@angular/fire/compat";
import {COMMON_CONFIG} from "../../../../../../../test/test-config";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {TESTTARGET} from "../../../../../../../test/test-target";

describe('SimilarityDetailsComponent', () => {
  let component: SimilarityDetailsComponent;
  let fixture: ComponentFixture<SimilarityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        {provide: AngularFirestore, useValue: FIRESTORESTUB},
        AngularFireAuth,
        {provide: AngularFirestore, useValue: FIRESTORESTUB},
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarityDetailsComponent);
    component = fixture.componentInstance;
    component.target = TESTTARGET;
    component.similarityTarget = TESTTARGET;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
