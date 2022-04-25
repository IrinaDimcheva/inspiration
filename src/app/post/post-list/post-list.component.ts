import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { shareReplay, tap, map, mergeMap, startWith, debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

import { IPost } from '../../shared/interfaces';
import { PostService } from '../../core/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  postData: { posts: IPost[], postCount: number, searchTitle: string }
  postList: IPost[];
  searchControl = new FormControl('');
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(private postService: PostService) { }

  // ngOnInit(): void {
  //   this.postList$ = this.postService.loadPostList(this.postsPerPage, this.currentPage)
  //     .pipe(tap((posts) => console.log(posts)))
  //   // .pipe(shareReplay(1));
  // }

  // changePageHandler(pageData: PageEvent) {
  //   console.log(pageData);
  //   this.currentPage = pageData.pageIndex + 1;
  //   this.postsPerPage = pageData.pageSize;
  //   this.postList$ = this.postService.loadPostList(this.postsPerPage, this.currentPage);
  // }
  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchTitle => {
        return this.postService.loadPostList(this.postsPerPage, this.currentPage, searchTitle);
      }),
      map((data: { posts: IPost[], postCount: number, searchTitle: string }): void => {
        console.log(data)
        this.postList = data.posts;
        this.totalPosts = data.postCount;

      })).subscribe()
    // this.postData = this.postService.loadPostList(this.postsPerPage, this.currentPage, searchTitle)
    //   .pipe(tap((data: { posts: Observable<IPost[]>, postCount: number, searchTitle: string }): void => {
    //     console.log(data)
    //     this.postList$ = data.posts;
    //     this.totalPosts = data.postCount;
    // }),
    //   map((data: { posts: IPost[], postCount: number}) => {
    //     return {
    //       posts: data.posts,
    //       postCount: data.postCount
    //     }
    // })).subscribe()
    // .pipe(shareReplay(1));
    // this.postList$ = this.postData.posts;
    // this.totalPosts = this.postData.postCount

  }

  changePageHandler(pageData: PageEvent) {
    console.log(pageData);
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.searchControl.valueChanges.pipe(
      startWith(''),
      mergeMap(searchTitle => {
        return this.postService.loadPostList(this.postsPerPage, this.currentPage, searchTitle)
      }))
      .subscribe((data: { posts: IPost[], postCount: number, searchTitle: string }): void => {
        console.log(data)
        this.postList = data.posts;
        this.totalPosts = data.postCount;

      });
  }
}
function searchTitle(postsPerPage: number, currentPage: number, searchTitle: any) {
  throw new Error('Function not implemented.');
}

// import { Component, OnInit } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { Observable } from 'rxjs';
// import { shareReplay, tap, map, mergeMap, startWith } from 'rxjs/operators';
// import { PageEvent } from '@angular/material/paginator';

// import { IPost } from '../../shared/interfaces';
// import { PostService } from '../../core/services/post.service';

// @Component({
//   selector: 'app-post-list',
//   templateUrl: './post-list.component.html',
//   styleUrls: ['./post-list.component.css']
// })
// export class PostListComponent implements OnInit {
//   postData: { posts: Observable<IPost[]>, postCount: number, searchTitle: string }
//   postList$: Observable<IPost[]>;
//   searchControl = new FormControl();
//   totalPosts = 0;
//   postsPerPage: number;
//   currentPage = 1;
//   pageSizeOptions = [1, 2, 5, 10];

//   constructor(private postService: PostService) { }

//   // ngOnInit(): void {
//   //   this.postList$ = this.postService.loadPostList(this.postsPerPage, this.currentPage)
//   //     .pipe(tap((posts) => console.log(posts)))
//   //   // .pipe(shareReplay(1));
//   // }

//   // changePageHandler(pageData: PageEvent) {
//   //   console.log(pageData);
//   //   this.currentPage = pageData.pageIndex + 1;
//   //   this.postsPerPage = pageData.pageSize;
//   //   this.postList$ = this.postService.loadPostList(this.postsPerPage, this.currentPage);
//   // }
//   ngOnInit(): void {
//     this.searchControl.valueChanges.pipe(
//       startWith(''),
//       mergeMap(searchTitle => {
//         return this.postService.loadPostList(this.postsPerPage, this.currentPage, searchTitle)
//       }),
//       map((data: { posts: Observable<IPost[]>, postCount: number, searchTitle: string }): void => {
//         console.log(data)
//         this.postList$ = data.posts;
//         this.totalPosts = data.postCount;

//       }))
//     // this.postData = this.postService.loadPostList(this.postsPerPage, this.currentPage, searchTitle)
//     //   .pipe(tap((data: { posts: Observable<IPost[]>, postCount: number, searchTitle: string }): void => {
//     //     console.log(data)
//     //     this.postList$ = data.posts;
//     //     this.totalPosts = data.postCount;
//     // }),
//     //   map((data: { posts: IPost[], postCount: number}) => {
//     //     return {
//     //       posts: data.posts,
//     //       postCount: data.postCount
//     //     }
//     // })).subscribe()
//     // .pipe(shareReplay(1));
//     // this.postList$ = this.postData.posts;
//     // this.totalPosts = this.postData.postCount

//   }

//   changePageHandler(pageData: PageEvent) {
//     console.log(pageData);
//     this.currentPage = pageData.pageIndex + 1;
//     this.postsPerPage = pageData.pageSize;
//     this.postList$ = this.postService.loadPostList(this.postsPerPage, this.currentPage);
//   }
// }
// function searchTitle(postsPerPage: number, currentPage: number, searchTitle: any) {
//   throw new Error('Function not implemented.');
// }

