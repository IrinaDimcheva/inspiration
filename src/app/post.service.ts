import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { IPost } from './interfaces';

@Injectable()
export class PostService {
  postList: IPost[] = [
    { title: 'First Post', content: 'First post content' },
    { title: 'Second Post', content: 'Second post content' },
    { title: 'Third Post', content: 'Third post content' },
  ];

  constructor() { }

  loadPostList() {
    return of(this.postList);
  }

  // addPost(title: string, content: string) {
  //   const post: IPost = { title, content };
  //   this.postList.push(post);
  // }

  addPost(post: IPost) {
    this.postList.push(post);
  }
}
