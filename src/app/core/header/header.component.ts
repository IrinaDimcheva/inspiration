import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  constructor(private userService: UserService) { }

  loginHandler() {
    this.userService.login();
  }

  logoutHandler() {
    this.userService.logout();
  }

}
