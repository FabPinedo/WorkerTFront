import { TestBed } from '@angular/core/testing';

import { RegistrotareoService } from './registrotareo.service';

describe('RegistrotareoService', () => {
  let service: RegistrotareoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrotareoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
