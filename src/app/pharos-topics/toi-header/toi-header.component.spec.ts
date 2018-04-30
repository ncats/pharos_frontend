import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToiHeaderComponent } from './toi-header.component';

describe('ToiHeaderComponent', () => {
  let component: ToiHeaderComponent;
  let fixture: ComponentFixture<ToiHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToiHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToiHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
