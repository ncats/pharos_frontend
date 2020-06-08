import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreListButtonComponent } from './explore-list-button.component';

describe('ExploreListButtonComponent', () => {
  let component: ExploreListButtonComponent;
  let fixture: ComponentFixture<ExploreListButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreListButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreListButtonComponent);
    component = fixture.componentInstance;
    component.path = "/diseases";
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
