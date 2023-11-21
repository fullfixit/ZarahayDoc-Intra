import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { NotifComponent } from '../actu-composant/notif/notif.component';
import { ActuComponent } from '../actu-composant/actu/actu.component';
import { ProfilComponent } from '../actu-composant/profil/profil.component';

@Component({
  selector: 'app-actualite',
  standalone: true,
  imports: [CommonModule,
    HeaderComponent,
    NotifComponent,
    ActuComponent,
    ProfilComponent
  ],
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.css']
})
export class ActualiteComponent {

}
