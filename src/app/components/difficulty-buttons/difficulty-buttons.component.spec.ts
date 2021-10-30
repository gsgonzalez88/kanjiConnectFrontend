import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultyButtonsComponent } from './difficulty-buttons.component';

describe('DifficultyButtonsComponent', () => {
  let component: DifficultyButtonsComponent;
  let fixture: ComponentFixture<DifficultyButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DifficultyButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DifficultyButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
