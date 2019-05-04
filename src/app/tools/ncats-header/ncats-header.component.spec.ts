import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcatsHeaderComponent } from './ncats-header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedModule} from '../../shared/shared.module';
import {SuggestApiService} from '../search-component/suggest-api.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('NcatsHeaderComponent', () => {
  let component: NcatsHeaderComponent;
  let fixture: ComponentFixture<NcatsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        SharedModule
      ],
      declarations: [ ],
      providers: [
        SuggestApiService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcatsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
