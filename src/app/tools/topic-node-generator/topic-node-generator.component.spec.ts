import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicNodeGeneratorComponent } from './topic-node-generator.component';
import {SharedModule} from '../../shared/shared.module';
import {AngularFirestore} from '@angular/fire/firestore';
import {FIRESTORESTUB} from '../../../../test/firestore-stub';

describe('TopicNodeGeneratorComponent', () => {
  let component: TopicNodeGeneratorComponent;
  let fixture: ComponentFixture<TopicNodeGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicNodeGeneratorComponent ],
      imports: [
        SharedModule
      ],
      providers: [
        { provide: AngularFirestore, useValue: FIRESTORESTUB }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicNodeGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
