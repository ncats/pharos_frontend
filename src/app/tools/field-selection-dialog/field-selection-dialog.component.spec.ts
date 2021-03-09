import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldSelectionDialogComponent } from './field-selection-dialog.component';

describe('FieldSelectionDialogComponent', () => {
  let component: FieldSelectionDialogComponent;
  let fixture: ComponentFixture<FieldSelectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldSelectionDialogComponent ]
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
