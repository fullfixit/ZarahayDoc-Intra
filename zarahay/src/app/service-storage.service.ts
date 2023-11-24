import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';



@Injectable({
  providedIn: 'root'
})
export class ServiceStorageService {
  private apiUrl = 'http://localhost:3000';
  private readonly loggedInUserKey = 'loggedInUser';

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {}

  setLoggedInUser(user: any) {
    localStorage.setItem(this.loggedInUserKey, JSON.stringify(user));
    this.cookieService.set('loggedInUser', JSON.stringify(user));
  }

  getLoggedInUser() {
   const userString = localStorage.getItem(this.loggedInUserKey);
    return userString ? JSON.parse(userString) : null;
  }

  getLoggedInUserFromBackend(): Observable<any> {
    // Vous devez implémenter la route côté serveur pour récupérer les informations de l'utilisateur
    return this.httpClient.get(`${this.apiUrl}/user`);
  }
}
