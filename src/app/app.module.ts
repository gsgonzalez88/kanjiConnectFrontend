import { AuthService } from './services/auth.service';
import { HttpClient, HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimeInterceptor } from './interceptors/time.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReviewComponent } from './pages/review/review.component';
import { ExpressionsComponent } from './pages/expressions/expressions.component';
import { KanjisComponent } from './pages/kanjis/kanjis.component';
import { SearchComponent } from './pages/search/search.component';
import { ExpressionCardComponent } from './components/expression-card/expression-card.component';
import { ReviewCounterComponent } from './components/review-counter/review-counter.component';
import { DifficultyPipe } from './pipes/difficulty.pipe';
import { CardFilterComponent } from './components/card-filter/card-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainButtonComponent } from './elements/buttons/main-button/main-button.component';
import { AccentButtonComponent } from './elements/buttons/accent-button/accent-button.component';
import { WarnButtonComponent } from './elements/buttons/warn-button/warn-button.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UploadComponent } from './pages/upload/upload.component';
import { ExpressionFormComponent } from './components/expression-form/expression-form.component';
import { LessonsSelectComponent } from './elements/selects/lessons-select/lessons-select.component';
import { TagsSelectComponent } from './elements/selects/tags-select/tags-select.component';
import { TypesSelectComponent } from './elements/selects/types-select/types-select.component';
import { IconButtonComponent } from './elements/buttons/icon-button/icon-button.component';
import { JlptSelectComponent } from './elements/selects/jlpt-select/jlpt-select.component';
import { TransitivitySelectComponent } from './elements/selects/transitivity-select/transitivity-select.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ReviewComponent,
    ExpressionsComponent,
    KanjisComponent,
    SearchComponent,
    ExpressionCardComponent,
    ReviewCounterComponent,
    DifficultyPipe,
    CardFilterComponent,
    HeaderComponent,
    MainButtonComponent,
    AccentButtonComponent,
    WarnButtonComponent,
    DashboardComponent,
    UploadComponent,
    ExpressionFormComponent,
    LessonsSelectComponent,
    TagsSelectComponent,
    TypesSelectComponent,
    IconButtonComponent,
    JlptSelectComponent,
    TransitivitySelectComponent,
    LoadingComponent
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
    MatDividerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: TimeInterceptor, multi: true
  }, {
    provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
