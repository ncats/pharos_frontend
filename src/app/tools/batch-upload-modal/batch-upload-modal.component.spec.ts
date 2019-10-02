import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchUploadModalComponent } from './batch-upload-modal.component';
import {SharedModule} from '../../shared/shared.module';

describe('BatchUploadModalComponent', () => {
  let component: BatchUploadModalComponent;
  let fixture: ComponentFixture<BatchUploadModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchUploadModalComponent ],
      imports: [
        SharedModule
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
