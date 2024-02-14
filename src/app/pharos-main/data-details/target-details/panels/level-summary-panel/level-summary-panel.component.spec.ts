import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelSummaryPanelComponent } from './level-summary-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {IdgLevelIndicatorComponent} from '../../../../../tools/idg-level-indicator/idg-level-indicator.component';
import {CommonToolsModule} from '../../../../../tools/common-tools.module';
import {TdarkSummaryComponent} from './levels/tdark-summary/tdark-summary.component';
import {TbioSummaryComponent} from './levels/tbio-summary/tbio-summary.component';
import {TchemSummaryComponent} from './levels/tchem-summary/tchem-summary.component';
import {TclinSummaryComponent} from './levels/tclin-summary/tclin-summary.component';
import {TESTTARGET, TESTTARGETPROPS} from '../../../../../../../test/test-target';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {MOCKACTIVATEDROUTE} from '../../../../../../../test/mock-activate-route';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {ActivatedRoute} from '@angular/router';
import {COMMON_CONFIG} from '../../../../../../../test/test-config';
import {FIRESTORESTUB} from '../../../../../../../test/firestore-stub';
import {AngularFireModule} from '@angular/fire/compat';

describe('LevelSummaryPanelComponent', () => {
  let component: LevelSummaryPanelComponent;
  let fixture: ComponentFixture<LevelSummaryPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        CommonToolsModule,
        ApolloTestingModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
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
    fixture = TestBed.createComponent(LevelSummaryPanelComponent);
    component = fixture.componentInstance;
    component.data = {targets: TESTTARGET, targetsProps: TESTTARGETPROPS};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
