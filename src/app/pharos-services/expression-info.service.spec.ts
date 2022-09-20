import { TestBed } from '@angular/core/testing';

import { ExpressionInfoService } from './expression-info.service';

describe('ExpressionInfoService', () => {
  let service: ExpressionInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpressionInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
