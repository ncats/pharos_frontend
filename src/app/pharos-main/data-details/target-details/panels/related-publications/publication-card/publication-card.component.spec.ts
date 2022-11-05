import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationCardComponent } from './publication-card.component';

describe('PublicationCardComponent', () => {
  let component: PublicationCardComponent;
  let fixture: ComponentFixture<PublicationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicationCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
