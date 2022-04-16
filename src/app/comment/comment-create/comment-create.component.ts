import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';
import { IComment } from 'src/app/shared/interfaces';
import { CommentService } from '../../core/services/comment.service';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  postId: string;
  commentId?: string;
  isLoading = false;
  isEditMode = false;
  comment: IComment | any;
  isLogged = this.userService.isLogged;

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.postId = this.route.snapshot.params['postId'];
    this.commentId = this.route.parent.snapshot.params?.['commentId'];
    if (this.commentId) {
      this.isEditMode = true;
      this.isLoading = true;
      this.commentService.getComment(this.postId, this.commentId).subscribe({
        next: comment => {
          this.isLoading = false;
          console.log(comment);
          this.comment = {
            text: comment.text
          };
          setTimeout(() => {
            this.form.setValue(this.comment);
            this.router.navigate(['../'], { relativeTo: this.route });
          });
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        }
      });
    } else {
      this.isEditMode = false;
      this.commentId = null;
    }
  }

  addCommentHandler() {
    if (this.form.invalid) { return; }
    const comment = { text: this.form.value.text };
    // console.log(form.value.text);
    this.isLoading = true;
    this.commentService.addComment(comment, this.postId).pipe(tap(data => console.log(data)))
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        }
      });
  }

  cancelHandler() {
    this.router.navigate(['../'], { relativeTo: this.route });
    this.isEditMode = false;
    this.form.reset();
  }
}

