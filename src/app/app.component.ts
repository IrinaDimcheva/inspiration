import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import {
  // slideInAnimation,
  fader,
} from './animations';
import { UserService } from './user/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    // slideInAnimation,
    fader,
  ],
})
export class AppComponent {
  get canLoad() {
    return this.userService.canLoad;
  }

  constructor(
    public userService: UserService,
    private contexts: ChildrenOutletContexts
  ) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
