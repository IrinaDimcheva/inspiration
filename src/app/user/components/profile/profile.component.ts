import { Component, OnInit } from '@angular/core';
import { IPost, IUser } from 'src/app/shared/interfaces';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: IUser;
  postList: IPost[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((user) => {
      this.user = user;
      this.postList = user.posts.filter((x) => x.userId === user._id);
    });
  }
}
