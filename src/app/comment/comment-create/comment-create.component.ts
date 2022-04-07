import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { IComment } from 'src/app/shared/interfaces';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {
  id: string;
  isLoading = false;
  comments: IComment[];

  constructor(private commentService: CommentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    // this.id = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    // this.commentService.getComments(this.id).subscribe();
  }

  addCommentHandler(form: NgForm) {
    if (form.invalid) { return; }
    const comment = form.value.text;
    const postId = this.id;

    console.log(form.value.text);
    this.isLoading = true;
    this.commentService.addComment(comment, postId).pipe(tap(data => console.log(data)))
      .subscribe({
        next: (comment) => {
          // this.comments.push(comment);
          this.isLoading = false;
          this.router.navigate(['/posts', postId, 'comments'], { relativeTo: this.route });
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
        }
      });
  }
}
