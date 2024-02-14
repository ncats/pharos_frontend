import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataVersionCardComponent } from './data-version-card.component';

describe('DataVersionCardComponent', () => {
  let component: DataVersionCardComponent;
  let fixture: ComponentFixture<DataVersionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataVersionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
