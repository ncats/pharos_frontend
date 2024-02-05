import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LigandHeaderComponent } from './ligand-header.component';
import {TESTLIGAND} from '../../../../../../test/test-ligand';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {UnfurlingMetaService} from '../../../../pharos-services/unfurling-meta.service';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../../../../shared/shared.module';
import {GenericTableModule} from '../../../../tools/generic-table/generic-table.module';
import {RadarChartModule} from '../../../../tools/visualizations/radar-chart/radar-chart.module';
import {AngularFireModule} from '@angular/fire/compat';
import {COMMON_CONFIG} from '../../../../../../test/test-config';
import {PharosApiService} from '../../../../pharos-services/pharos-api.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../../test/mock-activate-route';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {FIRESTORESTUB} from '../../../../../../test/firestore-stub';
import {MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef} from '@angular/material/legacy-dialog';

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
      declarations: [ LigandHeaderComponent ],
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
