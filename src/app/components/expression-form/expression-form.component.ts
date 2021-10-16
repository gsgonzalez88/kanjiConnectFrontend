import { Jlpt, Transitivity } from './../../models/custom-types.model';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { ExternalExpressionInitializer, FormExpressionDto } from './../../models/expression.model';
import { ExpressionsService } from 'src/app/services/expressions.service';
import { ExternalExpression } from 'src/app/models/expression.model';
import { SelectValuesService } from 'src/app/services/select-values.service';

@Component({
  selector: 'app-expression-form',
  templateUrl: './expression-form.component.html',
  styleUrls: ['./expression-form.component.scss']
})
export class ExpressionFormComponent implements OnInit {
  public form: FormGroup;
  public externalExpressions: ExternalExpression[] = [];
  public currentExternalExpression: ExternalExpression = new ExternalExpressionInitializer();
  public jlptValues: { name: number | '', value: Jlpt }[] = [{ name: '', value: null }];
  public transitivityValues: { name: string, value: Transitivity }[] = [{ name: '', value: null }];

  @Output() formData = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private expressionsService: ExpressionsService,
              private selectValuesService: SelectValuesService) {
    this.jlptValues = this.selectValuesService.getJlpt();
    this.transitivityValues = this.selectValuesService.getTransitivity();
    this.form = this.formBuilder.group({
      word: ['', Validators.required],
      reading: ['', Validators.required],
      englishMeaning: this.formBuilder.array([
        new FormGroup({ meaning: new FormControl('') })
      ]),
      japaneseMeaning: this.formBuilder.array([
        new FormGroup({ meaning: new FormControl('') })
      ]),
      exampleSentences: this.formBuilder.group({
        exampleSentence1: this.formBuilder.group({
          sentence: [''],
          source: [''],
          link: ['']
        })
      }),
      jlpt: [null],
      transitivity: [null]
    })
  }

  ngOnInit(): void {
  }

  get englishMeaning(): FormArray {
    return this.form.controls['englishMeaning'] as FormArray;
  }

  get japaneseMeaning(): FormArray {
    return this.form.controls['japaneseMeaning'] as FormArray;
  }

  addToFormArray(formArray: string, content?: string) {
    const form = this.form.controls[formArray] as FormArray;
    form.push(new FormGroup({ meaning: new FormControl( content ? content : '' ) }))
  }

  deleteFromFormArray(formArray: string, index: any) {
    const form = this.form.controls[formArray] as FormArray;
    form.removeAt(index);
  }

  cleanEmptyValuesFromFormArray(formArray: string) {
    const form = this.form.controls[formArray] as FormArray;
    form.getRawValue().forEach((value, i) => {
      if (value.meaning === null || value.meaning.length === 0) {
        this.deleteFromFormArray(formArray, i);
      }
    })
  }

  autocomplete() {
    this.expressionsService.getExpressionExternalData(this.form.get('word')?.value).subscribe(
      res => {
        this.externalExpressions = res;
        if (this.externalExpressions.length > 0) {
          this.currentExternalExpression = this.externalExpressions[0];
          this.form.get('reading')?.setValue(this.currentExternalExpression.reading);
          this.currentExternalExpression.englishMeaning.forEach((meaning, i) => {
            this.addToFormArray('englishMeaning', meaning)
          })
          this.cleanEmptyValuesFromFormArray('englishMeaning');
          this.addToFormArray('englishMeaning');
          this.form.get('jlpt')?.setValue(this.currentExternalExpression.jlpt);
          this.form.get('transitivity')?.setValue(this.currentExternalExpression.transitivity);
        }
      }, err => {
        this.externalExpressions = [];
      })
  }

  sendData() {
    const formExpression: FormExpressionDto = {
      ...this.form.value,
      englishMeaning: Object.values(this.form.get('englishMeaning')?.value)
        .filter(e => e !== null && e !== ''),
      japaneseMeaning: Object.values(this.form.get('japaneseMeaning')?.value)
        .filter(e => e !== null && e !== ''),
      exampleSentences: Object.values(this.form.get('exampleSentences')?.value)
        .filter(e => e !== null && e !== '')
    }
    this.formData.emit(formExpression);
  }
}
