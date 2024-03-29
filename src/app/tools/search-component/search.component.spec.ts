import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import {CommonModule} from '@angular/common';
import {SuggestApiService} from './suggest-api.service';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Apollo} from "apollo-angular";
import {SelectedFacetService} from "../../pharos-main/data-list/filter-panel/selected-facet.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FIRESTORESTUB} from "../../../../test/firestore-stub";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {COMMON_CONFIG} from "../../../../test/test-config";

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        CommonModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)
      ],
      providers: [
        SuggestApiService,
        Apollo,
        SelectedFacetService,
        AngularFireAuth,
        { provide: AngularFirestore, useValue: FIRESTORESTUB },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
