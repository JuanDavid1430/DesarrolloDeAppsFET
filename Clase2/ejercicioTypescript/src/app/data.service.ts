import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from './interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
    
  }

  getDatos(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>('https://rickandmortyapi.com/api/character');
  }

}
