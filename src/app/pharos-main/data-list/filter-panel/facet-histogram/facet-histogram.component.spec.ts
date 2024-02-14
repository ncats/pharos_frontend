import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ApolloTestingModule} from "apollo-angular/testing";
import {FacetHistogramComponent} from './facet-histogram.component';
import {RouterTestingModule} from "@angular/router/testing";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FIRESTORESTUB} from "../../../../../../test/firestore-stub";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {COMMON_CONFIG} from "../../../../../../test/test-config";
import {TESTFACET} from '../../../../../../test/test-facet';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FacetHistogramComponent', () => {
  let component: FacetHistogramComponent;
  let fixture: ComponentFixture<FacetHistogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(COMMON_CONFIG),
        HttpClientTestingModule
      ],
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
