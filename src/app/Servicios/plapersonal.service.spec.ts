import { TestBed } from '@angular/core/testing';

import { PlapersonalService } from './plapersonal.service';

describe('PlapersonalService', () => {
  let service: PlapersonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlapersonalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
