import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceLogoComponent } from './sequence-logo.component';

describe('SequenceLogoComponent', () => {
  let component: SequenceLogoComponent;
  let fixture: ComponentFixture<SequenceLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenceLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
