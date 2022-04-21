import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { IPost } from '../../shared/interfaces';
import { PostService } from '../../core/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  postList$: Observable<IPost[]>;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postList$ = this.postService.loadPostList()
    // .pipe(shareReplay(1));
  }
}
