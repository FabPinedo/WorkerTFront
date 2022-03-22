import { TestBed } from '@angular/core/testing';

import { RegistrotareorefriService } from './registrotareorefri.service';

describe('RegistrotareorefriService', () => {
  let service: RegistrotareorefriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrotareorefriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
