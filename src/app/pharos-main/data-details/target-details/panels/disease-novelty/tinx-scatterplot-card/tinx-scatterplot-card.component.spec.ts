import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinxScatterplotCardComponent } from './tinx-scatterplot-card.component';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../../../../test/mock-activate-route';

describe('TinxScatterplotCardComponent', () => {
  let component: TinxScatterplotCardComponent;
  let fixture: ComponentFixture<TinxScatterplotCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TinxScatterplotCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
