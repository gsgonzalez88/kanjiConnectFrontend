import { TestBed } from '@angular/core/testing';

import { GenericInputService } from './generic-input.service';

describe('GenericInputService', () => {
  let service: GenericInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
