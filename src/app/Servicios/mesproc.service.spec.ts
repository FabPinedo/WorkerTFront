import { TestBed } from '@angular/core/testing';

import { MesprocService } from './mesproc.service';

describe('MesprocService', () => {
  let service: MesprocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesprocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
