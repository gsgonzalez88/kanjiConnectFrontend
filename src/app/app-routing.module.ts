import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewComponent } from './study/pages/review/review.component';
import { UploadComponent } from './study/pages/upload/upload.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/review',
    pathMatch: 'full'
  }, {
    path: 'review',
    component: ReviewComponent
  }, {
    path: 'upload',
    component: UploadComponent
  }, {
    path: 'study',
    loadChildren: () => import('./study/study.module').then(m => m.StudyModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
