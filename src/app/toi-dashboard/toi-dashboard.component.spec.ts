import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToiDashboardComponent } from './toi-dashboard.component';

describe('ToiDashboardComponent', () => {
  let component: ToiDashboardComponent;
  let fixture: ComponentFixture<ToiDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToiDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToiDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
