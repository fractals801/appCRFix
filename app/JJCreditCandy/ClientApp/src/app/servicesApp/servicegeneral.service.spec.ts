import { TestBed } from '@angular/core/testing';

import { ServicegeneralService } from './servicegeneral.service';

describe('ServicegeneralService', () => {
  let service: ServicegeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicegeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
