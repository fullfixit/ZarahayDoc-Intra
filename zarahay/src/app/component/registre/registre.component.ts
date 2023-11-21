import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActuComponent } from '../actu-composant/actu/actu.component';
import { ServiceStorageService } from 'src/app/service-storage.service';
import { SignComponent } from '../sign/sign.component';
import { CookieService } from 'ngx-cookie-service';

interface User {
  lastName: string;
  mail: string;
  password: string;
}



@Component({
  selector: 'app-registre',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    FormsModule,
    ActuComponent,
    SignComponent
  ],
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css']
})
export class RegistreComponent {
  signUp: any[] = [];

  login: User = {
    lastName: '',
    mail: '',
    password: '',
  };

  screenWidth: number;


  constructor(private router: Router, private route: ActivatedRoute, private serviceStorage: ServiceStorageService, private cookieService: CookieService ) {
    this.screenWidth = window.innerWidth;
  }


  ngOnInit(): void {
    const localData = localStorage.getItem('signUp');
    if (localData !== null) {
      this.signUp = JSON.parse(localData);
    };

    const loggedInUserCookie = this.cookieService.get('loggedInUser');
    if (loggedInUserCookie) {
      const loggedInUser = JSON.parse(loggedInUserCookie);
    }
  }
  
  

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.screenWidth = window.innerWidth;
  }

  onLogIn() {
    const isExits = this.signUp.find(m => m.lastName == this.login.lastName && m.password == this.login.password);
    if (isExits != undefined) {

      // Définir le cookie lors de la connexion
      const loggedInUser = isExits;
      this.cookieService.set('loggedInUser', JSON.stringify(loggedInUser));

      // Stocker l'utilisateur connecté dans le service
      this.serviceStorage.setLoggedInUser(loggedInUser);

      this.router.navigate(['/home'])
    } else {
      alert('Wrong no information')
    }
  };

  getLoggedInUserInfo() {
    return this.serviceStorage.getLoggedInUser();
  }
}
