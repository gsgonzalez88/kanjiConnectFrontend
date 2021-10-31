import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCardPopupComponent } from './review-card-popup.component';

describe('ReviewCardPopupComponent', () => {
  let component: ReviewCardPopupComponent;
  let fixture: ComponentFixture<ReviewCardPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewCardPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewCardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
