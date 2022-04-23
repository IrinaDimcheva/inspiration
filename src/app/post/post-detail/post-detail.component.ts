import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { IPost, IUser } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/core/services/user.service';
import { PostService } from '../../core/services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  post!: IPost;
  // refresh$ = new BehaviorSubject(undefined);
  user: IUser;
  id: string;
  isLoading = false;
  isAuthor: boolean;
  canLike: boolean;
  isInFavorites: boolean;
  removeFavorites: boolean;
  likes: number;
  status = '';
  get isLogged() {
    return this.userService.isLogged;
  }
  get userId() {
    return this.userService.userId;
  }

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  likeHandler() {
    this.postService.likePost(this.id)
      .subscribe((post) => {
        this.canLike = false;
        this.likes++;
        this.reloadCurrentRoute();
        // this.refresh$.next(undefined);
      });
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(
      tap((params: Params) => {
        this.id = params['id'];
        console.log(this.id);
        this.isLoading = true;
      }),
      mergeMap(params => {
        return this.postService.loadPostById(params['id']);
      }))
      .subscribe({
        next: post => {
          console.log(post);
          this.isLoading = false;
          this.post = post;
          this.isAuthor = post.userId._id === this.userId;
          this.canLike = !post.likes.includes(this.userId);
          this.isInFavorites = !!this.userService.user.favorites.find(post => post['_id'] === this.id);
          console.log(!!this.userService.user.favorites.find(post => post['_id'] === this.id));
          this.likes = post.likes.length;
        },
        error: err => {
          this.isLoading = false;
          console.error(err);
        }
      })
  }

  deleteHandler() {
    this.postService.deletePost(this.id).subscribe({
      next: (any) => {
        console.log(any);
        this.router.navigate(['/']);
      }
    });
  }

  addToFavoritesHandler() {
    this.isInFavorites = !!this.userService.user.favorites.find(post => post['_id'] === this.id);
    this.postService.addToFavorites(this.id).subscribe({
      next: () => {
        this.status = 'Add to Favorites successful';
        setTimeout(() => {
          this.status = '';
        }, 2000);
        // this.reloadCurrentRoute();
        // this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  removeFromFavoritesHandler() {
    this.isInFavorites = !!this.userService.user.favorites.find(post => post['_id'] === this.id);
    console.log(this.id)
    this.postService.removeFromFavorites(this.id).subscribe({
      next: () => {
        this.status = 'Remove from Favorites successful';
        setTimeout(() => {
          this.status = '';
        }, 2000);
        // this.reloadCurrentRoute();
        // this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  ngOnDestroy(): void {
    // this.refresh$.unsubscribe();
  }
}


// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { ActivatedRoute, Params, Router } from '@angular/router';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { mergeMap, tap, catchError, shareReplay, switchMap } from 'rxjs/operators';
// import { IPost, IUser } from 'src/app/shared/interfaces';
// import { UserService } from 'src/app/core/services/user.service';
// import { PostService } from '../../core/services/post.service';

// @Component({
//   selector: 'app-post-detail',
//   templateUrl: './post-detail.component.html',
//   styleUrls: ['./post-detail.component.css']
// })
// export class PostDetailComponent implements OnInit, OnDestroy {
//   post$!: Observable<IPost>;
//   // refresh$ = new BehaviorSubject(undefined);
//   user: IUser;
//   id: string;
//   isLoading = false;
//   isAuthor: boolean;
//   canLike: boolean;
//   isInFavorites: boolean;
//   removeFavorites: boolean;
//   likes: number;
//   get isLogged() {
//     return this.userService.isLogged;
//   }
//   get userId() {
//     return this.userService.userId;
//   }

//   constructor(
//     public postService: PostService,
//     private route: ActivatedRoute,
//     private userService: UserService,
//     private router: Router
//   ) { }

//   likeHandler() {
//     this.postService.likePost(this.id)
//       .subscribe((post) => {
//         this.canLike = false;
//         this.likes++;
//         // this.reloadCurrentRoute();
//         // this.refresh$.next(undefined);
//       });
//   }

//   // reloadCurrentRoute() {
//   //   const currentUrl = this.router.url;
//   //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
//   //     this.router.navigate([currentUrl]);
//   //   });
//   // }

//   ngOnInit(): void {
//     this.isLoading = true;
//     this.post$ = this.route.params.pipe(switchMap((params: Params) => {
//       this.id = params['id'];
//       return this.postService.loadPostById(params['id']);
//       // .pipe(shareReplay(1));
//     }),
//       tap((post$: IPost) => {
//         this.isLoading = false;
//         this.isAuthor = post$.userId._id === this.userId;
//         this.canLike = !post$.likes.includes(this.userId);
//         this.isInFavorites = !!this.userService.user.favorites.find(post => post['_id'] === this.id);
//         this.likes = post$.likes.length;
//       }))
//   }

//   deleteHandler() {
//     this.postService.deletePost(this.id).subscribe({
//       next: (any) => {
//         console.log(any);
//         this.router.navigate(['/']);
//       }
//     });
//   }

//   addToFavoritesHandler() {
//     this.postService.addToFavorites(this.id).subscribe({
//       next: () => {
//         this.isInFavorites = !!this.userService.user.favorites.find(post => post['_id'] === this.id);
//         this.post$ = this.postService.loadPostById(this.id).pipe(shareReplay(1));
//       }
//     });
//   }
//    // deleteHandler(commentId: string) {
//   //   this.commentService.deleteComment(this.postId, commentId)
//   //     .subscribe({
//   //       next: data => {
//   //         this.status = 'Delete successful';
//   //         console.log('Delete successful', data);
//   //         this.commentList$ = this.commentService.getComments(this.postId)
//   //           .pipe(shareReplay(1));
//   //         setTimeout(() => {
//   //           this.status = '';
//   //         }, 2000);
//   //       },
//   //       error: err => {
//   //         console.error('There was an error!', err);
//   //       }
//   //     });
//   // }

//   removeFromFavoritesHandler() {
//     console.log(this.id)
//     this.postService.removeFromFavorites(this.id).subscribe({
//       next: () => {
//         this.isInFavorites = !!this.userService.user.favorites.find(post => post['_id'] === this.id);
//         this.post$ = this.postService.loadPostById(this.id).pipe(shareReplay(1));
//       }
//     });
//   }

//   ngOnDestroy(): void {
//     // this.refresh$.unsubscribe();
//   }
// }
