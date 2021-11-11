import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FacetHistogramComponent} from './facet-histogram.component';
import {RouterTestingModule} from "@angular/router/testing";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FIRESTORESTUB} from "../../../../../../test/firestore-stub";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {COMMON_CONFIG} from "../../../../../../test/test-config";
import {TESTFACET} from '../../../../../../test/test-facet';

describe('FacetHistogramComponent', () => {
  let component: FacetHistogramComponent;
  let fixture: ComponentFixture<FacetHistogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG)],
      declarations: [FacetHistogramComponent],
      providers: [{provide: AngularFirestore, useValue: FIRESTORESTUB}, AngularFireAuth]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetHistogramComponent);
    component = fixture.componentInstance;
    component.facet = TESTFACET;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
