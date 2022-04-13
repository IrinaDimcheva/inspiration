import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';
import { filter, throttleTime } from 'rxjs/operators';

import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  constructor(
    private userService: UserService,
    private title: Title,
    private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.pipe(filter(e => e instanceof ActivationEnd), throttleTime(0))
      .subscribe((e: ActivationEnd) => {
        this.title.setTitle(e.snapshot.data?.['title']);
      });
  }

  logoutHandler() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
