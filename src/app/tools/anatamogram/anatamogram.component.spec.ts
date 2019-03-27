import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnatamogramComponent } from './anatamogram.component';

describe('AnatamogramComponent', () => {
  let component: AnatamogramComponent;
  let fixture: ComponentFixture<AnatamogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnatamogramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnatamogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
