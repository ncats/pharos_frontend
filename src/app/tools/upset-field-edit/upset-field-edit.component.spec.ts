import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsetFieldEditComponent } from './upset-field-edit.component';

describe('UpsetFieldEditComponent', () => {
  let component: UpsetFieldEditComponent;
  let fixture: ComponentFixture<UpsetFieldEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsetFieldEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsetFieldEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
