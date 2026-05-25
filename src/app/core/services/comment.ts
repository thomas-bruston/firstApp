import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProductComment } from '../models/comment.model';
import { ICommentsResponse } from '../models/api-response.model';
import { ICommentCreate } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://dummyjson.com';

  // GET /comments → tous les commentaires
  getAll(): Observable<ICommentsResponse> {
    return this.http.get<ICommentsResponse>(`${this.apiUrl}/comments`);
  }

  // GET /posts/:id/comments → commentaires d'un produit
  getByProductId(productId: number): Observable<ICommentsResponse> {
    return this.http.get<ICommentsResponse>(
      `${this.apiUrl}/posts/${productId}/comments`
    );
  }

  // POST /comments/add → créer un commentaire
 create(comment: ICommentCreate): Observable<IProductComment> {
  return this.http.post<IProductComment>(
    `${this.apiUrl}/comments/add`,
    comment
  );
}
}