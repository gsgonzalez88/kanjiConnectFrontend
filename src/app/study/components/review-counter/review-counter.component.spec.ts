import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCounterComponent } from './review-counter.component';

describe('ReviewCounterComponent', () => {
  let component: ReviewCounterComponent;
  let fixture: ComponentFixture<ReviewCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
