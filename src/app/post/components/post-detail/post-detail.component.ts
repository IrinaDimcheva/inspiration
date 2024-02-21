import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { IUser } from 'src/app/shared/interfaces';
import { PostService } from '../../services/post.service';
import { selectUser } from 'src/app/user/+store/reducers';
import { postActions } from '../../+store/actions';
import {
  selectErrors,
  selectIsLoading,
  selectPostData,
} from '../../+store/reducers';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  id = this.route.snapshot.paramMap.get('postId') ?? '';

  canLike$ = combineLatest({
    post: this.store.select(selectPostData),
    user: this.store
      .select(selectUser)
      .pipe(filter((user): user is IUser | null => user !== undefined)),
  }).pipe(
    map(({ post, user }) => {
      return post?.likes?.includes(user?._id);
    })
  );
  isAuthor$ = combineLatest({
    post: this.store.select(selectPostData),
    user: this.store
      .select(selectUser)
      .pipe(filter((user): user is IUser | null => user !== undefined)),
  }).pipe(
    map(({ post, user }) => {
      if (!post || !user) {
        return false;
      }
      return post.userId._id === user._id;
    })
  );
  data$ = combineLatest({
    post: this.store.select(selectPostData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectErrors),
    isAuthor: this.isAuthor$,
    canLike: this.canLike$,
    isLogged: this.store.select(selectUser),
  });

  // foundPost: IPost | boolean;
  status = '';

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(postActions.getPost({ postId: this.id }));

    // this.userService
    //   .getFavorites()
    //   .pipe(
    //     tap((posts) => {
    //       this.foundPost = posts.find((post) => post._id === this.id);
    //     })
    //   )
    //   .subscribe();
    // console.log(this.foundPost?.['_id']);
    //   },
    //   error: (err) => {
    //     this.isLoading = false;
    //     console.error(err);
    //   },
    // });
  }

  deleteHandler() {
    this.store.dispatch(postActions.deletePost({ postId: this.id }));
  }

  addToFavoritesHandler() {
    // this.postService.addToFavorites(this.id).subscribe({
    //   next: () => {
    //     this.status = 'Add to Favorites successful';
    //     this.foundPost = true;
    //     setTimeout(() => {
    //       this.status = '';
    //     }, 1200);
    //   },
    // });
  }

  removeFromFavoritesHandler() {
    // this.postService.removeFromFavorites(this.id).subscribe({
    //   next: () => {
    //     this.status = 'Remove from Favorites successful';
    //     this.foundPost = false;
    //     setTimeout(() => {
    //       this.status = '';
    //     }, 1200);
    //   },
    // });
  }

  likeHandler() {
    // this.postService.likePost(this.id).subscribe(() => {
    //   this.canLike = false;
    //   this.reloadCurrentRoute();
    // });
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
