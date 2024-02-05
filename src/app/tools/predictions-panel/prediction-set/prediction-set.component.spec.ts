import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionSetComponent } from './prediction-set.component';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef} from "@angular/material/legacy-dialog";
import {AngularFireModule} from "@angular/fire/compat";
import {COMMON_CONFIG} from "../../../../../test/test-config";
import {MatLegacySnackBarModule as MatSnackBarModule} from "@angular/material/legacy-snack-bar";
import {ActivatedRoute} from "@angular/router";
import {MOCKACTIVATEDROUTE} from "../../../../../test/mock-activate-route";
import {RouterTestingModule} from "@angular/router/testing";

describe('PredictionSetComponent', () => {
  let component: PredictionSetComponent;
  let fixture: ComponentFixture<PredictionSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,MatSnackBarModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      declarations: [ PredictionSetComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
