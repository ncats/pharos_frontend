import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SimilarityDetailsComponent} from './similarity-details.component';
import {AngularFirestore} from "@angular/fire/firestore";
import {FIRESTORESTUB} from "../../../../../../../test/firestore-stub";
import {AngularFireModule} from "@angular/fire";
import {COMMON_CONFIG} from "../../../../../../../test/test-config";
import {AngularFireAuth} from "@angular/fire/auth";
import {TESTTARGET} from "../../../../../../../test/test-target";

fdescribe('SimilarityDetailsComponent', () => {
  let component: SimilarityDetailsComponent;
  let fixture: ComponentFixture<SimilarityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      declarations: [SimilarityDetailsComponent],
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
