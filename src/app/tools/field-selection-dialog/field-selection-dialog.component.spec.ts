import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {FieldSelectionDialogComponent} from './field-selection-dialog.component';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {FIRESTORESTUB} from '../../../../test/firestore-stub';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../../test/test-config';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {MOCKACTIVATEDROUTE} from '../../../../test/mock-activate-route';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FieldSelectionDialogComponent', () => {
  let component: FieldSelectionDialogComponent;
  let fixture: ComponentFixture<FieldSelectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG),
      ],
      providers:
        [
          AngularFireAuth,
          {provide: AngularFirestore, useValue: FIRESTORESTUB},
          {provide: MAT_DIALOG_DATA, useValue: {route: MOCKACTIVATEDROUTE}},
          {provide: MatDialogRef, useValue: {}}
          ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
