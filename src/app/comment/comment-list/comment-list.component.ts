import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { IComment } from 'src/app/shared/interfaces';
import { CommentService } from '../../core/services/comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  commentList$: Observable<IComment[]>;
  commentUserId: string;
  userId: string;
  isAuthor: boolean;
  comment: IComment;
  postId: string;

  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.commentList$ = this.route.params.pipe(switchMap(({ id }) => this.commentService.getComments(id)))
    this.userId = this.userService.userId;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.postId = paramMap.get('id');
    });
  }

  AddCommentHandler() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  backToPostHandler() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  editHandler() {
    this.router.navigate([this.comment._id, 'edit'], { relativeTo: this.route });
  }

  deleteHandler(commentId: string) {
    this.commentService.deleteComment(this.postId, commentId)
      .subscribe({
        next: data => {
          // this.status = 'Delete successful';
          console.log('Delete successful', data);
          this.commentList$ = this.commentService.getComments(commentId);
        },
        error: error => {
          // this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });
  }
}
