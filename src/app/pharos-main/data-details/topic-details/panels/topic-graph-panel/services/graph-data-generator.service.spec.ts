import { TestBed } from '@angular/core/testing';

import { GraphDataGeneratorService } from './graph-data-generator.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('GraphDataGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient, useClass: HttpClientTestingModule }
    ]
  }));

  it('should be created', () => {
    const service: GraphDataGeneratorService = TestBed.get(GraphDataGeneratorService);
    expect(service).toBeTruthy();
  });
});
