import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { IPost, IUser } from '../../shared/interfaces';
import { IRegisterRequest } from '../interfaces/register-request';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // user$: Observable<IUser> | null = null;
  // get isLogged(): boolean {
  //   return !!this.user$;
  // }
  // get userId() {
  //   return this.user$?._id;
  // }
  // get canLoad(): boolean {
  //   return this.user$ !== undefined;
  // }

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<IUser> {
    return this.http.get<IUser>(`/users/profile`);
    // .pipe(
    //   tap((user: IUser) => {
    //     this.user$ = user;
    //   }),
    //   catchError(() => {
    //     this.user$ = null;
    //     return of(null);
    //   })
    // );
  }

  getFavorites(): Observable<IPost[]> {
    return this.http.get<IPost[]>('/favorites');
  }

  register(data: IRegisterRequest): Observable<IUser> {
    return this.http.post<IUser>(`/register`, data);
    // .pipe(
    //   tap((user: IUser) => {
    //     console.log(user);
    //   }),
    //   catchError((err) => {
    //     console.log(err);
    //     return of(null);
    //   })
    // );
  }

  login(data: any): Observable<IUser> {
    return this.http.post<IUser>(`/login`, data);
    // .pipe(
    //   tap((user) => {
    //     this.user$ = user;
    //   })
    // );
  }

  logout() {
    return this.http.post(`/logout`, {});
    // .pipe(tap(() => (this.user$ = null)));
  }
}
