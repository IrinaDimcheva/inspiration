import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';
import { IComment } from 'src/app/shared/interfaces';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  // postId: string;
  commentList: IComment[] = [];
  isLoading = false;

  constructor(private commentService: CommentService, private route: ActivatedRoute) { }

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
      .subscribe(comments => {
        this.isLoading = false;
        this.commentList = comments;
      });
  }

}
