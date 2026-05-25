import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct,IProductCreate,IProductUpdate } from '../models/product.model';
import { IProductsResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class Product {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://dummyjson.com/products';

getAll(limit = 10, skip = 0): Observable<IProductsResponse> {
    return this.http.get<IProductsResponse>(
      `${this.apiUrl}?limit=${limit}&skip=${skip}`
    );}

  // GET /products/:id — détail d'un produit
  getById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/${id}`);
  }

  // GET /products/search?q=xxx — recherche
  search(query: string): Observable<IProductsResponse> {
    return this.http.get<IProductsResponse>(
      `${this.apiUrl}/search?q=${query}`
    );
  }

  // POST /products/add — créer un produit
  create(product: IProductCreate): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.apiUrl}/add`, product);
  }

  // PUT /products/:id — modifier un produit
  update(id: number, product: IProductUpdate): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.apiUrl}/${id}`, product);
  }

  // DELETE /products/:id — supprimer un produit
  delete(id: number): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.apiUrl}/${id}`);
  }
}


