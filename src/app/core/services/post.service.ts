import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IPost } from '../../shared/interfaces';
import { environment } from '../../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // private postList: IPost[] = [];
  // private postsUpdated = new Subject<IPost[]>();

  constructor(private http: HttpClient) { }

  loadPostList(): Observable<IPost[]> {
    return this.http.get<IPost[]>(apiUrl + '/posts');
  }

  loadPostById(postId: string): Observable<IPost> {
    return this.http.get<IPost>(`${apiUrl}/posts/${postId}`);
  }

  // getPostUpdateListener() {
  //   return this.postsUpdated.asObservable();
  // }

  editPost(id: string, post: IPost): Observable<IPost> {
    return this.http.put<IPost>(`${apiUrl}/posts/${id}`, post, { withCredentials: true });
  }

  addPost(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(`${apiUrl}/posts`, post, { withCredentials: true });
  }

  likePost(postId: string): Observable<IPost> {
    return this.http.put<IPost>(`${apiUrl}/likes/${postId}`, {}, { withCredentials: true });
  }
}
