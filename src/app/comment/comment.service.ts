import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { IComment } from "../shared/interfaces";

const apiUrl = environment.apiUrl;

@Injectable()
export class CommentService {
  constructor(private http: HttpClient) { }

  getComments(id): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${apiUrl}/posts/${id}`);
  }
}