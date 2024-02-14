import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DiseaseCardComponent } from './disease-card.component';
import {TESTTARGET} from '../../../../../../../../test/test-target';
import {ActivatedRoute} from '@angular/router';
import {MOCKACTIVATEDROUTE} from '../../../../../../../../test/mock-activate-route';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('DiseaseCardComponent', () => {
  let component: DiseaseCardComponent;
  let fixture: ComponentFixture<DiseaseCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: MOCKACTIVATEDROUTE }
      ], imports: [BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseCardComponent);
    component = fixture.componentInstance;
    component.disease = TESTTARGET.diseases[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
