import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { IPost } from '../../shared/interfaces';
import { PostService } from '../../core/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  postList$: Observable<IPost[]>;
  private postSubscription: Subscription;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postList$ = this.postService.loadPostList();
    // this.postService.loadPostList().subscribe({
    //   next: (posts) => {
    //     console.log(posts);
    //     this.postList = posts;
    //   }
    // });
  }

  ngOnDestroy(): void {
    // this.postSubscription.unsubscribe();
  }
}
