import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchUploadModalComponent } from './batch-upload-modal.component';
import {SharedModule} from '../../shared/shared.module';
import {MatDialogRef} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('BatchUploadModalComponent', () => {
  let component: BatchUploadModalComponent;
  let fixture: ComponentFixture<BatchUploadModalComponent>;
  const matDialogRefStub = {};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchUploadModalComponent ],
      imports: [
        BrowserAnimationsModule,
        SharedModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchUploadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
