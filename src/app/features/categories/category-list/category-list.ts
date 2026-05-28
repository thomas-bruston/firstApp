import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { signal } from '@angular/core';
import { ICategory } from '../../../core/models/category.model';
import { Category } from '../../../core/services/category';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryList implements OnInit {
  private readonly categoryService = inject(Category);

  categories = signal<ICategory[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loading.set(true);
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }
}