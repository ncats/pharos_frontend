import { TestBed, inject } from '@angular/core/testing';

import { TablePaginationService } from './table-pagination.service';

describe('TablePaginationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TablePaginationService]
    });
  });

  it('should be created', inject([TablePaginationService], (service: TablePaginationService) => {
    expect(service).toBeTruthy();
  }));
});
