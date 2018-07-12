import { TestBed, inject } from '@angular/core/testing';

import { DataConnectionService } from './data-connection.service';
import {WebSocketService} from './websocket.service';

describe('DataConnectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WebSocketService,
        DataConnectionService]
    });
  });

  it('should ...', inject([DataConnectionService], (service: DataConnectionService) => {
    expect(service).toBeTruthy();
  }));
});
