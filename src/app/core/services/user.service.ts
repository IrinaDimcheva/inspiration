import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { IUser } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: IUser | null;
  get isLogged(): boolean { return !!this.user; }
  get userId() { return this.user?._id; }

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<any> {
    return this.http.get('/users/profile').pipe(
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
    return this.http.post('/register', data).pipe(tap((user: IUser) => {
      this.user = user;
    }));
  }

  login(data: any): Observable<IUser | any> {
    return this.http.post<IUser | any>('/login', data).pipe(tap((user) => {
      this.user = user;
    }));
  }

  logout() {
    return this.http.post('/logout', {}).pipe(tap(() => this.user = null));
  }

}