import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateLinkComponent } from './affiliate-link.component';

describe('AffiliateLinkComponent', () => {
  let component: AffiliateLinkComponent;
  let fixture: ComponentFixture<AffiliateLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffiliateLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliateLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
