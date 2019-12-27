import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavPanelComponent } from './sidenav-panel.component';
import {SharedModule} from '../../shared/shared.module';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonToolsModule} from '../common-tools.module';
import {MOCKACTIVATEDROUTE} from '../../../../test/mock-activate-route';
import {AngularFireAuth} from '@angular/fire/auth';

describe('SidenavPanelComponent', () => {
  let component: SidenavPanelComponent;
  let fixture: ComponentFixture<SidenavPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavPanelComponent ],
      imports: [
        SharedModule,
        CommonToolsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
