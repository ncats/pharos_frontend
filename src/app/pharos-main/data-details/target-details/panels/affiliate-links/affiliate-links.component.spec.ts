import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateLinksComponent } from './affiliate-links.component';
import {TESTTARGET} from '../../../../../../../test/test-target';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../../../test/mock-activate-route';

describe('AffiliateLinksComponent', () => {
  let component: AffiliateLinksComponent;
  let fixture: ComponentFixture<AffiliateLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE}
      ]
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
