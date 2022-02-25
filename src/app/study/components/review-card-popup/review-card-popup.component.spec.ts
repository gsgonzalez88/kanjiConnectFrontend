import { Component, Input, Output } from '@angular/core';
import { ComponentFixture, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { Difficulty, FetchedDataState } from 'src/app/shared/models/custom-types.model';
import { ExpressionsService } from '../../services/expressions.service';
import { ExpressionCardService } from '../review-card/review-card.service';
import { ReviewCardPopupComponent } from './review-card-popup.component';

const mockData = {
  reviewData: [{ test: 'test' }],
  type: 'expression',
}

const mockData2 = {
  reviewData: [],
  type: 'expression',
}

fdescribe('ReviewCardPopupComponent', () => {
  let component: ReviewCardPopupComponent;
  let fixture: ComponentFixture<ReviewCardPopupComponent>;
  let matDialogRefMock: MatDialogRef<ReviewCardPopupComponent>;
  let expressionCardServiceMock;
  let expressionsServiceMock: any;
  let matSnackBarMock: MatSnackBar;

  @Component({ selector: 'app-review-counter', template: `` })
  class ReviewCounterMockComponent {
    @Input() total: number;
    @Input() currentIndex: number;
    @Input() fetchedDataState: FetchedDataState;
  }

  @Component({ selector: 'app-main-button', template: `` })
  class MainButtonMockComponent {
    @Input() text: string;
    @Input() disable: boolean;
  }

  @Component({ selector: 'app-difficulty-buttons', template: `` })
  class DifficultyButtonsMockComponent {
    @Input() difficulty: Difficulty;
    @Output() updatedDifficulty: any;
  }


  beforeEach(waitForAsync(() => {
    matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
    expressionCardServiceMock = jasmine.createSpyObj('ExpressionCardService', ['generateCardData']);
    expressionsServiceMock = jasmine.createSpyObj('ExpressionsService', ['update']);
    expressionsServiceMock.update.and.returnValue(of('test'));
    matSnackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [ReviewCardPopupComponent, ReviewCounterMockComponent, MainButtonMockComponent, DifficultyButtonsMockComponent],
      imports: [MatDialogModule, MatIconModule],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: ExpressionCardService, useValue: expressionCardServiceMock },
        { provide: ExpressionsService, useValue: expressionsServiceMock },
        { provide: MatSnackBar, useValue: matSnackBarMock },
      ]
    })
    .compileComponents();
    TestBed.overrideProvider(MAT_DIALOG_DATA, { useValue: mockData });
  }));

  it('should create and set properties', () => {
    TestBed.overrideProvider(MAT_DIALOG_DATA, { useValue: mockData2 });
    
    
    fixture = TestBed.createComponent(ReviewCardPopupComponent);
    component = fixture.componentInstance;
    const spyShowCardFront = spyOn(component, 'showCardFront');
    fixture.detectChanges();
    

    expect(component).toBeTruthy();
    expect(component.total).toEqual(0);
    expect(component.type).toEqual(mockData.type);
    expect(spyShowCardFront).toHaveBeenCalled();
  });

  it('should call dialogRef close method when currentIndex is greater than total and showCardFront is called', () => {
    fixture = TestBed.createComponent(ReviewCardPopupComponent);
    component = fixture.componentInstance;
    component.currentIndex = 1;
    component.total = 2;

    component.showCardFront();

    expect(matDialogRefMock.close).not.toHaveBeenCalled();
  });

  it('should call dialogRef close method when close method is called', () => {
    fixture = TestBed.createComponent(ReviewCardPopupComponent);
    component = fixture.componentInstance;
    component.close();

    expect(matDialogRefMock.close).toHaveBeenCalled();
  });

  it('should not call dialogRef close method when total is greater than currentIndex and showCardFront is called', () => {
    fixture = TestBed.createComponent(ReviewCardPopupComponent);
    component = fixture.componentInstance;
    component.total = 2;
    component.currentIndex = 1;

    component.showCardFront();    

    expect(matDialogRefMock.close).not.toHaveBeenCalled();
    expect(component.cardFlipState).toBeDefined();
    expect(component.cardFlipState).toEqual('front');
    expect(component.showHint).toBeFalse();
  });

  it('should updateDifficulty when updateDifficulty is called with difficulty parameter', () => {
    fixture = TestBed.createComponent(ReviewCardPopupComponent);
    component = fixture.componentInstance;
    component.currentIndex = 0;
    const spyShowCardFront = spyOn(component, 'showCardFront');
    const updateExpected = { difficulty: 1 }; 
    component.type = 'expression';
    

    component.updateDifficulty(1);

    expect(spyShowCardFront).toHaveBeenCalled();
    expect(component.currentIndex).toEqual(1);
  });

  it('should show snackBar with and error message when update fails', () => {
    fixture = TestBed.createComponent(ReviewCardPopupComponent);
    component = fixture.componentInstance;
    (component as any).wasFirstSnackShown = false;
    const expectedText = `Difficulty won't be updated`;
    const expectedErrorMsg = 'update failed';
    const expectedObj = { duration: 3000 };
    expressionsServiceMock.update.and.returnValue(throwError({ error: { message: 'update failed'}}));

    component.updateDifficulty(1);

    expect(matSnackBarMock.open).toHaveBeenCalledWith(expectedText, expectedErrorMsg, expectedObj);
    expect(matDialogRefMock.close).toHaveBeenCalled();
    expect((component as any).wasFirstSnackShown).toBeTrue();
  });
});
