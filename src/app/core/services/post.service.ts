import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IPost } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // private postList: IPost[] = [];
  // private postsUpdated = new Subject<IPost[]>();

  constructor(private http: HttpClient) { }

  // loadPostList(postsPerPage: number, currentPage: number): Observable<IPost[]> | any {
  //   const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
  //   return this.http.get<{ posts: IPost[], postsCount: number }>(`/posts${queryParams}`);
  // }
  loadPostList(postsPerPage: number, currentPage: number, searchTitle: string = ''): Observable<IPost[]> | any {
    // const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    return this.http.get<{ posts: Observable<IPost[]>, postsCount: number }>(`/posts`, {
      params: new HttpParams({
        fromObject: {
          pagesize: postsPerPage,
          page: currentPage,
          title: searchTitle
        }
      })
    });
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

  addToFavorites(postId: string): Observable<unknown> {
    return this.http.post(`/favorites/add/${postId}`, {});
  }

  removeFromFavorites(postId: string): Observable<unknown> {
    return this.http.delete(`/favorites/remove/${postId}`).pipe(tap(postId => console.log(postId)));
  }
}
