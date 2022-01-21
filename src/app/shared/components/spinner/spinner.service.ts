import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from './spinner.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private dialog: MatDialog) { }

  open() {
    this.dialog.open(SpinnerComponent, {
      width: '250px',
      height: '250px',
    });
  }

  close() {
    this.dialog.closeAll()
  }
}
