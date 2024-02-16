import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavPanelComponent } from './sidenav-panel.component';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {MOCKACTIVATEDROUTE} from '../../../../test/mock-activate-route';
import {AngularFireAuth} from '@angular/fire/compat/auth';

describe('SidenavPanelComponent', () => {
  let component: SidenavPanelComponent;
  let fixture: ComponentFixture<SidenavPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
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
