import { Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Jlpt } from 'src/app/models/custom-types.model';
import { SelectValuesService } from 'src/app/services/select-values.service';

@Component({
  selector: 'app-jlpt-select',
  templateUrl: './jlpt-select.component.html',
  styleUrls: ['./jlpt-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => JlptSelectComponent),
    multi: true
  }]
})
export class JlptSelectComponent implements OnInit, ControlValueAccessor {
  public form: FormGroup;
  public jlptValues: { name: number | '', value: Jlpt}[] = [{ name: '', value: null }]

  onChange = (e: any) => {}
  onTouched = () => {}

  constructor(private selectValuesService: SelectValuesService,
              private formBuilder: FormBuilder) {
    this.jlptValues = this.selectValuesService.getJlpt();
    this.form = this.formBuilder.group({
      jlpt: [null]
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
