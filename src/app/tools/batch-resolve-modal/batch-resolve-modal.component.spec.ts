import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchResolveModalComponent } from './batch-resolve-modal.component';

describe('BatchResolveModalComponent', () => {
  let component: BatchResolveModalComponent;
  let fixture: ComponentFixture<BatchResolveModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchResolveModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchResolveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
