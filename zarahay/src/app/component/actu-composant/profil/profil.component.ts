import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceStorageService } from 'src/app/service-storage.service';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule,
    RouterModule
  ],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit{

  loggedInUser: any;

  constructor(private cookieService: CookieService, private serviceStorage: ServiceStorageService){}

  ngOnInit(): void {
    const loggedInUserCookie = this.cookieService.get('loggedInUser');

    if (loggedInUserCookie) {
      this.loggedInUser = JSON.parse(loggedInUserCookie);
    } else {
      this.loggedInUser = this.serviceStorage.getLoggedInUser();
    }

    console.log('Utilisateur connecté :', this.loggedInUser);
  }
  
}
