import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';
import { ServiceStorageService } from 'src/app/service-storage.service';
import { SignupData } from 'src/app/signUp.model';



export interface User {
  firstname: string;
  name: string;
  mail: string;
  password: string;
}

@Component({
  selector: 'app-sign',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})


export class SignComponent implements OnInit{
  signUp: any[] = [];


  sign: User = {
    name: '',
    mail: '',
    firstname: '',
    password: '',
  };
  
  constructor(private serviceService: ServiceService, private router: Router, private route: ActivatedRoute, private serviceStorage: ServiceStorageService) {}

  ngOnInit(): void {
    const localData = localStorage.getItem('signUp');
    if (localData !== null) {
      this.signUp = JSON.parse(localData);
    }
  }

  onSignUp() {
    this.serviceService.signUp(this.sign).subscribe(
      (response) => {
        console.log(response); // Affichez la réponse du backend (peut être supprimé en production)
        
        // Sauvegardez la réponse ou effectuez d'autres actions en fonction de votre besoin

        // Réinitialisez le formulaire après une inscription réussie
        this.sign = { name: '', firstname: '', password: '', mail: '' };
      },
      (error) => {
        console.error(error); // Affichez les erreurs (peut être géré différemment en production)
      }
    );
  }
}
