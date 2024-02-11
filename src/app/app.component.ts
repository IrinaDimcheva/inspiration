import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  // slideInAnimation,
  fader,
} from './animations';
import { authActions } from './user/+store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    // slideInAnimation,
    fader,
  ],
})
export class AppComponent implements OnInit {
  constructor(public store: Store, private contexts: ChildrenOutletContexts) {}

  ngOnInit(): void {
    this.store.dispatch(authActions.getUser());
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
