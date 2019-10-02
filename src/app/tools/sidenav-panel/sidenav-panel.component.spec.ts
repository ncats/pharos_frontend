import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavPanelComponent } from './sidenav-panel.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('SidenavPanelComponent', () => {
  let component: SidenavPanelComponent;
  let fixture: ComponentFixture<SidenavPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavPanelComponent ],
      imports: [
        SharedModule
      ],
      providers: [
        {provide: RouterModule, useClass: RouterTestingModule}
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
