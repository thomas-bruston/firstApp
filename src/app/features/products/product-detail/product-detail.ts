import { Component, OnInit, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductStore } from '../../../core/store/product.store';
import { CommentService } from '../../../core/services/comment';
import { IProductComment } from '../../../core/models/comment.model';
import { signal } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  @Input() id!: string;

  readonly store = inject(ProductStore);
  private readonly commentService = inject(CommentService);

  comments = signal<IProductComment[]>([]);
  commentsLoading = signal(false);

  ngOnInit(): void {
    this.store.loadById(Number(this.id));
    this.loadComments();
  }

  loadComments(): void {
    this.commentsLoading.set(true);
    this.commentService.getByProductId(Number(this.id)).subscribe({
      next: (response) => {
        this.comments.set(response.comments);
        this.commentsLoading.set(false);
      },
      error: () => this.commentsLoading.set(false)
    });
  }
}
