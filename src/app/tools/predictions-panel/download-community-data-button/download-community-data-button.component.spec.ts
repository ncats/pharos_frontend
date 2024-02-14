import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadCommunityDataButtonComponent } from './download-community-data-button.component';

describe('DownloadCommunityDataButtonComponent', () => {
  let component: DownloadCommunityDataButtonComponent;
  let fixture: ComponentFixture<DownloadCommunityDataButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadCommunityDataButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
