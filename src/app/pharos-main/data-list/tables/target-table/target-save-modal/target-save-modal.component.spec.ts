import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetSaveModalComponent } from './target-save-modal.component';

describe('TargetSaveModalComponent', () => {
  let component: TargetSaveModalComponent;
  let fixture: ComponentFixture<TargetSaveModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetSaveModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetSaveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
