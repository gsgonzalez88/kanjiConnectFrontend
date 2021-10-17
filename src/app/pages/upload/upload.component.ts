import { CreateExpressionDto } from './../../models/expression.model';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormExpressionDto } from 'src/app/models/expression.model';
import { ExpressionsService } from 'src/app/services/expressions.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  private user = '61478fb9b2cfde16186509b5';

  constructor(private snackBar: MatSnackBar,
              private expressionsService: ExpressionsService) { }

  ngOnInit(): void {
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
    const token = localStorage.getItem('token');
    if (!token) {
      this.snackBar.open(`You're not logged in`, 'Error', { duration: 3000 });
    } else {
      this.expressionsService.create(expressionToUpload).subscribe(
        res => {
          this.snackBar.open('Expression created', 'OK', { duration: 3000 });
        }, err => {
          this.snackBar.open(err.error.message, 'Error', { duration: 3000 });
        }
      )
    }
  }
}
