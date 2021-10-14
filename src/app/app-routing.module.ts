import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReviewComponent } from './pages/review/review.component';
import { ExpressionsComponent } from './pages/expressions/expressions.component';
import { KanjisComponent } from './pages/kanjis/kanjis.component';
import { SearchComponent } from './pages/search/search.component';
import { UploadComponent } from './pages/upload/upload.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }, {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'review',
    component: ReviewComponent
  }, {
    path: 'upload',
    component: UploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
