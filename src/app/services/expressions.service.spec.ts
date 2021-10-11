import { TestBed } from '@angular/core/testing';

import { ExpressionsService } from './expressions.service';

describe('ExpressionsService', () => {
  let service: ExpressionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpressionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
