import { Injectable } from '@angular/core';
import { Character } from '../models/character.interface';

@Injectable({
  providedIn: 'root'
})
export class DeadCharactersService {
  private storageKey = 'deadCharacters';

  constructor() { }

  // Guardar un personaje muerto en localStorage
  saveDeadCharacter(character: Character): void {
    const deadCharacters = this.getDeadCharacters();
    
    // Verificar si el personaje ya está en la lista
    const exists = deadCharacters.find(char => char.id === character.id);
    
    if (!exists) {
      deadCharacters.push(character);
      localStorage.setItem(this.storageKey, JSON.stringify(deadCharacters));
    }
  }

  // Obtener todos los personajes muertos del localStorage
  getDeadCharacters(): Character[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  // Eliminar un personaje muerto del localStorage
  removeDeadCharacter(characterId: number): void {
    const deadCharacters = this.getDeadCharacters();
    const filtered = deadCharacters.filter(char => char.id !== characterId);
    localStorage.setItem(this.storageKey, JSON.stringify(filtered));
  }

  // Limpiar todos los personajes muertos
  clearDeadCharacters(): void {
    localStorage.removeItem(this.storageKey);
  }

  // Verificar si un personaje está muerto
  isCharacterDead(characterId: number): boolean {
    const deadCharacters = this.getDeadCharacters();
    return deadCharacters.some(char => char.id === characterId);
  }
}