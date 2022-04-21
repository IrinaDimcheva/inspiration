import { Component } from '@angular/core';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  get canLoad() {
    return this.userService.canLoad;
  }

  constructor(public userService: UserService) { }
}
