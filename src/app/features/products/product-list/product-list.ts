import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductStore } from '../../../core/store/product.store';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  readonly store = inject(ProductStore);
  searchQuery = signal('');
  private searchTimeout: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.store.loadProducts();
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.searchQuery.set(query);

    // Debounce — attend 400ms avant de chercher
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.store.loadProducts();
    }, 400);
  }

  onDelete(id: number): void {
    if (confirm('Supprimer ce produit ?')) {
      this.store.deleteProduct(id);
    }
  }

  onPrevPage(): void {
    this.store.setPage(this.store.currentPage() - 1);
    this.store.loadProducts();
  }

  onNextPage(): void {
    this.store.setPage(this.store.currentPage() + 1);
    this.store.loadProducts();
  }
}