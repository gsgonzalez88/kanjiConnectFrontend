import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectValuesService } from 'src/app/services/select-values.service';

@Component({
  selector: 'app-difficulty-select',
  templateUrl: './difficulty-select.component.html',
  styleUrls: ['./difficulty-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DifficultySelectComponent),
    multi: true
  }]
})
export class DifficultySelectComponent implements OnInit, ControlValueAccessor {
  public form: FormGroup;
  public difficultyValues: any;

  onChange = (e: any) => {}
  onTouched = () => {}

  constructor(private formBuilder: FormBuilder,
              private selectValuesService: SelectValuesService) {
    this.difficultyValues = this.selectValuesService.getDifficulty(),
    this.form = this.formBuilder.group({
      difficulty: [null],
    })
  }

  ngOnInit(): void {
  }

  onSelectionChange(event: any) {
    this.onTouched()
    this.onChange(event.value);
  }

  writeValue(obj: any): void {
    this.form.get('jlpt')?.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
