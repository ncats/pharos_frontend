import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExpressionPanelComponent} from './expression-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {SharedDetailsModule} from '../../../../../shared/shared-details.module';
import {DiseaseSourceComponent} from '../disease-source-panel/disease-source-panel.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GenericTableModule} from '../../../../../tools/generic-table/generic-table.module';
import {CommonToolsModule} from '../../../../../tools/common-tools.module';
import {DifferentialPanelComponent} from './differential-panel/differential-panel.component';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {MOCKACTIVATEDROUTE} from '../../../../../../../test/mock-activate-route';
import {FIRESTORESTUB} from '../../../../../../../test/firestore-stub';
import {AngularFirestore} from '@angular/fire/firestore';
import {COMMON_CONFIG} from '../../../../../../../test/test-config';
import {AngularFireModule} from '@angular/fire';
import {TESTTARGET, TESTTARGETPROPS} from '../../../../../../../test/test-target';

describe('ExpressionPanelComponent', () => {
  let component: ExpressionPanelComponent;
  let fixture: ComponentFixture<ExpressionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        SharedDetailsModule,
        GenericTableModule,
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
      declarations: [
        DifferentialPanelComponent,
        ExpressionPanelComponent,
        DiseaseSourceComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionPanelComponent);
    component = fixture.componentInstance;
    component.apiSources = [{label: '', field: '', description: ''}];
    component.data = {targets: TESTTARGET, targetsProps: TESTTARGETPROPS};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
