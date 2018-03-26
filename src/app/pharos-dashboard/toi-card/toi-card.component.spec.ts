import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToiCardComponent } from './toi-card.component';

describe('ToiCardComponent', () => {
  let component: ToiCardComponent;
  let fixture: ComponentFixture<ToiCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToiCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
