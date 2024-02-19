import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPostsResponse } from '../interfaces/posts-response.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(
    limit: number,
    page: number,
    title: string = ''
  ): Observable<IPostsResponse> {
    return this.http.get<IPostsResponse>(`/posts`, {
      params: new HttpParams({
        fromObject: {
          limit,
          page,
          title,
        },
      }),
    });
  }
}
