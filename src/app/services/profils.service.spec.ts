import { TestBed } from '@angular/core/testing';

import { ProfilService } from './profils.service';

describe('ProfilsService', () => {
  let service: ProfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
