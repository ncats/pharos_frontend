import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsPanelComponent } from './news-panel.component';
import {SharedModule} from "../../shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FirestoreStub} from "../../../../test/firestore-stub";
import {AngularFirestore} from "angularfire2/firestore";

describe('NewsPanelComponent', () => {
  let component: NewsPanelComponent;
  let fixture: ComponentFixture<NewsPanelComponent>;
  let angularFirestore: AngularFirestore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SharedModule
      ],
      declarations: [ NewsPanelComponent ],
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsPanelComponent);
    angularFirestore = TestBed.get(AngularFirestore);
    component = fixture.componentInstance;
 //   angularFirestore.collection('public').valueChanges().subscribe(res => component.items = res);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
