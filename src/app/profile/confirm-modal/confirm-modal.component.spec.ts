import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmModalComponent } from './confirm-modal.component';
import {BatchUploadModalComponent} from '../../tools/batch-upload-modal/batch-upload-modal.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../../shared/shared.module';
import {MatDialogRef} from '@angular/material/dialog';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;
  const matDialogRefStub = {};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmModalComponent],
      imports: [
        BrowserAnimationsModule,
        SharedModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: matDialogRefStub},
      ]
    })
      .compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
