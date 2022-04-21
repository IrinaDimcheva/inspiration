import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // private postList: IPost[] = [];
  // private postsUpdated = new Subject<IPost[]>();

  constructor(private http: HttpClient) { }

  loadPostList(): Observable<IPost[]> {
    return this.http.get<IPost[]>('/posts');
  }

  loadPostById(postId: string): Observable<IPost> {
    return this.http.get<IPost>(`/posts/${postId}`);
  }

  // getPostUpdateListener() {
  //   return this.postsUpdated.asObservable();
  // }

  editPost(id: string, post: IPost): Observable<IPost> {
    return this.http.put<IPost>(`/posts/${id}`, post);
  }

  addPost(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(`/posts`, post);
  }

  deletePost(id: string): Observable<unknown> {
    return this.http.delete(`/posts/${id}`)
  }

  likePost(postId: string): Observable<IPost> {
    return this.http.put<IPost>(`/likes/${postId}`, {});
  }
}
