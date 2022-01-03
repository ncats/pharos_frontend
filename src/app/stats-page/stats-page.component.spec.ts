import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsPageComponent } from './stats-page.component';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../test/mock-activate-route';

describe('StatsPageComponent', () => {
  let component: StatsPageComponent;
  let fixture: ComponentFixture<StatsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE}
      ],
      declarations: [ StatsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
