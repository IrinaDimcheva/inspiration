import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { IComment } from "../../shared/interfaces";

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient) { }

  // getComments(postId: string): Observable<IPost> {
  //   return this.http.get<IPost>(`${apiUrl}/posts/${postId}`);
  // }
  getComments(postId: string): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${apiUrl}/posts/${postId}/comments`, { withCredentials: true });
  }

  getComment(postId: string, commentId: string): Observable<IComment> {
    return this.http.get<IComment>(`${apiUrl}/posts/${postId}/comments/${commentId}`,
      { withCredentials: true });
  }

  addComment(comment: string, postId: string): Observable<IComment> {
    return this.http.post<IComment>(`${apiUrl}/posts/${postId}/comments`, { text: comment },
      { withCredentials: true });
  }

  editComment(data: { text: string }, postId: string, commentId: string): Observable<IComment> {
    return this.http.put<IComment>(`${apiUrl}/posts/${postId}/comments/${commentId}`, data,
      { withCredentials: true });
  }

  deleteComment(postId: string, commentId: string) {
    return this.http.delete(`${apiUrl}/posts/${postId}/comments/${commentId}`, { withCredentials: true });
  }
}