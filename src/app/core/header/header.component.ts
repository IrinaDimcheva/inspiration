import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';
import { filter, throttleTime } from 'rxjs/operators';

import { UserService } from 'src/app/user/services/user.service';
import { IUser } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  get isLogged(): boolean {
    return this.userService.isLogged;
  }
  get user(): IUser {
    return this.userService.user;
  }

  constructor(
    private userService: UserService,
    private title: Title,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((e) => e instanceof ActivationEnd),
        throttleTime(0)
      )
      .subscribe((e: ActivationEnd) => {
        this.title.setTitle(e.snapshot.data?.['title']);
      });
  }

  logoutHandler() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/user/login']);
    });
  }
}
