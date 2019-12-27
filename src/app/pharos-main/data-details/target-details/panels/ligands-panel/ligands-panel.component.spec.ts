import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandsPanelComponent } from './ligands-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LigandCardComponent} from '../../../../data-list/cards/ligand-card/ligand-card.component';
import {RouterTestingModule} from '@angular/router/testing';
import {IdgLevelIndicatorComponent} from '../../../../../tools/idg-level-indicator/idg-level-indicator.component';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {AngularFirestore} from '@angular/fire/firestore';
import {MOCKACTIVATEDROUTE} from '../../../../../../../test/mock-activate-route';
import {AngularFireAuth} from '@angular/fire/auth';
import {ActivatedRoute} from '@angular/router';
import {COMMON_CONFIG} from '../../../../../../../test/test-config';
import {FIRESTORESTUB} from '../../../../../../../test/firestore-stub';
import {AngularFireModule} from '@angular/fire';
import {TESTTARGET, TESTTARGETPROPS} from '../../../../../../../test/test-target';

describe('LigandsPanelComponent', () => {
  let component: LigandsPanelComponent;
  let fixture: ComponentFixture<LigandsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        ApolloTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        AngularFireAuth,
        { provide: AngularFirestore, useValue: FIRESTORESTUB },
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ],
      declarations: [
        LigandCardComponent,
        LigandsPanelComponent,
        IdgLevelIndicatorComponent
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandsPanelComponent);
    component = fixture.componentInstance;
    component.data = {targets: TESTTARGET, targetsProps: TESTTARGETPROPS};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
