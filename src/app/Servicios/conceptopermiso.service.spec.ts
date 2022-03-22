import { TestBed } from '@angular/core/testing';

import { ConceptopermisoService } from './conceptopermiso.service';

describe('ConceptopermisoService', () => {
  let service: ConceptopermisoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConceptopermisoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
