import { TestBed } from '@angular/core/testing';

import { PdbApiService } from './pdb-api.service';
import {HttpLink} from "apollo-angular-link-http";
import {HTTPLINKSTUB} from "../../../test/httpLink-stub";

describe('PdbApiService', () => {
  let service: PdbApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpLink, useValue: HTTPLINKSTUB}
      ]}
      );
    service = TestBed.inject(PdbApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
