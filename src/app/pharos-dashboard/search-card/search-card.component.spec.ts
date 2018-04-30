import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchCardComponent } from './search-card.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../../shared/shared.module';
import {EnvironmentVariablesService} from '../../pharos-services/environment-variables.service';
import {SuggestApiService} from '../../tools/search-component/suggest-api.service';
import {AppRoutingModule} from '../../app-routing.module';
import {PharosDashboardComponent} from '../pharos-dashboard.component';
import {ToiCardComponent} from '../toi-card/toi-card.component';
import {ToiDashboardComponent} from '../../pharos-topics/toi-dashboard/toi-dashboard.component';
import {APP_BASE_HREF} from '@angular/common';

describe('SearchCardComponent', () => {
  let component: SearchCardComponent;
  let fixture: ComponentFixture<SearchCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        AppRoutingModule
      ],
      declarations: [
        PharosDashboardComponent,
        ToiDashboardComponent,
        ToiCardComponent,
        SearchCardComponent
      ],
      providers: [
        SuggestApiService,
        EnvironmentVariablesService,
        {provide: APP_BASE_HREF, useValue: '/index' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
