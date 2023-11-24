import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, first, map, throwError } from 'rxjs';
import { environnement } from './environnement/environnement';
import { User } from './component/sign/sign.component';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://localhost:3000';

  // Ajoutez un BehaviorSubject pour suivre l'état de connexion et l'information de l'utilisateur
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private userInfo = new BehaviorSubject<{ name: string, firstname: string, mail: string } | null>(null);

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {}
  
  signUp(user: User): Observable<any> {
    const signUpUrl = `${this.apiUrl}/signup`;
    return this.httpClient.post(signUpUrl, user);
  }

  // Recuperer les donner du utilsateur
  getIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  getUserInfo(): Observable<{ name: string, firstname: string, mail: string } | null> {
    return this.userInfo.asObservable();
  }

  private updateAuthState(name: string, firstname: string, mail: string): void {
  this.isAuthenticated.next(true);
  this.userInfo.next({ name, firstname, mail });
}

  login(name: string, password: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/login`, { name, password })
      .pipe(
        // Mise à jour de l'état de connexion et de l'information de l'utilisateur
        map((response: any) => {
          // Stockage des informations dans les cookies
          this.cookieService.set('name', response.name);
          this.cookieService.set('firstname', response.firstname)
          this.cookieService.set('token', response.token); 

          // Mise à jour des sujets BehaviorSubject
          this.isAuthenticated.next(true);
          this.userInfo.next({ name: response.name, firstname: response.firstname, mail:response.mail });

          return response;
        })
      );
  }

  // Ajoutez une méthode pour récupérer le token du cookie
  getToken(): string {
    return this.cookieService.get('token');
  }

}
