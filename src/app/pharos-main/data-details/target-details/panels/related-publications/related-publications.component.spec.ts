import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedPublicationsComponent } from './related-publications.component';

describe('RelatedPublicationsComponent', () => {
  let component: RelatedPublicationsComponent;
  let fixture: ComponentFixture<RelatedPublicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedPublicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
