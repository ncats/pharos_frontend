import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateLinksComponent } from './affiliate-links.component';
import {TESTTARGET} from '../../../../../../../test/test-target';

describe('AffiliateLinksComponent', () => {
  let component: AffiliateLinksComponent;
  let fixture: ComponentFixture<AffiliateLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffiliateLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliateLinksComponent);
    component = fixture.componentInstance;
    component.target = TESTTARGET;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
