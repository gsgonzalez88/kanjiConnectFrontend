import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitivitySelectComponent } from './transitivity-select.component';

describe('TransitivitySelectComponent', () => {
  let component: TransitivitySelectComponent;
  let fixture: ComponentFixture<TransitivitySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransitivitySelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitivitySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
