import { TestBed } from '@angular/core/testing';

import { Helado } from './helado';

describe('Helado', () => {
  let service: Helado;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Helado);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
