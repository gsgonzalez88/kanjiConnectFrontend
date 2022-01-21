import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { SpinnerService } from '../spinner/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string = '';
  public password: string = '';
  public hide: boolean = true;

  constructor(private authService: AuthService,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<LoginComponent>,
              private spinner: SpinnerService) { }

  ngOnInit(): void {
  }

  login() {
    this.spinner.open();
    this.authService.login(this.email, this.password).subscribe(res => {
      this.spinner.close();
      this.snackBar.open('Successfully logged in', 'Welcome!', { duration: 3000 });
      this.dialogRef.close();
    }, err => {
      this.spinner.close();
      this.snackBar.open('Something went wrong', 'Try again', { duration: 3000 });
    })
  }

  close() {
    this.dialogRef.close();
  }

}
