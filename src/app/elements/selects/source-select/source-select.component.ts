import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Source } from 'src/app/models/source.model';
import { LessonsService } from 'src/app/services/lessons.service';

@Component({
  selector: 'app-source-select',
  templateUrl: './source-select.component.html',
  styleUrls: ['./source-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SourceSelectComponent),
    multi: true
  }]
})
export class SourceSelectComponent implements OnInit {
  public form: FormGroup;
  public sourceValues: Source[] = [];

  @Input() set lessonId(id: string) {
    if (id) {
      this.lessonsService.lessons$.pipe(take(1)).subscribe(res => {
        this.sourceValues = res.find(lesson => lesson._id === id)?.sources || [];
      })
    } else {
      this.sourceValues = [];
    }
  }

  onChange = (e: any) => {}
  onTouched = () => {}

  constructor(private formBuilder: FormBuilder,
              private lessonsService: LessonsService) {
    this.form = this.formBuilder.group({
      source: ['']
    })
  }

  ngOnInit(): void {

  }

  onSelectionChange(event: any) {
    this.onTouched()
    this.onChange(event.value);
  }

  writeValue(obj: any): void {
    this.form.get('source')?.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
