import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonButton, 
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonIcon
} from '@ionic/angular/standalone';
import { DeadCharactersService } from '../services/dead-characters.service';
import { Character } from '../models/character.interface';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';

@Component({
  selector: 'app-personajes-muertos',
  templateUrl: './personajes-muertos.page.html',
  styleUrls: ['./personajes-muertos.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule, 
    IonButton, 
    IonBackButton, 
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonIcon
  ]
})
export class PersonajesMuertosPage implements OnInit {
  deadCharacters: Character[] = [];

  constructor(private deadCharactersService: DeadCharactersService) {
    addIcons({ trash });
  }

  ngOnInit() {
    this.loadDeadCharacters();
  }

  ionViewWillEnter() {
    // Recargar cuando se entra a la página
    this.loadDeadCharacters();
  }

  loadDeadCharacters() {
    this.deadCharacters = this.deadCharactersService.getDeadCharacters();
  }

  reviveCharacter(character: Character) {
    this.deadCharactersService.removeDeadCharacter(character.id);
    this.loadDeadCharacters();
  }

  clearAllDeadCharacters() {
    this.deadCharactersService.clearDeadCharacters();
    this.loadDeadCharacters();
  }
}
