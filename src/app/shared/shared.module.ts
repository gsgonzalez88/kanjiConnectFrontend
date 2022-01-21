import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoginComponent } from './components/login/login.component';
import { SpinnerComponent } from './components/spinner/spinner.component';



@NgModule({
  declarations: [
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    LoadingComponent,
    LoginComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
  ], exports: [
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    LoadingComponent,
    LoginComponent,
    SpinnerComponent,
  ]
})
export class SharedModule { }
