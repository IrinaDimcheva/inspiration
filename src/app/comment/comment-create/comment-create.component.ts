import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { CommentService } from '../../core/services/comment.service';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css'],
})
export class CommentCreateComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  postId: string;
  isLoading = false;
  isLogged;

  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.isLogged = this.userService.isLogged;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.postId = params['id'];
    });
  }

  addCommentHandler() {
    if (this.form.invalid) {
      return;
    }
    const comment = { text: this.form.value.text };
    this.isLoading = true;
    this.commentService.addComment(comment, this.postId).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  cancelHandler() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
