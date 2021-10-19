import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public pages = [
    { page: 'review', active: false, location: '/review' },
    { page: 'upload', active: false, location: '/upload' }
  ];

  constructor(private router: Router,
              private location: Location) { }

  ngOnInit(): void {
    const currentLocation = this.location.path()
    this.setCurrentPageState(this.pages.find(page => page.location === currentLocation)?.page || 'home')
  }

  navigate(page: string) {
    this.setCurrentPageState(page)
    this.router.navigate([`/${page}`]);
  }

  setCurrentPageState(currentPage: string) {
    this.pages.forEach(page =>
      page.active = page.page === currentPage
    )
  }
}
