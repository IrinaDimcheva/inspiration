import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  startWith,
  debounceTime,
  switchMap,
  distinctUntilChanged,
  mergeMap,
} from 'rxjs/operators';
import { Subscription, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { PageEvent as PageEvent } from '@angular/material/paginator';

import { postActions } from '../../+store/actions';
import {
  selectError,
  selectIsLoading,
  selectPostsData,
} from '../../+store/reducers';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    posts: this.store.select(selectPostsData),
  });

  limit = 5;
  page = 1;
  pageSizeOptions = [1, 2, 5, 10];

  searchControl = new FormControl('');

  sub1$: Subscription;
  sub2$: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.sub1$ = this.searchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        mergeMap((title) => {
          this.store.dispatch(
            postActions.getPosts({
              limit: this.limit,
              page: this.page,
              title,
            })
          );
          return title;
        })
      )
      .subscribe();
  }

  changePageHandler(pageData: PageEvent) {
    this.page = pageData.pageIndex + 1;
    this.limit = pageData.pageSize;
    this.sub2$ = this.searchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((title) => {
          this.store.dispatch(
            postActions.getPosts({
              limit: this.limit,
              page: this.page,
              title,
            })
          );
          return title;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.sub1$?.unsubscribe();
    this.sub2$?.unsubscribe();
  }
}
