import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  navbarOpen = false;
  public clicked = false;
  _el: any;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen
  }

  constructor() { }

  ngOnInit(): void {
  }

}
