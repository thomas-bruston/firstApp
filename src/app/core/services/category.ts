import { Injectable,inject } from '@angular/core';
import { Icategory } from '../models/category.model';
import { IProductsResponse } from '../models/api-response.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class Category {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://dummyjson.com/products';

  getAll() : Observable<Icategory[]>{
    return this.http.get<Icategory[]>(`${this.apiUrl}/categories`);
  }

  getProductById(slug:string) : Observable<IProductsResponse> {
    return this.http.get<IProductsResponse>(`${this.apiUrl}/category/${slug}`);

    
  }

}
