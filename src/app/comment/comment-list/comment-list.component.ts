import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { IComment } from 'src/app/shared/interfaces';
import { CommentService } from '../../core/services/comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  // postId: string;
  commentList: IComment[] = [];
  isLoading = false;
  isLogged = this.userService.isLogged;

  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    // // const postId = this.route.snapshot.params['id'];
    // this.route.params.subscribe((params: Params) => {
    //   this.postId = params['id'];
    // });
    // // console.log(postId);
    // this.commentService.getComments(this.postId).subscribe({
    //   next: (comments) => {
    //     console.log(comments);
    //     this.commentList = comments;
    //   }
    // });
    this.isLoading = true;
    this.route.params.pipe(switchMap(({ id }) => this.commentService.getComments(id)))
      .subscribe({
        next: comments => {
          this.isLoading = false;
          this.commentList = comments;
        },
        error: err => {
          console.log(err);
        }
      });
  }

  AddCommentHandler() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
