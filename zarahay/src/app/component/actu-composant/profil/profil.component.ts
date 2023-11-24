import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceStorageService } from 'src/app/service-storage.service';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule } from '@angular/router';
import { ServiceService } from 'src/app/service.service';

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

  name: string | null = null;
  firstname: string | null = null;
  mail: string | null = null;

  constructor(private serviceService: ServiceService) {}
  
  ngOnInit(): void {
    // Souscrivez à l'Observable pour obtenir les données du service
    this.serviceService.getUserInfo().subscribe(userInfo => {
      if (userInfo) {
        // Si userInfo n'est pas null, mettez à jour les propriétés du composant
        this.name = userInfo.name;
        this.firstname = userInfo.firstname;
        this.mail = userInfo.mail;
      } else {
        // Gérez le cas où userInfo est null, par exemple, si l'utilisateur n'est pas connecté
        this.name = null;
        this.firstname = null;
        this.mail = null;
      }
    });
  }
}
