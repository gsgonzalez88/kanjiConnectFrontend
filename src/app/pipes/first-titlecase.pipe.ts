import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstTitlecase'
})
export class FirstTitlecasePipe implements PipeTransform {

  transform(value: string | null): string {
    if (value !== null) {
      const firstLetter = value.charAt(0).toUpperCase();
      const restOfString = value.substring(1);
      return firstLetter + restOfString;
    } else {
      return '';
    }
  }

}
