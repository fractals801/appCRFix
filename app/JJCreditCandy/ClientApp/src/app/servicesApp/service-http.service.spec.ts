import { TestBed } from '@angular/core/testing';

import { ServiceHttpService } from './service-http.service';

describe('ServiceHttpService', () => {
  let service: ServiceHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
