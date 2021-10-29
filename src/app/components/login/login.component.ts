import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

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
              private dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(res => {
      this.snackBar.open('Successfully logged in', 'OK', { duration: 3000 });
      this.dialogRef.close();
    }, err => {
      this.snackBar.open(`Couldn't log in`, 'Error', { duration: 3000 });
    })
  }

  close() {
    this.dialogRef.close();
  }

}
