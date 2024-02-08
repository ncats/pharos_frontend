import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../test/mock-activate-route';
import {PharosApiService} from '../../../pharos-services/pharos-api.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {FIRESTORESTUB} from '../../../../../test/firestore-stub';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../../../shared/shared.module';

describe('SearchComponentComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        SharedModule
      ],
      providers: [
        PharosApiService,
        AngularFireAuth,
        {provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE},
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ],
      declarations: [ SearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    component.data = {
      targetFacets: [],
      diseaseFacets: [],
      ligandFacets: [],
      targets: {count: 0},
      diseases: {count: 0},
      ligands: {count: 0}
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
