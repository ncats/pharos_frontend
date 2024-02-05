import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModelDetailsComponent } from './model-details.component';
import {SharedModule} from '../../shared/shared.module';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from '@angular/material/legacy-dialog';

describe('ModelDetailsComponent', () => {
  let component: ModelDetailsComponent;
  let fixture: ComponentFixture<ModelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelDetailsComponent ],
      imports: [
        SharedModule,
      ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {modelChemblId: 'CHEMBL1833'}},
        {provide: MatDialogRef, useValue: {}},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelDetailsComponent);
    component = fixture.componentInstance;
    component.modelDetails = {};
    component.modelDetails.references = '';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
