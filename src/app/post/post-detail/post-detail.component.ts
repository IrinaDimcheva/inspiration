import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, mergeMap, tap } from 'rxjs';
import { IPost } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/core/services/user.service';
import { PostService } from '../../core/services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  post!: IPost;
  refresh$ = new BehaviorSubject(undefined);
  id: string;
  isLoading = false;
  isAuthor: boolean;
  canLike: boolean;
  get isLogged() {
    return this.userService.isLogged;
  }
  get userId() {
    return this.userService.userId;
  }

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  likeHandler() {
    this.postService.likePost(this.id).subscribe((post) => {
      this.canLike = false;
      this.refresh$.next(() => undefined);
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(tap((params: Params) => {
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
          this.canLike = !this.post.likes.includes(this.userId);
          console.log(post.userId._id, this.userId);
        },
        error: err => {
          console.log(err);
        }
      })
  }

  // ngOnChanges(changes: SimpleChanges): void {

  // this.canLike = false;
  // this.postService.loadPostById$(this.id).subscribe(post => this.post = post);
  //   // this.canLike = !this.post.likes.includes(this.userId);
  //   // console.log(!this.post.likes.includes(this.userId));
  // }

  AddToFavoritesHandler() {

  }

  ngOnDestroy(): void {
    this.refresh$.unsubscribe();
  }
}
