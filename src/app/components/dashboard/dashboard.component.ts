import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public pages = [
    { page: 'review', active: false },
    { page: 'upload', active: false }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setCurrentPageState(this.pages[0].page)
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
