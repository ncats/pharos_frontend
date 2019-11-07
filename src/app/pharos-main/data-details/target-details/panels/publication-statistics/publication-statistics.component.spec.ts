import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationStatisticsComponent } from './publication-statistics.component';

describe('PublicationStatisticsComponent', () => {
  let component: PublicationStatisticsComponent;
  let fixture: ComponentFixture<PublicationStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
