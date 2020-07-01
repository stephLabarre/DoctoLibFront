import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  isLoggedIn = false;

  isUserAdmin = false;

  isUserLoggedIn() {
    this.isLoggedIn = true;
  }

  isUserNotLoggedIn() {
    this.isLoggedIn = false;
  }

  isAdmin() {
    this.isUserAdmin = true;
  }
  
  isNotAdmin() {
    this.isUserAdmin = false;
  }
}
