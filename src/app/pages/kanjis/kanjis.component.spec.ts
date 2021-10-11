import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjisComponent } from './kanjis.component';

describe('KanjisComponent', () => {
  let component: KanjisComponent;
  let fixture: ComponentFixture<KanjisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanjisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanjisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
