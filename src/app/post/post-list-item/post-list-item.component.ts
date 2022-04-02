import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { IPost } from '../../shared/interfaces';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {
  @Input() post: IPost;
  get isLogged() {
    return this.userService.isLogged;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit(): void {
  }

  // toCommentsHandler() {
  //   this.router.navigate([this.post._id, 'comments'], { relativeTo: this.route });
  // }
}
