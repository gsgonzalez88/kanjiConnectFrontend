import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { Tag } from 'src/app/models/tag.model';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-tags-select',
  templateUrl: './tags-select.component.html',
  styleUrls: ['./tags-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagsSelectComponent),
      multi: true
    }
  ]
})
export class TagsSelectComponent implements OnInit, ControlValueAccessor, OnDestroy {
  public form: FormGroup;
  public tags$: Observable<Tag[]> = of([{
    user:  '',
    name: '',
    description: '',
    _id: '',
  }]);
  private subscription: Subscription = new Subscription();

  onChange = (e: any) => {};
  onTouched = () => {};

  constructor(private formBuilder: FormBuilder,
              private tagsService: TagsService) {
    this.form = this.formBuilder.group({
      tags: this.formBuilder.group({})
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    const tagsForm = this.form.controls['tags'] as FormGroup;
    this.tags$ = this.tagsService.tags$;
    this.subscription = this.tags$.subscribe(res => {
      res.forEach(tag => {
        tagsForm.addControl(tag.name, new FormControl(false))
      })
      tagsForm.valueChanges.subscribe(res => {
        this.onTouched();
        this.onChange(res);
      })
    })
  }

  writeValue(obj: any): void {

  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
