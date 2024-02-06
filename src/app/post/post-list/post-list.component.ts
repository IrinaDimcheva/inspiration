import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import {
  map,
  startWith,
  debounceTime,
  switchMap,
  distinctUntilChanged,
} from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

import { IPost } from '../../shared/interfaces';
import { PostService } from '../../core/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  postData: { posts: IPost[]; postCount: number; searchTitle: string };
  postList: IPost[];
  searchControl = new UntypedFormControl('');
  totalPosts = 0;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchTitle) => {
          return this.postService.loadPostList(
            this.postsPerPage,
            this.currentPage,
            searchTitle
          );
        }),
        map(
          (data: {
            posts: IPost[];
            postCount: number;
            searchTitle: string;
          }): void => {
            this.postList = data.posts;
            this.totalPosts = data.postCount;
          }
        )
      )
      .subscribe();
  }

  changePageHandler(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        switchMap((searchTitle) => {
          return this.postService.loadPostList(
            this.postsPerPage,
            this.currentPage,
            searchTitle
          );
        })
      )
      .subscribe(
        (data: {
          posts: IPost[];
          postCount: number;
          searchTitle: string;
        }): void => {
          this.postList = data.posts;
          this.totalPosts = data.postCount;
        }
      );
  }
}
