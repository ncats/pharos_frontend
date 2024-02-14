import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LigandHeaderComponent } from './ligand-header.component';
import {TESTLIGAND} from '../../../../../../test/test-ligand';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {UnfurlingMetaService} from '../../../../pharos-services/unfurling-meta.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../../test/mock-activate-route';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';

describe('LigandHeaderComponent', () => {
  let component: LigandHeaderComponent;
  let fixture: ComponentFixture<LigandHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        RouterTestingModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        UnfurlingMetaService,
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
        ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandHeaderComponent);
    component = fixture.componentInstance;
    component.ligand = TESTLIGAND;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
