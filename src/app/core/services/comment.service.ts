import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { environment } from "../../../environments/environment";
import { IComment } from "../../shared/interfaces";

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  // private _deleteOperationSuccessfulEvent$: Subject<boolean> = new Subject();
  // get deleteOperationSuccessfulEvent$(): Observable<boolean> {
  //   return this._deleteOperationSuccessfulEvent$.asObservable();
  // }

  constructor(private http: HttpClient) { }

  getComments(postId: string): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${apiUrl}/posts/${postId}/comments`);
  }

  getComment(postId: string, commentId: string): Observable<IComment> {
    return this.http.get<IComment>(`${apiUrl}/posts/${postId}/comments/${commentId}`);
  }

  addComment(comment: IComment | any, postId: string): Observable<IComment> {
    return this.http.post<IComment>(`${apiUrl}/posts/${postId}/comments`, comment);
  }

  // editComment(data: { text: string }, postId: string, commentId: string): Observable<IComment> {
  //   return this.http.put<IComment>(`${apiUrl}/posts/${postId}/comments/${commentId}`, data,
  //     { withCredentials: true });
  // }
  editComment(postId: string, commentId: string, comment: IComment): Observable<IComment> {
    return this.http.put<IComment>(`${apiUrl}/posts/${postId}/comments/${commentId}`, comment);
  }

  deleteComment(postId: string, commentId: string): Observable<unknown> {
    return this.http.delete(`${apiUrl}/posts/${postId}/comments/${commentId}`);
  }
}