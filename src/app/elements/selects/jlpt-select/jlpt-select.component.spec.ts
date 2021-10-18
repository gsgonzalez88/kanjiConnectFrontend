import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JlptSelectComponent } from './jlpt-select.component';

describe('JlptSelectComponent', () => {
  let component: JlptSelectComponent;
  let fixture: ComponentFixture<JlptSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JlptSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JlptSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
