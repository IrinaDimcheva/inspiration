import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  id: string;
  commentId?: string;
  isLoading = false;
  editMode = false;
  comments: IComment[];
  editedComment: IComment;
  isLogged = this.userService.isLogged;

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // this.id = this.route.snapshot.params['id'];
    this.route.parent.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.commentId = params['commentId'];
      // console.log(this.editMode);
      // console.log(this.commentId);
    });
    // if (this.commentId !== null) {
    //   this.commentService.getComment(this.id, this.commentId)
    //     .subscribe({
    //       next: (comment) => {
    //         this.form.setValue({ 'text': comment.text })
    //       }
    //     })
    // }
    // this.commentService.getComments(this.id).subscribe();
  }

  addCommentHandler() {
    if (this.form.invalid) { return; }
    const comment = this.form.value.text;
    const postId = this.id;

    // console.log(form.value.text);
    this.isLoading = true;
    if (!this.editMode) {
      this.commentService.addComment(comment, postId).pipe(tap(data => console.log(data)))
        .subscribe({
          next: () => {
            this.isLoading = false;
            // this.router.navigate(['/posts', postId, 'comments'], { relativeTo: this.route });
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          error: (err) => {
            this.isLoading = false;
            console.log(err);
          }
        });
    } else {
      this.commentService.editComment(comment, postId, this.commentId)
        .subscribe({
          next: () => {
            this.editMode = false;
            this.isLoading = false;
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          error: (err) => {
            console.log(err);
          }
        })
    }
  }

  cancelHandler() {
    this.router.navigate(['../'], { relativeTo: this.route });
    this.editMode = false;
    this.form.reset();
  }
}
