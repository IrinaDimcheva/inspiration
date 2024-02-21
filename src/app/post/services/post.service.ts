import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../../shared/interfaces';
import { ICreatePost } from '../interfaces/create-post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  loadPostById(postId: string): Observable<IPost> {
    return this.http.get<IPost>(`/posts/${postId}`);
  }

  editPost(id: string, post: IPost): Observable<IPost> {
    return this.http.put<IPost>(`/posts/${id}`, post);
  }

  addPost(post: ICreatePost): Observable<IPost> {
    return this.http.post<IPost>(`/posts`, post);
  }

  deletePost(id: string): Observable<unknown> {
    return this.http.delete(`/posts/${id}`);
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
