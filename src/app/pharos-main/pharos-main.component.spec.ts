import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharosMainComponent } from './pharos-main.component';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {MockActivatedRoute} from '../../../test/mock-activate-route';
import {SharedModule} from '../shared/shared.module';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {ComponentInjectorService} from '../pharos-services/component-injector.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('PharosMainComponent', () => {
  let component: PharosMainComponent;
  let fixture: ComponentFixture<PharosMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      providers: [
        ComponentInjectorService,
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        SharedModule,
        ApolloTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
