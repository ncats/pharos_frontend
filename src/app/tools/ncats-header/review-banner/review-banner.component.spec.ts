import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewBannerComponent } from './review-banner.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ReviewBannerComponent', () => {
  let component: ReviewBannerComponent;
  let fixture: ComponentFixture<ReviewBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewBannerComponent, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
