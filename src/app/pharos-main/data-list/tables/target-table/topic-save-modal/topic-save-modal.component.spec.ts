import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicSaveModalComponent } from './topic-save-modal.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

describe('TopicSaveModalComponent', () => {
  let component: TopicSaveModalComponent;
  let fixture: ComponentFixture<TopicSaveModalComponent>;
  const matDialogRefStub = {};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TopicSaveModalComponent
      ],
      imports: [
        MAT_DIALOG_DATA,
        SharedModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicSaveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
