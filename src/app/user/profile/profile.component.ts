import { Component, OnInit } from '@angular/core';
import { IPost, IUser } from 'src/app/shared/interfaces';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: IUser;
  postList: IPost[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((user) => {
      console.log(user.posts);
      this.user = user;
      this.postList = user.posts;
    });
  }

}
