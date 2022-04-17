import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IComment } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/core/services/user.service';
import { CommentService } from '../../core/services/comment.service';
import { tap } from 'rxjs/operators';

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
  commentId: string;
  postId: string;

  constructor(
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.userId = this.userService.userId;
    this.commentUserId = this.comment.userId._id;
    this.isAuthor = this.userId == this.commentUserId;
    // this.postId = this.route.snapshot.params['postId'];
    this.route.params.subscribe((params: Params) => {
      this.postId = params['postId'];
      // this.commentId = params['commentId'];
      // console.log(this.postId, this.commentId);
    });
  }

  editHandler() {
    this.router.navigate([this.comment._id, 'edit'], { relativeTo: this.route });
  }

  deleteHandler(commentId: string) {
    this.commentService.deleteComment(this.postId, commentId)
      .subscribe({
        next: () => this.commentService.getComments(this.postId),
      });
  }
}
