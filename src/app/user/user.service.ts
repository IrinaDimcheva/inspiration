import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable()
export class UserService {
  isLogged = false;

  login(data: any): Observable<any> {
    localStorage.setItem('isLogged', 'true');
    this.isLogged = true;
    return of(data);
  }

  logout() {
    localStorage.setItem('isLogged', 'false');
    this.isLogged = false;
  }
}