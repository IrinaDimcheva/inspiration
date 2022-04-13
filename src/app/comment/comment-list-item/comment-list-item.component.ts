import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IComment } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/core/services/user.service';
import { CommentService } from '../../core/services/comment.service';

@Component({
  selector: 'app-comment-list-item',
  templateUrl: './comment-list-item.component.html',
  styleUrls: ['./comment-list-item.component.css']
})
export class CommentListItemComponent implements OnInit {
  @Input() comment: IComment;
  commentUserId: string;
  userId: string;
  isAuthor: boolean;

  constructor(
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId = this.userService.userId;
    this.commentUserId = this.comment.userId._id;
    this.isAuthor = this.userId == this.commentUserId;
  }

  editHandler() {
    this.router.navigate([this.comment._id], { relativeTo: this.route });
  }
}
