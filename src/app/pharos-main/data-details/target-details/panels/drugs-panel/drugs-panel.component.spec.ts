import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsPanelComponent } from './drugs-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GenericTableModule} from '../../../../../tools/generic-table/generic-table.module';
import {LigandCardComponent} from '../../../../data-list/cards/ligand-card/ligand-card.component';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {IdgLevelIndicatorComponent} from '../../../../../tools/idg-level-indicator/idg-level-indicator.component';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {MOCKACTIVATEDROUTE} from '../../../../../../../test/mock-activate-route';
import {AngularFireAuth} from '@angular/fire/auth';
import {FIRESTORESTUB} from '../../../../../../../test/firestore-stub';
import {AngularFirestore} from '@angular/fire/firestore';
import {COMMON_CONFIG} from '../../../../../../../test/test-config';
import {AngularFireModule} from '@angular/fire';
import {TESTTARGET, TESTTARGETPROPS} from '../../../../../../../test/test-target';

describe('DrugsPanelComponent', () => {
  let component: DrugsPanelComponent;
  let fixture: ComponentFixture<DrugsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        SharedModule,
        GenericTableModule,
        ApolloTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      declarations: [
        LigandCardComponent,
        DrugsPanelComponent,
        IdgLevelIndicatorComponent
      ],
      providers: [
        AngularFireAuth,
        { provide: AngularFirestore, useValue: FIRESTORESTUB },
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsPanelComponent);
    component = fixture.componentInstance;
    component.data = {targets: TESTTARGET, targetsProps: TESTTARGETPROPS};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
