import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DiseaseHeaderComponent} from './disease-header.component';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../../test/mock-activate-route';
import {TESTDISEASE} from '../../../../../../test/test-disease';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';

describe('DiseaseHeaderComponent', () => {
  let component: DiseaseHeaderComponent;
  let fixture: ComponentFixture<DiseaseHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE}],
      declarations: [DiseaseHeaderComponent],
      imports: [
        MatDialogModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseHeaderComponent);
    component = fixture.componentInstance;
    component.disease = TESTDISEASE;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
