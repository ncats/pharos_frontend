import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermDisplayComponent } from './term-display.component';

describe('TermDisplayComponent', () => {
  let component: TermDisplayComponent;
  let fixture: ComponentFixture<TermDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
