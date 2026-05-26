import { signalStore, withState, withMethods, withComputed } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { patchState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { IProduct } from '../models/product.model';
import { Product } from '../services/product';

// 1. L'état initial
interface ProductState {
  products: IProduct[];
  selectedProduct: IProduct | null;
  loading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
  limit: number;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  total: 0,
  currentPage: 1,
  limit: 10
};

// 2. Le store
export const ProductStore = signalStore(
  { providedIn: 'root' },

  // L'état
  withState(initialState),

  // Valeurs calculées
  withComputed((store) => ({
    totalPages: computed(() => Math.ceil(store.total() / store.limit())),
    skip: computed(() => (store.currentPage() - 1) * store.limit()),
    hasProducts: computed(() => store.products().length > 0),
  })),

  // Les méthodes
  withMethods((store, productService : Product= inject(Product)) => ({

    // Charger tous les produits
    loadProducts: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(() =>
          productService.getAll(store.limit(), store.skip()).pipe(
            tap({
              next: (response) => patchState(store, {
                products: response.products,
                total: response.total,
                loading: false
              }),
              error: (error) => patchState(store, {
                error: error.message,
                loading: false
              })
            })
          )
        )
      )
    ),

    // Charger un produit par id
    loadById: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((id) =>
          productService.getById(id).pipe(
            tap({
              next: (product) => patchState(store, {
                selectedProduct: product,
                loading: false
              }),
              error: (error) => patchState(store, {
                error: error.message,
                loading: false
              })
            })
          )
        )
      )
    ),

    // Créer un produit
    createProduct: rxMethod<IProduct>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((product) =>
          productService.create(product).pipe(
            tap({
              next: (newProduct) => patchState(store, {
                products: [...store.products(), newProduct],
                loading: false
              }),
              error: (error) => patchState(store, {
                error: error.message,
                loading: false
              })
            })
          )
        )
      )
    ),

    // Supprimer un produit
    deleteProduct: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((id) =>
          productService.delete(id).pipe(
            tap({
              next: () => patchState(store, {
                products: store.products().filter(p => p.id !== id),
                loading: false
              }),
              error: (error) => patchState(store, {
                error: error.message,
                loading: false
              })
            })
          )
        )
      )
    ),

    // Changer de page
    setPage(page: number): void {
      patchState(store, { currentPage: page });
    }
  }))
);