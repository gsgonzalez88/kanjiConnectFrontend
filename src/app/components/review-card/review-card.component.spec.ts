import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionCardComponent } from './review-card.component';

describe('ExpressionCardComponent', () => {
  let component: ExpressionCardComponent;
  let fixture: ComponentFixture<ExpressionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpressionCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
