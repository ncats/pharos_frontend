import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetWordCloudComponent } from './target-word-cloud.component';
import {ApolloTestingModule} from "apollo-angular/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {AngularFireModule} from "@angular/fire/compat";
import {COMMON_CONFIG} from "../../../../../../../test/test-config";
import {ActivatedRoute} from "@angular/router";
import {MOCKACTIVATEDROUTE} from "../../../../../../../test/mock-activate-route";
import {CommunityDataPanelComponent} from "../../../../../tools/community-data-panel/community-data-panel.component";

describe('TargetWordCloudComponent', () => {
  let component: TargetWordCloudComponent;
  let fixture: ComponentFixture<TargetWordCloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule,
        HttpClientTestingModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE}
      ]
    });
    await TestBed.configureTestingModule({
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetWordCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
