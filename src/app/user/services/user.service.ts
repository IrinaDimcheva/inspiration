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

  getUser(): Observable<IUser> {
    return this.http.get<IUser>(`/users/profile`);
  }

  getFavorites(): Observable<IPost[]> {
    return this.http.get<IPost[]>('/favorites');
  }

  register(data: IRegisterRequest): Observable<IUser> {
    return this.http.post<IUser>(`/register`, data);
  }

  login(data: any): Observable<IUser> {
    return this.http.post<IUser>(`/login`, data);
  }

  logout() {
    return this.http.post(`/logout`, {});
  }
}
