import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../../shared/interfaces';
import { IPostRequest } from '../interfaces/post-request';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  loadPostById(postId: string): Observable<IPost> {
    return this.http.get<IPost>(`/posts/${postId}`);
  }

  editPost(postId: string, post: IPostRequest): Observable<IPost> {
    return this.http.put<IPost>(`/posts/${postId}`, post);
  }

  addPost(post: IPostRequest): Observable<IPost> {
    return this.http.post<IPost>(`/posts`, post);
  }

  deletePost(postId: string): Observable<{}> {
    return this.http.delete(`/posts/${postId}`);
  }

  likePost(postId: string): Observable<IPost> {
    return this.http.put<IPost>(`/likes/${postId}`, {});
  }

  addToFavorites(postId: string): Observable<unknown> {
    return this.http.post(`/favorites/add/${postId}`, {});
  }

  removeFromFavorites(postId: string): Observable<unknown> {
    return this.http.delete(`/favorites/remove/${postId}`);
  }
}
