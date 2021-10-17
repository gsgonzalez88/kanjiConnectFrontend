import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { ExternalExpressionInitializer, FormExpressionDto } from './../../models/expression.model';
import { ExpressionsService } from 'src/app/services/expressions.service';
import { ExternalExpression } from 'src/app/models/expression.model';
import { SelectValuesService } from 'src/app/services/select-values.service';
import { TagsService } from 'src/app/services/tags.service';
import { Jlpt, Transitivity } from './../../models/custom-types.model';

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
              private selectValuesService: SelectValuesService,
              private tagsService: TagsService) {
    this.jlptValues = this.selectValuesService.getJlpt();
    this.transitivityValues = this.selectValuesService.getTransitivity();
    this.form = this.formBuilder.group({
      word: ['', Validators.required],
      reading: [''],
      englishMeaning: this.formBuilder.array([
        new FormGroup({ meaning: new FormControl('') })
      ]),
      japaneseMeaning: this.formBuilder.array([
        new FormGroup({ meaning: new FormControl('') })
      ]),
      exampleSentences: this.formBuilder.array([
        new FormGroup({
          sentence: new FormControl(''),
          source: new FormControl(''),
          link: new FormControl('')
        })
      ]),
      jlpt: [null],
      transitivity: [null],
      lesson: [''],
      tags: ['']
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

  get exampleSentences(): FormArray {
    return this.form.controls['exampleSentences'] as FormArray;
  }

  addToFormArray(formArray: string, content?: string) {
    const form = this.form.controls[formArray] as FormArray;
    if (formArray === 'exampleSentences') {
      form.push(new FormGroup({
        sentence: new FormControl(''),
          source: new FormControl(''),
          link: new FormControl('')
      }))
    } else {
      form.push(new FormGroup({ meaning: new FormControl( content ? content : '' ) }))
    }
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
          this.form.get('jlpt')?.setValue(this.currentExternalExpression.jlpt)
          this.form.get('transitivity')?.setValue(this.currentExternalExpression.transitivity);
        }
      }, err => {
        this.externalExpressions = [];
      })
  }

  async sendData() {
    const tagsObject = this.form.get('tags')?.value;
    const tagNames = Object.keys(tagsObject).filter(key => tagsObject[key])
    const tagIds = await this.tagsService.getTagIds(tagNames);

    const formExpression: FormExpressionDto = {
      ...this.form.value,
      englishMeaning: this.englishMeaning.getRawValue()
        .filter(e => e.meaning !== null && e.meaning.length !== 0).map(e => e.meaning),
      japaneseMeaning: this.japaneseMeaning.getRawValue()
        .filter(e => e.meaning !== null && e.meaning.length !== 0).map(e => e.meaning),
      exampleSentences: this.exampleSentences.getRawValue()
        .filter(e => e.sentence !== null && e.sentence.length !== 0),
      tags: tagIds
    }
    this.formData.emit(formExpression);
  }
}
