import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IComment } from "../../shared/interfaces";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getComments(postId: string): Observable<IComment[]> {
    return this.http.get<IComment[]>(`/posts/${postId}/comments`);
  }

  getComment(postId: string, commentId: string): Observable<IComment> {
    return this.http.get<IComment>(`/posts/${postId}/comments/${commentId}`);
  }

  addComment(comment: IComment | any, postId: string): Observable<IComment> {
    return this.http.post<IComment>(`/posts/${postId}/comments`, comment);
  }

  editComment(postId: string, commentId: string, comment: IComment): Observable<IComment> {
    return this.http.put<IComment>(`/posts/${postId}/comments/${commentId}`, comment);
  }

  likeComment(commentId: string): Observable<IComment> {
    return this.http.put<IComment>(`/likes/${commentId}`, {});
  }

  deleteComment(postId: string, commentId: string): Observable<unknown> {
    return this.http.delete(`/posts/${postId}/comments/${commentId}`);
  }
}