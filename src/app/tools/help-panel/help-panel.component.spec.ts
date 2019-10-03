import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpPanelComponent } from './help-panel.component';
import {SharedModule} from '../../shared/shared.module';
import {CommonToolsModule} from '../common-tools.module';
import {HelpArticlesModule} from '../../shared/help-articles.module';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentInjectorService} from '../../pharos-services/component-injector.service';

describe('HelpPanelComponent', () => {
  let component: HelpPanelComponent;
  let fixture: ComponentFixture<HelpPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HelpPanelComponent
      ],
      imports: [
        HttpClientTestingModule,
        SharedModule,
        NgxJsonViewerModule,
        HelpArticlesModule
      ],
      providers: [
        ComponentInjectorService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
