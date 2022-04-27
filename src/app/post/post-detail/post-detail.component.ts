import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { mergeMap, tap } from 'rxjs/operators';
import { IPost, IUser } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/core/services/user.service';
import { PostService } from '../../core/services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post!: IPost;
  user: IUser;
  id: string;
  isLoading = false;
  isAuthor: boolean;
  canLike: boolean;
  foundPost: IPost | boolean;
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
      .subscribe(() => {
        this.canLike = false;
        this.reloadCurrentRoute();
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
        this.isLoading = true;
      }),
      mergeMap(params => {
        return this.postService.loadPostById(params['id']);
      }))
      .subscribe({
        next: post => {
          this.isLoading = false;
          this.post = post;
          this.isAuthor = post.userId._id === this.userId;
          this.canLike = !post.likes.includes(this.userId);
          this.userService.getFavorites().pipe(tap(posts => {
            this.foundPost = posts.find(post => post._id === this.id);
          })).subscribe();
          console.log(this.foundPost?.['_id']);
        },
        error: err => {
          this.isLoading = false;
          console.error(err);
        }
      })
  }

  deleteHandler() {
    this.postService.deletePost(this.id).subscribe({
      next: () => {
        this.router.navigate(['/']);
      }
    });
  }

  addToFavoritesHandler() {
    this.postService.addToFavorites(this.id).subscribe({
      next: () => {
        this.status = 'Add to Favorites successful';
        this.foundPost = true;
        setTimeout(() => {
          this.status = '';
        }, 1200);
      }
    });
  }

  removeFromFavoritesHandler() {
    this.postService.removeFromFavorites(this.id).subscribe({
      next: () => {
        this.status = 'Remove from Favorites successful';
        this.foundPost = false;
        setTimeout(() => {
          this.status = '';
        }, 1200);
      }
    });
  }
}
