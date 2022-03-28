import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComment } from 'src/app/shared/interfaces';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments: IComment[];

  constructor(private commentService: CommentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['_id'];
    this.commentService.getComments(id).subscribe({
      next: (comments) => {
        this.comments = comments;
      }
    });
  }

}
