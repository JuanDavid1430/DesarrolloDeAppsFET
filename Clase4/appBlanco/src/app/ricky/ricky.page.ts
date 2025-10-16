import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButton, 
  IonBackButton, 
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol,
  IonImg
} from '@ionic/angular/standalone';
import { RickyCharacters } from '../ricky-characters';
import { Character } from '../models/character.interface';
import { DeadCharactersService } from '../services/dead-characters.service';

@Component({
  selector: 'app-ricky',
  templateUrl: './ricky.page.html',
  styleUrls: ['./ricky.page.scss'],
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
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonGrid,
    IonRow,
    IonCol,
    IonImg
  ]
})
export class RickyPage implements OnInit {
  characters: Character[] = [];
  allCharacters: Character[] = [];
  isLoading = false;
  showingDeadOnly = false;

  constructor(
    private rickyService: RickyCharacters,
    private deadCharactersService: DeadCharactersService,
    private router: Router
  ) { }

  ngOnInit() {
    // Cargar el estado de personajes muertos al inicializar
    this.loadDeadCharactersState();
  }

  loadCharacters() {
    this.isLoading = true;
    this.rickyService.getCharacters().subscribe({
      next: (response) => {
        this.allCharacters = response.results.map(char => ({...char}));
        
        // Marcar como muertos los personajes que están en localStorage
        this.loadDeadCharactersState();
        
        this.characters = [...this.allCharacters];
        this.showingDeadOnly = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading characters:', error);
        this.isLoading = false;
      }
    });
  }

  loadDeadCharactersState() {
    // Marcar como muertos los personajes que están guardados en localStorage
    const deadCharacters = this.deadCharactersService.getDeadCharacters();
    
    this.allCharacters.forEach(char => {
      const isDead = deadCharacters.some(deadChar => deadChar.id === char.id);
      if (isDead) {
        char.status = 'Dead';
      }
    });
  }

  killCharacter(character: Character) {
    character.status = 'Dead';
    
    // Guardar en localStorage
    this.deadCharactersService.saveDeadCharacter(character);
    
    // Actualizar también en allCharacters
    const index = this.allCharacters.findIndex(char => char.id === character.id);
    if (index !== -1) {
      this.allCharacters[index].status = 'Dead';
    }
  }

  showDeadCharacters() {
    // Redirigir a la página de personajes muertos
    this.router.navigate(['/personajes-muertos']);
  }

  get deadButtonText(): string {
    return 'Ver muertos';
  }
}
