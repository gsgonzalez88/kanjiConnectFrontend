import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public email: string = '';
  public password: string = '';

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(res => {
      this.redirectToReview();
    })
  }

  redirectToReview() {
    this.router.navigate(['/review'])
  }
}
