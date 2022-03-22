import { TestBed } from '@angular/core/testing';

import { UsuarioempService } from './usuarioemp.service';

describe('UsuarioempService', () => {
  let service: UsuarioempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
