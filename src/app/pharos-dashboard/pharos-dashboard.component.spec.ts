import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharosDashboardComponent } from './pharos-dashboard.component';

describe('PharosDashboardComponent', () => {
  let component: PharosDashboardComponent;
  let fixture: ComponentFixture<PharosDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharosDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharosDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
