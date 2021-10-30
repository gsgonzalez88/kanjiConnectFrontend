import { TestBed } from '@angular/core/testing';

import { ExpressionCardService } from './review-card.service';

describe('ExpressionCardService', () => {
  let service: ExpressionCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpressionCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
