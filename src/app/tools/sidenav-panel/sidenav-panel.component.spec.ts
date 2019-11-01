import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavPanelComponent } from './sidenav-panel.component';
import {SharedModule} from '../../shared/shared.module';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {CommonToolsModule} from '../common-tools.module';
import {MockActivatedRoute} from '../../../../test/mock-activate-route';

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
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
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
