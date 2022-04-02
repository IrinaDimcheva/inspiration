import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { IPost } from '../../shared/interfaces';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  postList: IPost[];
  private postSubscription: Subscription;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.loadPostList().subscribe({
      next: (posts) => {
        console.log(posts);
        this.postList = posts;
      }
    });
    this.postSubscription = this.postService.getPostUpdateListener()
      .subscribe((postList: IPost[]) => {
        this.postList = postList;
      });
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }
}
