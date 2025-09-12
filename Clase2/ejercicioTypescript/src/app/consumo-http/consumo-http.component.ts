import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DataService } from '../data.service'; 
import { Character, ApiResponse } from '../interfaces/character.interface';

@Component({
  selector: 'app-consumo-http',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consumo-http.component.html',
  styleUrl: './consumo-http.component.css'
})
export class ConsumoHttpComponent {
  private http = inject(HttpClient);
  
  apiResponse: any = null;
  isLoading: boolean = false;
  error: string | null = null;
  
  // Nuevas propiedades para Rick and Morty
  characters: Character[] = [];
  rickAndMortyLoading: boolean = false;
  rickAndMortyError: string | null = null;

  // URL de una API pública para hacer pruebas
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';

  consultarApi() {
    this.isLoading = true;
    this.error = null;
    this.apiResponse = null;

    this.http.get(this.apiUrl).subscribe({
      next: (response) => {
        this.apiResponse = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error al consultar la API: ' + error.message;
        this.isLoading = false;
        console.error('Error:', error);
      }
    });
  }

  consultarUsuarios() {
    this.isLoading = true;
    this.error = null;
    this.apiResponse = null;

    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe({
      next: (response) => {
        this.apiResponse = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error al consultar usuarios: ' + error.message;
        this.isLoading = false;
        console.error('Error:', error);
      }
    });
  }

  consultarRickAndMorty() {
    this.rickAndMortyLoading = true;
    this.rickAndMortyError = null;
    this.characters = [];

    this.dataService.getDatos().subscribe({
      next: (response: ApiResponse) => {
        this.characters = response.results;
        this.rickAndMortyLoading = false;
        console.log('Personajes cargados:', this.characters);
      },
      error: (error) => {
        this.rickAndMortyError = 'Error al consultar Rick and Morty API: ' + error.message;
        this.rickAndMortyLoading = false;
        console.error('Error:', error);
      }
    });
  }

  limpiarRespuesta() {
    this.apiResponse = null;
    this.error = null;
  }

  limpiarPersonajes() {
    this.characters = [];
    this.rickAndMortyError = null;
  }

  constructor(private dataService: DataService) {
    // Comentamos la llamada automática para que el usuario pueda decidir cuándo cargar
    // this.dataService.getDatos();
  }
}
