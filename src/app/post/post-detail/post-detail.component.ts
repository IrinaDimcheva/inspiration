import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { mergeMap, tap } from 'rxjs';
import { IPost } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/user/user.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: IPost;
  id: string;
  isLoading = false;
  get isLogged() {
    return this.userService.isLogged;
  }

  constructor(public postService: PostService, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.route.params.pipe(tap((params: Params) => {
      this.id = params['id'];
      this.isLoading = true;
    }),
      mergeMap(params => {
        return this.postService.loadPostById$(params['id']);
      }))
      .subscribe({
        next: post => {
          this.isLoading = false;
          this.post = post;
        },
        error: err => {
          console.log(err);
        }
      })
  }

  AddToFavoritesHandler() {

  }

}
