import { Injectable, Type } from '@angular/core';
import { GenericInputComponent } from '../components/generic-input/generic-input.component';

@Injectable({
  providedIn: 'root'
})
export class GenericInputService {

  constructor() { }

  getAds() {
    return new AdItem(
      GenericInputComponent, { number: 2 }
    )
  }
}

class AdItem {
  constructor(public component: Type<any>, public data: any) {}
}
