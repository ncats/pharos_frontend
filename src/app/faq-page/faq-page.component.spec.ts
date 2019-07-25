import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FaqPageComponent} from './faq-page.component';
import {SharedModule} from '../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from '../app-routing.module';
import {APP_BASE_HREF} from '@angular/common';
import {KatexRenderService} from '../tools/equation-renderer/services/katex-render.service';
import {FirestoreStub} from '../../../test/firestore-stub';
import {AngularFirestore} from '@angular/fire/firestore';

describe('FaqPageComponent', () => {
  let component: FaqPageComponent;
  let fixture: ComponentFixture<FaqPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        AppRoutingModule
      ],
      declarations: [
        FaqPageComponent
      ],
      providers: [
        KatexRenderService,
        { provide: AngularFirestore, useValue: FirestoreStub },
        {provide: APP_BASE_HREF, useValue: '/index' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
