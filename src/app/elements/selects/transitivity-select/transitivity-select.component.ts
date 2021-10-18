import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Transitivity } from 'src/app/models/custom-types.model';
import { SelectValuesService } from 'src/app/services/select-values.service';

@Component({
  selector: 'app-transitivity-select',
  templateUrl: './transitivity-select.component.html',
  styleUrls: ['./transitivity-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TransitivitySelectComponent),
      multi: true
    }
  ]
})
export class TransitivitySelectComponent implements OnInit, ControlValueAccessor {
  public form: FormGroup;
  public transitivityValues: { name: string, value: Transitivity }[] = [{ name: '', value: null}];

  onChange = (e: any) => {}
  onTouched = () => {}

  constructor(private selectValuesService: SelectValuesService,
              private formBuilder: FormBuilder) {
    this.transitivityValues = this.selectValuesService.getTransitivity();
    this.form = this.formBuilder.group({
      transitivity: [null]
    })
  }

  ngOnInit(): void {
  }

  onSelectionChange(event: any) {
    this.onTouched()
    this.onChange(event.value);
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
