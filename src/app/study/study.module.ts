import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { ReviewComponent } from './pages/review/review.component';
import { UploadComponent } from './pages/upload/upload.component';
import { CardFilterComponent } from './components/card-filter/card-filter.component';
import { SharedModule } from '../shared/shared.module';
import { DifficultyButtonsComponent } from './components/difficulty-buttons/difficulty-buttons.component';
import { ExpressionFormComponent } from './components/expression-form/expression-form.component';
import { ReviewCardPopupComponent } from './components/review-card-popup/review-card-popup.component';
import { ReviewCounterComponent } from './components/review-counter/review-counter.component';
import { ExpressionCardComponent } from './components/review-card/review-card.component';
import { DifficultyPipe } from './pipes/difficulty.pipe';
import { ExpressionCastPipe } from './pipes/expression-cast.pipe';
import { UserKanjiCastPipe } from './pipes/user-kanji-cast.pipe';

const routes: Routes = [
  {
    path: 'study',
    children: [
      {
        path: 'review',
        component: ReviewComponent
      }, {
        path: 'upload',
        component: UploadComponent
      }
    ]
  }, {
    path: '',
    redirectTo: '/study/review',
    pathMatch: 'full'
  },
]

@NgModule({
  declarations: [
    CardFilterComponent,
    DifficultyButtonsComponent,
    ExpressionFormComponent,
    ReviewCardPopupComponent,
    ReviewCounterComponent,
    ExpressionCardComponent,
    DifficultyPipe,
    ExpressionCastPipe,
    UserKanjiCastPipe,
    ReviewComponent,
    UploadComponent,
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    SharedModule,
    MatInputModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    CardFilterComponent,
    DifficultyButtonsComponent,
  ]
})
export class StudyModule { }
