import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/shared/interfaces';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  posts: IPost[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((user) => {
      console.log(user.posts);
      this.posts = user.posts;
    });
  }

}
