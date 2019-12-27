import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetFacetPanelComponent } from './target-facet-panel.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {GenericTableModule} from '../../../../../tools/generic-table/generic-table.module';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFirestore} from '@angular/fire/firestore';
import {MOCKACTIVATEDROUTE} from '../../../../../../../test/mock-activate-route';
import {AngularFireAuth} from '@angular/fire/auth';
import {ActivatedRoute} from '@angular/router';
import {COMMON_CONFIG} from '../../../../../../../test/test-config';
import {FIRESTORESTUB} from '../../../../../../../test/firestore-stub';
import {AngularFireModule} from '@angular/fire';
import {TESTTARGET, TESTTARGETPROPS} from '../../../../../../../test/test-target';

describe('TargetFacetPanelComponent', () => {
  let component: TargetFacetPanelComponent;
  let fixture: ComponentFixture<TargetFacetPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        GenericTableModule,
        ApolloTestingModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        AngularFireAuth,
        { provide: AngularFirestore, useValue: FIRESTORESTUB },
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ],
      declarations: [ TargetFacetPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetFacetPanelComponent);
    component = fixture.componentInstance;
    component.data = {targets: TESTTARGET, targetsProps: TESTTARGETPROPS};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
