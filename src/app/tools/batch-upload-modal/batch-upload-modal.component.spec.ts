import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchUploadModalComponent } from './batch-upload-modal.component';

describe('BatchUploadModalComponent', () => {
  let component: BatchUploadModalComponent;
  let fixture: ComponentFixture<BatchUploadModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchUploadModalComponent ]
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
