import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DataType } from 'src/app/shared/models/custom-types.model';
import { SelectValuesService } from 'src/app/study/services/select-values.service';

@Component({
  selector: 'app-types-select',
  templateUrl: './types-select.component.html',
  styleUrls: ['./types-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TypesSelectComponent),
      multi: true
    }
  ]
})
export class TypesSelectComponent implements OnInit, ControlValueAccessor {
  public form: FormGroup;
  public types: { name: string, value: DataType }[] = [];

  onChange = (e: any) => {};
  onTouched = () => {};

  constructor(private formBuilder: FormBuilder,
              private selectValuesService: SelectValuesService) {
    this.types = this.selectValuesService.getDataType();
    this.form = this.formBuilder.group({
      type: ['']
    })
  }

  ngOnInit(): void {
  }

  onSelectionChange(event: any) {
    this.onTouched();
    this.onChange(event.value);
  }

  writeValue(obj: any): void {
    this.form.get('type')?.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
