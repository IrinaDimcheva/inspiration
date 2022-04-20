import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { IUser } from '../../shared/interfaces';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: IUser | null;
  get isLogged(): boolean { return !!this.user; }
  get userId() { return this.user?._id; }

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<any> {
    return this.http.get(`${apiUrl}/users/profile`).pipe(
      tap((user: IUser) => {
        this.user = user;
        console.log(this.user, user);
      }),
      catchError(() => {
        this.user = null;
        return of(null);
      })
    );
  }

  register(data: any): Observable<IUser> {
    return this.http.post(`${apiUrl}/register`, data)
      .pipe(tap((user: IUser) => {
        this.user = user;
      }));
  }

  login(data: any): Observable<IUser | any> {
    return this.http.post<IUser | any>(`${apiUrl}/login`, data)
      .pipe(tap((user) => {
        this.user = user;
      }));
  }

  logout() {
    return this.http.post(`${apiUrl}/logout`, {})
      .pipe(tap(() => this.user = null));
  }

}