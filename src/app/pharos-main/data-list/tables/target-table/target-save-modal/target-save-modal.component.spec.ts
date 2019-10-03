import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetSaveModalComponent } from './target-save-modal.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

describe('TargetSaveModalComponent', () => {
  let component: TargetSaveModalComponent;
  let fixture: ComponentFixture<TargetSaveModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TargetSaveModalComponent
      ],
      imports: [
        SharedModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetSaveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
