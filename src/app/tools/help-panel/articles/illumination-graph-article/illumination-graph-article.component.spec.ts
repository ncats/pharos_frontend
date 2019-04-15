import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IlluminationGraphARTICLEComponent } from './illumination-graph-article.component';

describe('IlluminationGraphARTICLEComponent', () => {
  let component: IlluminationGraphARTICLEComponent;
  let fixture: ComponentFixture<IlluminationGraphARTICLEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IlluminationGraphARTICLEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IlluminationGraphARTICLEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
