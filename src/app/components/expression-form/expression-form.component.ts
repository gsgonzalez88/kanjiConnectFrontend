import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { ExternalExpressionInitializer, FormExpressionDto } from './../../models/expression.model';
import { ExpressionsService } from 'src/app/services/expressions.service';
import { ExternalExpression } from 'src/app/models/expression.model';

@Component({
  selector: 'app-expression-form',
  templateUrl: './expression-form.component.html',
  styleUrls: ['./expression-form.component.scss']
})
export class ExpressionFormComponent implements OnInit {
  public form: FormGroup;
  public externalExpressions: ExternalExpression[] = [];
  public currentExternalExpression: ExternalExpression = new ExternalExpressionInitializer();
  public showDeleteEnglishMeaningButton: boolean = false;

  @Output() formData = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private expressionsService: ExpressionsService) {
    this.form = this.formBuilder.group({
      word: ['', Validators.required],
      reading: ['', Validators.required],
      englishMeaning: this.formBuilder.group({
        englishMeaning1: ['']
      }),
      japaneseMeaning: this.formBuilder.group({
        japaneseMeaning1: ['']
      }),
      exampleSentences: this.formBuilder.group({
        exampleSentence1: this.formBuilder.group({
          sentence1: [''],
          source1: [''],
          link1: ['']
        })
      }),
      tags: [''],
      lesson: ['']
    })
  }

  ngOnInit(): void {
  }

  autocomplete() {
    this.expressionsService.getExpressionExternalData(this.form.get('word')?.value).subscribe(
      res => {
        this.externalExpressions = res;
        if (this.externalExpressions.length > 0) {
          this.currentExternalExpression = this.externalExpressions[0];
          this.form.get('reading')?.setValue(this.currentExternalExpression.reading);
          const englishMeaningForm = this.form.get('englishMeaning') as FormGroup;
          this.showDeleteEnglishMeaningButton = this.currentExternalExpression.englishMeaning.length > 1;
          this.currentExternalExpression.englishMeaning.forEach((meaning, i) => {
            if (i === 0) {
              englishMeaningForm.get('englishMeaning1')?.setValue(meaning);
            } else {
              englishMeaningForm.addControl('englishMeaning' + (i+1), new FormControl(meaning));
            }
          })
        }
      }, err => {
        this.externalExpressions = [];
      })
  }

  deleteFormControl(formGroupName: string, formControlName: string) {
    const formGroup = this.form.get(formGroupName) as FormGroup;
    formGroup.removeControl(formControlName);
    if (formGroupName === 'englishMeaning' && Object.keys(formGroup.controls).length === 1) {
      this.showDeleteEnglishMeaningButton = false;
    }
  }

  sendData() {
    const formExpression: FormExpressionDto = this.form.value;
    this.formData.emit(formExpression);
  }
}
