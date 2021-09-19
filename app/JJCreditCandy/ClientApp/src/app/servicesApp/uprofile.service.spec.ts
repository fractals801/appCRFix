import { TestBed } from '@angular/core/testing';

import { UprofileService } from './uprofile.service';

describe('UprofileService', () => {
  let service: UprofileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UprofileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
