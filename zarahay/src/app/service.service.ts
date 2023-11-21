import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environnement } from './environnement/environnement';
import { User } from './component/sign/sign.component';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://localhost:3000'

  constructor(private httpClient: HttpClient) {}
  
  signUp(user: User): Observable<any> {
    const signUpUrl = `${this.apiUrl}/signup`;
    return this.httpClient.post(signUpUrl, user);
  }
}
