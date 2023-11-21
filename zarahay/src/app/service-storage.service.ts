import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ServiceStorageService {
  private readonly loggedInUserKey = 'loggedInUser';

  setLoggedInUser(user: any) {
    localStorage.setItem(this.loggedInUserKey, JSON.stringify(user));
  }

  getLoggedInUser() {
   const userString = localStorage.getItem(this.loggedInUserKey);
    return userString ? JSON.parse(userString) : null;
  }
}
