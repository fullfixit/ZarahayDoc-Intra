import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActuComponent } from '../actu-composant/actu/actu.component';
import { ServiceStorageService } from 'src/app/service-storage.service';
import { SignComponent } from '../sign/sign.component';
import { CookieService } from 'ngx-cookie-service';
import { ServiceService } from 'src/app/service.service';

interface User {
  name: string;
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
  isAuthenticated: boolean = false;
  username: string = '';

  login: User = {
    name: '',
    mail: '',
    password: '',
  };

  screenWidth: number;
  userInfo: { name: string; firstname: string; mail: string; } | null | undefined;


  constructor(private router: Router, private route: ActivatedRoute, private serviceStorage: ServiceStorageService, private cookieService: CookieService, private serviceService: ServiceService ) {
    this.screenWidth = window.innerWidth;
  }

  
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    // Souscrivez aux changements de l'état de connexion et de l'information de l'utilisateur
    this.serviceService.getIsAuthenticated().subscribe((isAuthenticated) => {
    this.isAuthenticated = isAuthenticated;
   });

   this.serviceService.getUserInfo().subscribe((userInfo) => {
    this.userInfo = userInfo;
  });
  }
  
  onLogIn() {
    this.serviceService.login(this.login.name, this.login.password).subscribe(
      (response) => {
        console.log(response);
        // Les informations d'authentification ont déjà été stockées dans les cookies par le service
        // Pas besoin de répéter cela ici
  
        // Naviguez vers la page d'accueil après la connexion réussie
        this.cookieService.set('my_auth_token', response.token);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error(error);
        alert('Nom d\'utilisateur ou mot de passe incorrect');
      }
    );
  }
}
