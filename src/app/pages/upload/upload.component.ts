import { CreateExpressionDto } from './../../models/expression.model';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormExpressionDto } from 'src/app/models/expression.model';
import { ExpressionsService } from 'src/app/services/expressions.service';
import { AuthService } from 'src/app/services/auth.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  private user = '';

  constructor(private snackBar: MatSnackBar,
              private expressionsService: ExpressionsService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.pipe(takeWhile(e => e._id.length === 0, true)).subscribe(
      res => this.user = res._id
    )
  }

  getFormData(formExpression: FormExpressionDto) {
    const expressionToUpload: CreateExpressionDto = {
      ...formExpression,
      user: this.user,
      kanjis: [],
      difficulty: 5,
      created: new Date(),
      updated: new Date()
    }
    console.log(expressionToUpload)
    const token = localStorage.getItem('token');
    if (!token) {
      this.snackBar.open(`You're not logged in`, 'Error', { duration: 3000 });
    } else {
      this.expressionsService.create(expressionToUpload).subscribe(
        res => {
          this.snackBar.open('Expression created', 'OK', { duration: 3000 });
        }, err => {
          this.snackBar.open(`Expression couldn't be created`, err.error.message, { duration: 3000 });
        }
      )
    }
  }
}
