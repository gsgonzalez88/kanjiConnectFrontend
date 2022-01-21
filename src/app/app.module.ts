import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimeInterceptor } from './shared/interceptors/time.interceptor';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { HomeComponent } from './shared/pages/home/home.component';
import { ReviewComponent } from './study/pages/review/review.component';
import { ExpressionCardComponent } from './study/components/review-card/review-card.component';
import { ReviewCounterComponent } from './study/components/review-counter/review-counter.component';
import { DifficultyPipe } from './study/pipes/difficulty.pipe';
import { CardFilterComponent } from './study/components/card-filter/card-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainButtonComponent } from './shared/elements/buttons/main-button/main-button.component';
import { AccentButtonComponent } from './shared/elements/buttons/accent-button/accent-button.component';
import { WarnButtonComponent } from './shared/elements/buttons/warn-button/warn-button.component';
import { UploadComponent } from './study/pages/upload/upload.component';
import { ExpressionFormComponent } from './study/components/expression-form/expression-form.component';
import { LessonsSelectComponent } from './shared/elements/selects/lessons-select/lessons-select.component';
import { TagsSelectComponent } from './shared/elements/selects/tags-select/tags-select.component';
import { TypesSelectComponent } from './shared/elements/selects/types-select/types-select.component';
import { IconButtonComponent } from './shared/elements/buttons/icon-button/icon-button.component';
import { JlptSelectComponent } from './shared/elements/selects/jlpt-select/jlpt-select.component';
import { TransitivitySelectComponent } from './shared/elements/selects/transitivity-select/transitivity-select.component';
import { ExpressionCastPipe } from './study/pipes/expression-cast.pipe';
import { UserKanjiCastPipe } from './study/pipes/user-kanji-cast.pipe';
import { DifficultySelectComponent } from './shared/elements/selects/difficulty-select/difficulty-select.component';
import { SourceSelectComponent } from './shared/elements/selects/source-select/source-select.component';
import { DifficultyButtonsComponent } from './study/components/difficulty-buttons/difficulty-buttons.component';
import { ReviewCardPopupComponent } from './study/components/review-card-popup/review-card-popup.component';
import { FirstTitlecasePipe } from './study/pipes/first-titlecase.pipe';
import { StudyModule } from './study/study.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReviewComponent,
    ExpressionCardComponent,
    ReviewCounterComponent,
    DifficultyPipe,
    CardFilterComponent,
    MainButtonComponent,
    AccentButtonComponent,
    WarnButtonComponent,
    UploadComponent,
    ExpressionFormComponent,
    LessonsSelectComponent,
    TagsSelectComponent,
    TypesSelectComponent,
    IconButtonComponent,
    JlptSelectComponent,
    TransitivitySelectComponent,
    ExpressionCastPipe,
    UserKanjiCastPipe,
    DifficultySelectComponent,
    SourceSelectComponent,
    DifficultyButtonsComponent,
    ReviewCardPopupComponent,
    FirstTitlecasePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatSnackBarModule,
    MatDividerModule,
    MatChipsModule,
    MatDialogModule,
    StudyModule,
    SharedModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: TimeInterceptor, multi: true
  }, {
    provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
