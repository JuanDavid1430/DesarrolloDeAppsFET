import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButtons,
  IonMenuButton, 
  IonList, 
  IonLabel, 
  IonItem,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowForward } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButtons,
    IonMenuButton, 
    IonItem, 
    IonLabel, 
    IonList,
    IonButton,
    IonIcon,
    RouterLink
  ],
})
export class HomePage {
  constructor() {
    addIcons({ arrowForward });
  }
}
