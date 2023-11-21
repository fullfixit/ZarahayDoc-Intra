import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsComponent } from '../friends/friends.component';

@Component({
  selector: 'app-actu',
  standalone: true,
  imports: [CommonModule,
    FriendsComponent
  ],
  templateUrl: './actu.component.html',
  styleUrls: ['./actu.component.css']
})
export class ActuComponent {

}
