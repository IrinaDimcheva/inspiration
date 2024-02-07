import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/user/services/user.service';
import { IPost } from '../../../shared/interfaces';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css'],
})
export class PostListItemComponent {
  @Input() post: IPost;
  get isLogged() {
    return this.userService.isLogged;
  }
  constructor(private userService: UserService) {}
}
