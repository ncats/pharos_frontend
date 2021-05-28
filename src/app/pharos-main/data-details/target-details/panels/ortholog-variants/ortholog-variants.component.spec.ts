import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrthologVariantsComponent } from './ortholog-variants.component';
import {TESTTARGET} from '../../../../../../../test/test-target';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../../../test/mock-activate-route';

describe('OrthologVariantsComponent', () => {
  let component: OrthologVariantsComponent;
  let fixture: ComponentFixture<OrthologVariantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE}
      ],
      declarations: [ OrthologVariantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrthologVariantsComponent);
    component = fixture.componentInstance;
    component.target = TESTTARGET;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
