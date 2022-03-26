import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IPost } from '../shared/interfaces';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable()
export class PostService {
  private postList: IPost[] = [];
  private postsUpdated = new Subject<IPost[]>();

  constructor(private http: HttpClient) { }

  loadPostList(): Observable<IPost[]> {
    // return [...this.postList];
    return this.http.get<IPost[]>(apiUrl + '/posts');
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    // const post: IPost = { title, content };
    // this.postList.push(post);
    // this.postsUpdated.next([...this.postList]);
  }

  // addPost(post: IPost) {
  //   this.postList.push(post);
  // }
}