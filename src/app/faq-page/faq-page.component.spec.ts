import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FaqPageComponent} from './faq-page.component';
import {SharedModule} from '../shared/shared.module';
import {KatexRenderService} from '../tools/equation-renderer/services/katex-render.service';
import {FIRESTORESTUB} from '../../../test/firestore-stub';
import {AngularFirestore} from '@angular/fire/firestore';

describe('FaqPageComponent', () => {
  let component: FaqPageComponent;
  let fixture: ComponentFixture<FaqPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [
        FaqPageComponent
      ],
      providers: [
        KatexRenderService,
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqPageComponent);
    component = fixture.componentInstance;
    component.subjects = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
