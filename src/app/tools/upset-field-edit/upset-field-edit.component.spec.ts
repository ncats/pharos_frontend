import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UpsetFieldEditComponent} from './upset-field-edit.component';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../test/mock-activate-route';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from '@angular/material/legacy-dialog';
import {Facet} from '../../models/facet';

describe('UpsetFieldEditComponent', () => {
  let component: UpsetFieldEditComponent;
  let fixture: ComponentFixture<UpsetFieldEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpsetFieldEditComponent],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {
          provide: MAT_DIALOG_DATA, useValue: {
            facet: {values: [], facet: 'Regular Facet', count: 3, upSets: [], dataType: 'numeric'} as Facet,
            selectedValues: ['A', 'B']
          }
        },
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsetFieldEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
