import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseNoveltyComponent } from './disease-novelty.component';
import {ActivatedRoute} from "@angular/router";
import {MOCKACTIVATEDROUTE} from "../../../../../../../test/mock-activate-route";

describe('DiseaseNoveltyComponent', () => {
  let component: DiseaseNoveltyComponent;
  let fixture: ComponentFixture<DiseaseNoveltyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseaseNoveltyComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseNoveltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
