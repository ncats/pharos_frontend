import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityDataPanelComponent } from './community-data-panel.component';

describe('CommunityDataPanelComponent', () => {
  let component: CommunityDataPanelComponent;
  let fixture: ComponentFixture<CommunityDataPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityDataPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityDataPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
