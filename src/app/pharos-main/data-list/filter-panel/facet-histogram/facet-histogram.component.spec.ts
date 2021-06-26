import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FacetHistogramComponent} from './facet-histogram.component';
import {RouterTestingModule} from "@angular/router/testing";
import {AngularFirestore} from "@angular/fire/firestore";
import {FIRESTORESTUB} from "../../../../../../test/firestore-stub";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFireModule} from "@angular/fire";
import {COMMON_CONFIG} from "../../../../../../test/test-config";

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
    component.facet = {facet: 'tim', values: [{name: 'tim'}], count: 40, min: 0, max: 48, binSize: 2, dataType: 'Category', upSets: []};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
