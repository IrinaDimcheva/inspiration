import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { filter, throttleTime } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { selectUser } from 'src/app/user/+store/reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  data$ = combineLatest({
    user: this.store.select(selectUser),
  });

  constructor(
    private store: Store,
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

  // logoutHandler() {
  //   this.userService.logout().subscribe(() => {
  //     this.router.navigate(['/user/login']);
  //   });
  // }
}
