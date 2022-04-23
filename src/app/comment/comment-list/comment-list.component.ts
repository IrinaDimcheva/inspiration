import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';
import { IComment } from 'src/app/shared/interfaces';
import { CommentService } from '../../core/services/comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  get user() {
    return this.userService.userId;
  }
  commentList$: Observable<IComment[]>;
  commentUserId: string;
  userId: string;
  isAuthor: boolean;
  comment: IComment;
  postId: string;
  status: string;
  canLike: boolean;
  likes: number = null;

  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.commentList$ = this.route.params.pipe(
      switchMap(({ id }) => this.commentService.getComments(id))
      // shareReplay(1)
    );
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

  editHandler(commentId: string) {
    this.router.navigate([commentId, 'edit'], { relativeTo: this.route });
  }

  // likeHandler(commentId: string) {
  //   this.commentService.likeComment(commentId).subscribe({
  //     next: () => {
  //       console.log(commentId);
  //       this.commentList$ = this.commentService.getComments(this.postId);
  //       // this.likes++;
  //       // this.canLike = false;
  //     },
  //     error: err => {
  //       console.error(err);
  //     }
  //   })
  // }

  deleteHandler(commentId: string) {
    this.commentService.deleteComment(this.postId, commentId)
      .subscribe({
        next: data => {
          this.status = 'Delete successful';
          console.log('Delete successful', data);
          this.commentList$ = this.commentService.getComments(this.postId)
            .pipe(shareReplay(1));
          setTimeout(() => {
            this.status = '';
          }, 2000);
        },
        error: err => {
          console.error('There was an error!', err);
        }
      });
  }
}
