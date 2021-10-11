import { AuthService } from './services/auth.service';
import { HttpClient, HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

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
    WarnButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: TimeInterceptor, multi: true
  }, {
    provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
