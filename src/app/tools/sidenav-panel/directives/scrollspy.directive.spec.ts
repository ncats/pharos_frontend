import { ScrollspyDirective } from './scrollspy.directive';
import {ElementRef, Inject, NgZone, PLATFORM_ID} from "@angular/core";
import {DOCUMENT} from "@angular/common";
import {async, TestBed} from '@angular/core/testing';
import {SharedModule} from '../../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {SidenavPanelComponent} from '../sidenav-panel.component';
import {RouterModule} from '@angular/router';
const mockDocument = { location: 'targets'};

describe('ScrollspyDirective', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavPanelComponent ],
      imports: [
        SharedModule
      ],
      providers: [
        { provide: DOCUMENT, useValue: mockDocument },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ]
    })
      .compileComponents();
  }));

  it('should create an instance', () => {
    const directive = new ScrollspyDirective(null, null, null, PLATFORM_ID);
    expect(directive).toBeTruthy();
  });
});
