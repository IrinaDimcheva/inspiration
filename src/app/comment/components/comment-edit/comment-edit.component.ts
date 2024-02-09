import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { mergeMap, tap } from 'rxjs/operators';
import { CommentService } from 'src/app/comment/services/comment.service';
import { UserService } from 'src/app/user/services/user.service';
import { IComment } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css'],
})
export class CommentEditComponent implements OnInit {
  isLoading = false;
  // isLogged;
  form: UntypedFormGroup;
  postId: string;
  commentId: string;
  comment;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private commentService: CommentService,
    private router: Router,
    private fb: UntypedFormBuilder
  ) {
    // this.isLogged = this.userService.isLogged;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      text: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(2000),
        ],
      ],
    });
    this.route.params
      .pipe(
        tap((params: Params) => {
          this.postId = params['id'];
          this.commentId = params['commentId'];
          this.isLoading = true;
        }),
        mergeMap(() => {
          return this.commentService.getComment(this.postId, this.commentId);
        })
      )
      .subscribe({
        next: (comment) => {
          this.isLoading = false;
          this.comment = {
            text: comment.text,
          };
          setTimeout(() => {
            this.form.patchValue(this.comment);
          });
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err);
        },
      });
  }

  EditCommentHandler() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    const comment: IComment | any = { text: this.form.value.text };
    this.commentService
      .editComment(this.postId, this.commentId, comment)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err);
        },
      });
    this.form.reset();
  }

  cancelHandler() {
    this.form.reset();
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
