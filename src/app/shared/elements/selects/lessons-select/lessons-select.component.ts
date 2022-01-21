import { emptyLesson } from '../../../../study/models/lesson.model';
import { Lesson } from 'src/app/study/models/lesson.model';
import { LessonsService } from 'src/app/study/services/lessons.service';
import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-lessons-select',
  templateUrl: './lessons-select.component.html',
  styleUrls: ['./lessons-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LessonsSelectComponent),
      multi: true
    }
  ]
})
export class LessonsSelectComponent implements OnInit, ControlValueAccessor {
  public form: FormGroup;
  public lessons$: Observable<Lesson[]> = of([emptyLesson]);

  onChange = (e: any) => {}
  onTouched = () => {}

  constructor(private lessonsService: LessonsService,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      lesson: ['']
    })
  }

  ngOnInit(): void {
    this.lessons$ = this.lessonsService.lessons$;
  }

  onSelectionChange(event: any) {
    this.onTouched()
    const id = event.value as string;
    this.onChange(id);
  }

  writeValue(value: string): void {
    if (value) {
      console.log(value)
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
