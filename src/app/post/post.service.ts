import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IPost } from '../shared/interfaces';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable()
export class PostService {
  // private postList: IPost[] = [];
  private postsUpdated = new Subject<IPost[]>();

  constructor(private http: HttpClient) { }

  loadPostList(): Observable<IPost[]> {
    // return [...this.postList];
    return this.http.get<IPost[]>(apiUrl + '/posts');
  }

  loadPostById$(postId: string): Observable<IPost> {
    return this.http.get<IPost>(`${apiUrl}/posts/${postId}`);
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  // addPost(title: string, content: string, imageUrl: string) {
  //   // const post: IPost = { title, content };
  //   // this.postList.push(post);
  //   // this.postsUpdated.next([...this.postList]);
  // }

  addPost(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(apiUrl + '/posts', post, { withCredentials: true });
  }
}
