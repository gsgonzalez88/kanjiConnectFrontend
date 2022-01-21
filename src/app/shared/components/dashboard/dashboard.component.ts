import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

interface Page {
  page: string,
  active: boolean,
  location: string
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public pages: Page[] = [
    { page: 'review', active: false, location: '' },
    { page: 'review', active: false, location: '/review' },
    { page: 'upload', active: false, location: '/upload' }
  ];

  constructor(private router: Router,
              private location: Location) { }

  ngOnInit(): void {
    const currentLocation = this.location.path();
    this.setCurrentPageState(this.pages.find(page => page.location === currentLocation))
  }

  navigate(page: Page) {
    this.setCurrentPageState(page)
    this.router.navigate([`/${page.location}`]);
  }

  setCurrentPageState(pageData: Page | undefined ) {
    if (pageData !== undefined) {
      this.pages.forEach(page => {
        page.active = page.page === pageData.page
      })
    }
  }
}
