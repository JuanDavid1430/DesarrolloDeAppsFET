import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>('https://fakestoreapi.com/products/categories');
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`https://fakestoreapi.com/products/category/${category}`);
  }
}