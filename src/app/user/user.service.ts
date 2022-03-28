import { Injectable } from "@angular/core";

@Injectable()
export class UserService {
  isLogged = false;


  login() {
    this.isLogged = true;
  }

  logout() {
    this.isLogged = false;
  }
}